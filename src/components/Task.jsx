import React, { memo } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import trashIcon from '../images/trash.svg'
import fixIcon from '../images/fix.svg'

const Container = styled.li`
  border-radius: 2px;
  padding: 8px 8px 8px 16px;
  margin-bottom: 8px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.isDragging ? '#b76f0e' : 'white')};
  color: ${props => (props.isDragging ? 'white' : '#333')};
  transition: all 0.3s;
`
const TaskText = styled.p`
  flex-grow: 6;
`
const DeleteBtn = styled.img`
  padding: 4px 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 14px;
  height: auto;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`
const FixBtn = styled.img`
  padding: 4px 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 14px;
  height: auto;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`

export const Task = memo(({ index, task, onClickDelete, onClickFix }) => {
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
        <TaskText>{task.content}</TaskText>
        <FixBtn src={fixIcon} onClick={() => onClickFix()}></FixBtn>
        <DeleteBtn src={trashIcon} onClick={() => onClickDelete(index, task.id)}></DeleteBtn>
        </Container>
      )}
    </Draggable>
  )
})
