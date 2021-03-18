import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data'
import { InputArea } from './components/InputArea'
import { Column } from './components/Column'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`
const AppContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`
const App = () => {
  const tasks = initialData.columns['column-1'].taskIds.length

  const [countId, setCountId] = useState(tasks)
  const [initData, setInitData] = useState(initialData)
  const [inputTodo, setInputTodo] = useState('') 

  const onInputChange = (e) => {setInputTodo(e.target.value)}

  const onBtnClick = () => {
    const newTaskId = countId + 1
    const newTaskIds = [...initData.columns['column-1'].taskIds]
    newTaskIds.push(`task${newTaskId}`)
    
    const newTodoColumn = {
      ...initData.columns['column-1'],
      taskIds: newTaskIds
    }
    
    const newColumns = {
      ...initData.columns,
      'column-1': newTodoColumn
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

  const onKeyDown = (e) => {
    if(e.keyCode === 13) {
      onBtnClick()
    }
  }

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
        ...start, // コピー　いったんここでコピーするのがキモ
        taskIds: newTaskIds // 追加するプロパティ(taskIdsはもともとあるプロパティなので、このプロパティに上書きされる)
      }
  
      const newState = {
        ...initData, // stateのコピー　キモ
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
      <InputArea inputTodo={inputTodo} onChange={onInputChange} onClick={onBtnClick} onEnter={onKeyDown}/>
      <DragDropContext 
        onDragEnd={onDragEnd}
      >
        <Container>
        {initData.columnOrder.map((columnId) => {
          const column = initData.columns[columnId]
          const tasks = column.taskIds.map(taskId => initData.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks} /> 
        })}
        </Container>
      </DragDropContext>
    </AppContainer>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);