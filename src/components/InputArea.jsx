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
  border: 1px solid #f1f1f1;
  outline: none;
  font-size: 16px;
  background-color: white;
  flex-basis: 70%;
`

const Button = styled.button`
  border: none;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 8px;
  flex-basis: 20%;
  margin: 8px;
  outline: none;
  transition: background-color .3s ease;

  &:hover {
    background-color: skyblue;
  }
` 

export const InputArea = (props) => {
  return (
    <InputWrap>
      <InputFrom placeholder="TODOを入力"/>
      <Button>追加</Button>
    </InputWrap>
  )
}