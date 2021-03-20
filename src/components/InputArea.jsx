import React from 'react'
import styled from 'styled-components'

const InputWrap = styled.div`
  display: flex;
`

const InputFrom = styled.input`
  padding: 20px;
  margin: 8px;
  display: block;
  border-radius: 8px;
  border: 1px solid lightgray;
  outline: none;
  font-size: 16px;
  background-color: white;
  flex-basis: 70%;
  transition: border 0.2s ease;

  &:focus {
    border: 1px solid skyblue;
  }
`

const Button = styled.button`
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 8px;
  flex-basis: 20%;
  margin: 8px;
  outline: none;
  transition: background-color .3s ease, color .3s ease;

  &:hover {
    background-color: skyblue;
    color: white;
  }
` 

export const InputArea = (props) => {
  const { inputTodo, onChange, onClick, onEnter } = props
  return (
    <InputWrap>
      <InputFrom type="text" placeholder="TODOを入力" value={inputTodo} onChange={onChange} onKeyDown={onEnter}/>
      <Button onClick={onClick}>追加</Button>
    </InputWrap>
  )
}