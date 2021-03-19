import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import trashIcon from '../images/trash-icon.png'

const Container = styled.li`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  list-style: none;
  display: flex;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  transition: all 0.3s;
`

export const Task = (props) => {
  const { index, task } = props
  return (
    <Draggable 
      draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
        {task.content}
        <img src="{trashIcon}" alt="" />
        </Container>
      )}
      </Draggable>
  )
}
