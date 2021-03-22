import React, { memo } from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { Task } from './Task'

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width: 300px;
  background-color: #1d160b;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
  color: #fff;
  text-align: center;
  padding: 20px;
`
const TaskList = styled.ul`
  list-style: none;
  padding: 10px;
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isDraggingOver) ? '#efe2cf' : '#1d160b'};
  flex-grow: 1;
  min-height: 300px;
  margin: 0;
`

export const Column = memo(({ column, tasks, onClickDelete, onClickFix }) => {
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
        {tasks.map((task, index) => 
          <Task key={task.id} task={task} index={index} onClickDelete={onClickDelete} onClickFix={onClickFix}/>
        )}
        {provided.placeholder}
        </TaskList>
      )}
      </Droppable>
    </Container>
  )
})