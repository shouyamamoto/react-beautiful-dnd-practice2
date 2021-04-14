import React, { memo } from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { Task } from './Task'

export const Column = memo(({ column, tasks }) => {
  return (
    <SContainer>
      <STitle>{column.title}</STitle>

      <Droppable 
        droppableId={column.id} 
      >
      {(provided, snapshot) => (
        <STaskList
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
        {tasks.map((task, index) => 
          <Task key={task.id} task={task} index={index} />
        )}
        {provided.placeholder}
        </STaskList>
      )}
      </Droppable>
    </SContainer>
  )
})


const SContainer = styled.div`
  margin: 8px;
  border-radius: 2px;
  width: 300px;
  background-color: #1d160b;

  display: flex;
  flex-direction: column;
`
const STitle = styled.h3`
  padding: 8px;
  color: #fff;
  text-align: center;
  padding: 20px;
`
const STaskList = styled.ul`
  list-style: none;
  padding: 10px;
  transition: background-color 0.3s ease;
  background-color: ${props => (props.isDraggingOver) ? '#efe2cf' : '#1d160b'};
  flex-grow: 1;
  min-height: 300px;
  margin: 0;
`