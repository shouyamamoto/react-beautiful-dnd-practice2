import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './column'

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
    console.log(result)
    console.log(destination)
    
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

    const column = this.state.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(source.index, 1) // 持っている元のインデックスから1つ配列から削除する
    newTaskIds.splice(destination.index, 0, draggableId) // 置いた先のインデックスに持っている元のidを追加する
    // deleteCountが0の場合には何も削除されないが、少なくとも1つ以上itemを追加する必要がある

    // columnオブジェクトのコピーの後、プロパティを追加して新しいオブジェクトを作る
    const newColumn = {
      ...column, // コピー　いったんここでコピーするのがキモ
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
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId]
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasks} /> 
        })}
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