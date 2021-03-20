import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { Task } from './Task'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 8px 8px 0 0;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.ul`
  list-style: none;
  padding: 8px;
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isDraggingOver) ? 'skyblue' : 'white'};
  flex-grow: 1;
  min-height: 100px;
`

export const Column = (props) => {
  const { column, tasks, onClickDelete } = props
  return (
    <Container>
    <Title>{column.title}</Title>

    <Droppable 
      droppableId={column.id} 
    >
    {(provided, snapshot) => (
      <TaskList
        ref={provided.innerRef}
        {...provided.droppableProps}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {tasks.map((task, index) => <Task key={task.id} task={task} onClickDelete={onClickDelete} index={index}/>)}
        {provided.placeholder}
      </TaskList>
    )}
    </Droppable>

    </Container>
  )
}