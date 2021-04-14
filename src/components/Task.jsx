import React, { useState, memo } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import trashIcon from '../images/trash.svg'
import fixIcon from '../images/fix.svg'
import { Modal } from './Modal'

export const Task = memo(({ index, task, onClickDelete, onClickTodoFix }) => {
  const [open, setOpen] = useState(false) // モーダルの開閉

  // 閉じるボタンを押した時の処理
  const onClickClose = (event) => {
    setOpen(false)
  }
  // 編集ボタンを押した時の処理
  const onClickFix = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
    <Draggable 
      draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <SContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <STaskText>{task.content}</STaskText>
          <SFixBtn src={fixIcon} onClick={() => onClickFix()}></SFixBtn>
          <SDeleteBtn 
            src={trashIcon} 
            onClick={() => {
              const answer = window.confirm(`${task.content}を削除しますか？`)
              if(answer) {
                onClickDelete(task.id)}
              }
            }
          >
          </SDeleteBtn>
        </SContainer>
      )}
    </Draggable>

    <Modal open={open} onClickClose={onClickClose} task={task.content} id={task.id} onClickTodoFix={onClickTodoFix}/>
    </React.Fragment>
  )
})


const SContainer = styled.li`
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
const STaskText = styled.p`
  flex-grow: 6;
`
const SDeleteBtn = styled.img`
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
const SFixBtn = styled.img`
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