import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './column'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`

class App extends React.Component {
  state = initialData
  onDragEnd = result => {
    // destinationは置いた先、sourceは元の場所、draggableIdには持っているタスクのidが入っている
    /**
     * resultの例
     * これは1つめのタスクをカラム1のindex0からカラム1のindex1にドロップしたというresultをもっている
     * const result = {
     *   draggableId: 'task-1',
     *   type: 'TYPE',
     *   reason: 'DROP',
     *   source: {
     *     droppableId: 'column-1',
     *     index: 0,
     *   },
     *   destination: {
     *     droppableId: 'column-1',
     *     index: 1,
     *   }
     * }
     */
    const { destination, source, draggableId } = result
    // 置いた先がなければ何もせずに処理を終了させる
    if(!destination) {
      return
    }

    // もし置いた先のIDと置く前のIDが同じだった場合、加えてインデックスの値が宛先と同じかを確認し、
    // これがtrueの場合には持った場所と置いた場所が同じだったことを指し、何もせずに処理を終了すれば良い
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]
    
    // startしたcolumnとfinishしたcolumnが同じ場合にはこの処理を続ける
    if( start === finish ) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1) // 持っている元のインデックスから1つ配列から削除する
      newTaskIds.splice(destination.index, 0, draggableId) // 置いた先のインデックスに持っている元のidを追加する
      // deleteCountが0の場合には何も削除されないが、少なくとも1つ以上itemを追加する必要がある
  
      // columnオブジェクトのコピーの後、プロパティを追加して新しいオブジェクトを作る
      const newColumn = {
        ...start, // コピー　いったんここでコピーするのがキモ
        taskIds: newTaskIds // 追加するプロパティ(taskIdsはもともとあるプロパティなので、このプロパティに上書きされる)
      }
  
      const newState = {
        ...this.state, // stateのコピー　キモ
        columns: { // もともとのcolumnsを以下に変更する
          ...this.state.columns,  
          [newColumn.id]: newColumn,
        }
      }
      
      // stateを変更する
      this.setState(newState)
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
      ...this.state, // stateのコピー
      columns: { // columnsを変更する
        ...this.state.columns, // columnsのコピー
        [newStart.id]: newStart, // dragを開始したcolumnIdに、新しい配列（タスクを削除した配列）を当てる
        [newFinish.id]: newFinish, // dragをしたcolumnIdに、新しい配列(タスクを追加した配列)を当てる
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext 
        onDragEnd={this.onDragEnd}
      >
        <Container>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId]
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks} /> 
        })}
        </Container>
      </DragDropContext>
      
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);