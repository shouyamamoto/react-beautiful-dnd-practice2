// React
import React, { useCallback, useState, useEffect } from 'react'
// css関連
import '@atlaskit/css-reset'
import styled from 'styled-components'
// react-beautiful-dnd
import { DragDropContext } from 'react-beautiful-dnd'
// コンポーネント
import { InputArea } from './InputArea'
import { Column } from './Column'
// firebase
import { db } from '../firebase'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

const TODO = 'Todo'
const PROGRESS = 'Progress'
const DONE = 'Done'

const generateInitialData = () => {
  const COLUMNS = [ TODO, PROGRESS, DONE ]
  const columns = {}
  const initialTasks  = {}

  COLUMNS.forEach(
    (column) => 
      (columns[column] = {
        id: column,
        title: column,
        taskIds: []
      })
  )

  return {
    tasks: initialTasks,
    columns,
    columnOrder: COLUMNS
  }
}

const initialData = generateInitialData()
const taskLength = initialData.columns['Todo'].taskIds.length
const initialTodo = ''

export const App = () => {
  const [countId, setCountId] = useState(taskLength) // idの値
  const [initData, setInitData] = useState(initialData) // タスクの初期化
  const [inputTodo, setInputTodo] = useState(initialTodo) // inputに入っている初期値

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot)=> {
      const newInitDataTasks = snapshot.docs.map((doc) => ({id: doc.id, content: doc.data().content}))
      const todoTaskIds = snapshot.docs.map((doc) => doc.id)
      // newInitDataTasksをオブジェクトに変換
      const newTasks = {}
      newInitDataTasks.forEach(newInitTask => {
        newTasks[newInitTask.id] = newInitTask
      })
      const newTodoTaskIds = [...initData.columns['Todo'].taskIds]
      todoTaskIds.map(todoTaskId => {
        newTodoTaskIds.push(todoTaskId)
      })
      const newInitTodoTaskIds = {
        ...initData.columns['Todo'],
        taskIds: newTodoTaskIds
      }
      const newInitColumns = {
        ...initData.columns,
        ['Todo']: newInitTodoTaskIds
      }
      const newInitData = {
        ...initData,
        tasks: newTasks,
        columns: newInitColumns
      }
      setInitData(newInitData)
    })
    return () => unSub();
  }, [])

  // 入力中のレンダリング処理
  const onInputChange = useCallback((e) => {
    setInputTodo(e.target.value)}, []
  )
  
  // 追加ボタンを押した時の処理
  const onBtnClick = () => {
    if(!inputTodo) {
      return
    }
    const newTaskId = countId + 1
    const newTaskIds = [...initData.columns['Todo'].taskIds]
    newTaskIds.push(`task${newTaskId}`)
    
    const newTodoColumn = {
      ...initData.columns['Todo'],
      taskIds: newTaskIds
    }
    
    const newColumns = {
      ...initData.columns,
      'Todo': newTodoColumn
    }

    const newTasks = {...initData.tasks}
    const taskKey = `task${newTaskId}`
    newTasks[taskKey] = {id: `task${newTaskId}`, content: inputTodo}

    const newState = {
      ...initData,
      tasks: newTasks,
      columns: newColumns
    }

    setInitData(newState)
    setInputTodo('')
    setCountId(newTaskId)
  }
  
  // エンターキーを押したときの処理
  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
      onBtnClick()
    }
  }

  // モーダル内の修正するボタンを押した時の処理
  const onClickTodoFix = (id, fixTodo) => {
    const newInitData = {...initData}
    newInitData.tasks[id].content = fixTodo

    setInitData(newInitData)
  }
  
  // 削除ボタンを押した時の処理
  const onClickDelete = (index, taskId) => {
    const newColumns = {...initData.columns} // columnsをコピー
    const newTasks = {...initData.tasks} // tasksをコピー

    Object.keys(newColumns).forEach(column => {
       // 削除アイコンを押したtaskがそれぞれのcolumnにあるかを検索
      const deleteTarget = newColumns[column].taskIds.find(task => task === taskId)
      if( deleteTarget ) { // 削除対象のtaskが見つかれば実行
        newColumns[column].taskIds.splice(index, 1) // 削除対象があるcolumnがforEachで回ってきた時にだけ、そのcolumnからtaskを削除
      }
    })

    delete newTasks[taskId] // tasksから削除ボタンを押したtaskを削除する

    const newState = {
      ...initialData,
      tasks: newTasks,
      columns: newColumns,
    }

    setInitData(newState)
  }
  
  // タスクを移動した時の処理
  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if(!destination) {
      return
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = initData.columns[source.droppableId]
    const finish = initData.columns[destination.droppableId]

    if( start === finish ) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1) // 持っている元のインデックスから1つ配列から削除する
      newTaskIds.splice(destination.index, 0, draggableId) // 置いた先のインデックスに持っている元のidを追加する
  
      // columnオブジェクトのコピーの後、プロパティを追加して新しいオブジェクトを作る
      const newColumn = {
        ...start, // コピー いったんここでコピーするのがキモ
        taskIds: newTaskIds // 追加するプロパティ(taskIdsはもともとあるプロパティなので、このプロパティに上書きされる)
      }
  
      const newState = {
        ...initData, // stateのコピー キモ
        columns: { // もともとのcolumnsを以下に変更する
          ...initData.columns,  
          [newColumn.id]: newColumn,
        }
      }
      
      setInitData(newState)
      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1) // draggableなタスクを元の配列から削除
    const newStart = {
      ...start, // 元のタスクたちをコピー
      taskIds: startTaskIds,  // もとのタスクのtaskIdsを、draggableなタスクを削除した配列に置き換える
    }

    const finishTaskIds = Array.from(finish.taskIds) // droppableのtaskIdsを登録
    finishTaskIds.splice(destination.index, 0, draggableId) // 置いた場所のindexにdraggableなタスクを追加
    const newFinish = {
      ...finish, // 置いた先のdroppableをコピー
      taskIds: finishTaskIds, // 置いた先droppableIdsを、draggableなタスクを追加した配列に置き換える
    }
    
    const newState = {
      ...initData, // stateのコピー
      columns: { // columnsを変更する
        ...initData.columns, // columnsのコピー
        [newStart.id]: newStart, // dragを開始したcolumnIdに、新しい配列（タスクを削除した配列）を当てる
        [newFinish.id]: newFinish, // dragをしたcolumnIdに、新しい配列(タスクを追加した配列)を当てる
      }
    }
    
    setInitData(newState)
  }

  return (
    <AppContainer>
      <InputArea 
        inputTodo={inputTodo} 
        onChange={onInputChange} 
        onClick={onBtnClick} 
        onEnter={onKeyDown}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
        {initData.columnOrder.map((columnId) => {
          const column = initData.columns[columnId]
          const taskList = column.taskIds.map(
            taskId => initData.tasks[taskId]
          )
          return (
            <Column 
              key={column.id} 
              column={column} 
              tasks={taskList} 
              onClickDelete={onClickDelete}
              onClickTodoFix={onClickTodoFix}
            /> 
          )
        })}
        </Container>
      </DragDropContext>
    </AppContainer>
  )
}