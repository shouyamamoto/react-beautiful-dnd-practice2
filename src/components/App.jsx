// React
import React, { useCallback, useState, useEffect, createContext } from 'react'
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
import { auth } from '../firebase'

export const InputAreaContext = createContext()
export const TaskContext = createContext()

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

export const App = ({ history }) => {
  const [initData, setInitData] = useState(initialData) // タスクの初期化
  const [inputTodo, setInputTodo] = useState('') // inputに入っている初期値

  // 認証機能
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && history.push('login')
    })
    return () => unSub()
  })
  
  // タスクを取得する
  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((snapshot)=> {
      const newInitDataTasks = snapshot.docs.map( doc => ({id: doc.id, content: doc.data().content}))
      const todoTaskIds = snapshot.docs.map( doc => doc.id)
      // newInitDataTasksをオブジェクトに変換
      const newTasks = {}
      newInitDataTasks.forEach(newInitTask => {
        newTasks[newInitTask.id] = newInitTask
      })
      const newTodoTaskIds = [...initData.columns['Todo'].taskIds]
      todoTaskIds.forEach(todoTaskId => {
        newTodoTaskIds.push(todoTaskId)
      })
      const newInitTodoTaskIds = {
        ...initData.columns['Todo'],
        taskIds: newTodoTaskIds
      }
      const newInitColumns = {
        ...initData.columns,
        'Todo': newInitTodoTaskIds
      }
      const newInitData = {
        ...initData,
        tasks: newTasks,
        columns: newInitColumns
      }
      setInitData(newInitData)
    })
    return () => unSub();

    // initData 初回レンダリング時のみ取得したいため削除
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    db.collection('tasks').add({content: inputTodo})
    setInputTodo('')
  }
  
  // エンターキーを押したときの処理
  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
      onBtnClick()
    }
  }

  // モーダル内の修正するボタンを押した時の処理
  const onClickTodoFix = (id, fixTodo) => {
    db.collection('tasks').doc(id).set({content: fixTodo}, {merge: true})
  }
  
  // 削除ボタンを押した時の処理
  const onClickDelete = (id) => {
    db.collection('tasks').doc(id).delete()
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

  // ログアウト処理
  const logOut = async () => {
    try {
      await auth.signOut()
      history.push('login')
    } catch(error) {
      alert(error.message)
    }
  }

  return (
    <SAppContainer>
      <InputAreaContext.Provider value={ {inputTodo, onInputChange, onBtnClick, onKeyDown } }>
      <InputArea />
      </InputAreaContext.Provider>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <SContainer>
        {initData.columnOrder.map((columnId) => {
          const column = initData.columns[columnId]
          const taskList = column.taskIds.map(
            taskId => initData.tasks[taskId]
          )
          return (
            <TaskContext.Provider value={ {onClickDelete, onClickTodoFix} }>
            <Column 
              key={column.id} 
              column={column} 
              tasks={taskList} 
            /> 
            </TaskContext.Provider>
          )
        })}
        </SContainer>
      </DragDropContext>
      <SLogoutBtn onClick={logOut}>
      logout ?
      </SLogoutBtn>
    </SAppContainer>
  )
}

const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const SAppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

const SLogoutBtn = styled.button`
  padding: 16px;
  margin: 8px;
  border: none;
  border-radius: 4px;
  out-line: none;
  cursor: pointer;
  color: white;
  background-color: #1d160b;
  border: 8px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b76f0e;
    color: white;
  }
`