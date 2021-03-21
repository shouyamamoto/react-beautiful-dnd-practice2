import React, { memo } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import trashIcon from '../images/trash.svg'
import fixIcon from '../images/fix.svg'

const Container = styled.li`
  border: 1px solid lightgray;
  border-radius: 8px 8px 0 0;
  padding: 8px;
  margin-bottom: 8px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
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

export const Task = memo(({ index, task, onClickDelete }) => {
  console.log('taskが再度レンダリングされた')
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
        <FixBtn src={fixIcon}></FixBtn>
        <DeleteBtn src={trashIcon} onClick={() => onClickDelete(index, task.id)}></DeleteBtn>
        </Container>
      )}
      </Draggable>
  )
})
