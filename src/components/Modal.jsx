import React, { memo, useState } from 'react'
import styled from 'styled-components'

const ModalMask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ModalWindow = styled.div`
  width: 70vw;
  max-width: 400px;
  height: 30vh;
  background-color: #efe2cf;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 2px;
  padding: 60px;
`

const ModalTitle = styled.p`
  color: #2e281f;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const InputFrom = styled.input`
  padding: 20px;
  border-radius: 2px;
  border: 1px solid lightgray;
  outline: none;
  font-size: 16px;
  background-color: white;
  transition: border 0.2s ease;

  &:focus {
    border: 1px solid #b76f0e;
  }
`

const CloseBtn = styled.div`
  position: absolute;
  top: 8%;
  right: 5%;
  padding: 10px 15px;
  display: inline-block;
  background-color: #efe2cf;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.3s;

  &:hover {
    background-color: #b76f0e;
    color: white;
  }
`

export const Modal = memo(({open, onClickClose, task}) => {
  const [ inputTodo, setInputTodo] = useState('')

  const onChange = (e) => {setInputTodo(e.target.value)}

  return(
    <>
    {open ? (
      <>
      <ModalMask onClick={() => onClickClose()}></ModalMask>
      <ModalWindow>
        <ModalTitle>TODOを修正</ModalTitle>
        <InputArea>
        <InputFrom 
          type="text"
          id="newTask"
          placeholder={task}
          value={inputTodo}
          onChange={onChange}
        />
        </InputArea>
      </ModalWindow>
      <CloseBtn onClick={() => {onClickClose()}}>✖︎</CloseBtn>
      </>
    ): null
    }
    </>
  )
})