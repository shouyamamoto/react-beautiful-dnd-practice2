import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import { InputAreaContext } from './App'

export const InputArea = memo(() => {
  const { inputTodo, onInputChange, onBtnClick, onKeyDown } = useContext(InputAreaContext)
  
  return (
    <SInputWrap>
      <SInputFrom 
        type="text" 
        placeholder="TODOを登録" 
        value={inputTodo} 
        onChange={onInputChange} 
        onKeyDown={onKeyDown}
      />
      <SButton onClick={onBtnClick} disabled={!inputTodo}>追加</SButton>
    </SInputWrap>
  )
})


const SInputWrap = styled.div`
  display: flex;
`

const SInputFrom = styled.input`
  padding: 20px;
  margin: 8px;
  display: block;
  border-radius: 2px;
  border: 1px solid lightgray;
  outline: none;
  font-size: 16px;
  background-color: white;
  flex-basis: 70%;
  transition: border 0.2s ease;

  &:focus {
    border: 1px solid #b76f0e;
  }
`

const SButton = styled.button`
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 2px;
  flex-basis: 20%;
  margin: 8px;
  font-weight: bold;
  outline: none;
  transition: background-color .3s ease, color .3s ease;

  &:hover {
    background-color: #b76f0e;
    color: white;
  }
` 