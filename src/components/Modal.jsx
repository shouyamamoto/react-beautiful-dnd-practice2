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
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalInner = styled.div`
  width: 90%;
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

const BtnArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`

const FixBtn = styled.button`
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 2px;
  font-weight: bold;
  outline: none;
  transition: background-color .3s ease, color .3s ease;

  &:hover {
    background-color: #b76f0e;
    color: white;
  }
`

const CancelBtn = styled.button`
  border: none;
  padding: 8px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 2px;
  font-weight: bold;
  outline: none;
  transition: background-color .3s ease, color .3s ease;
  background-color: transparent;

  &:hover {
    color: white;
  }
`

const CloseBtn = styled.button`
  position: absolute;
  top: 8%;
  right: 5%;
  padding: 10px 15px;
  display: inline-block;
  cursor: pointer;
  border-radius: 2px;
  out-line: none;
  border: none;
  transition: all 0.3s;
  background-color: #efe2cf;

  &:hover {
    color: white;
    background-color: #1d160b;
  }
`

export const Modal = memo(({open, onClickClose, onClickTodoFix, task, id}) => {
  const [ fixTodo, setFixTodo ] = useState('')

  const onChange = (e) => {setFixTodo(e.target.value)}

  return(
    <>
    {open ? (
      <>
      <ModalMask onClick={() => onClickClose()}></ModalMask>
      <ModalWindow>
        <ModalInner>
        <ModalTitle>TODOを修正</ModalTitle>
        <InputArea>
        <InputFrom 
          type="text"
          id="newTask"
          placeholder={task}
          value={fixTodo}
          onChange={onChange}
        />

        <BtnArea>
          <CancelBtn onClick={() => {onClickClose()}}>キャンセル</CancelBtn>
          <FixBtn 
            onClick={() => {
              if(fixTodo) {
                onClickTodoFix(id,fixTodo)
                onClickClose()
              } else {
                alert('TODOを入力してください')
              }
            }}
          >
            修正する
          </FixBtn>
        </BtnArea>
        </InputArea>
        </ModalInner>
      </ModalWindow>
      <CloseBtn onClick={() => {onClickClose()}}>✖︎</CloseBtn>
      </>
    ): null
    }
    </>
  )
})