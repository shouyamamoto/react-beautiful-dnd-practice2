import React, { memo } from 'react'
import styled from 'styled-components'

import { InputArea } from './InputArea'

const ModalWindow = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: 0.94;
  border-radius: 2px;
  padding: 60px;
`

const ModalTitle = styled.p`
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

const CloseBtn = styled.div`
  position: absolute;
  top: 3%;
  right: 2%;
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

export const Modal = memo(({open, onClickClose}) => {
  return(
    <>
    {open ? (
      <>
      <ModalWindow>
        <ModalTitle>TODOを修正</ModalTitle>
      </ModalWindow>
      <CloseBtn onClick={() => {onClickClose()}}>✖︎</CloseBtn>
      </>
    ): null
    }
    </>
  )
})