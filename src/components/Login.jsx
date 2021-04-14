import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'

export const Login = ({ history }) => {
  const [ isLogin, setIsLogin ] = useState(true)
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  useEffect(() => {
    // onAuthStateChanged ユーザがログイン、ログアウトした場合に毎回呼ばれるメソッド
    // userが存在した場合には path に遷移させる
    const unSub = auth.onAuthStateChanged((user) => {
      user && history.push('/')
    })
    return () => unSub()
  }, [history])

  return (
    <SLoginContainer>
      <SLoginTitle>{isLogin ? 'Login' : 'Register' }</SLoginTitle>
      <br />
      <SInputArea>
      <SInputForm
        type="text" 
        name="email" 
        aria-label="E-mail" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }} 
      />
      <br />
      <SInputForm
        type="password"
        aria-label="Password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }} 
      />
      </SInputArea>
      <SLoginBtn
        type="submit"
        onClick={
          isLogin 
            ? async () => {
              try {
                await auth.signInWithEmailAndPassword(email, password)
                history.push('/')
              } catch (error) {
                alert(error.message)
              }
            } 
            : async () => {
              try {
                await auth.createUserWithEmailAndPassword(email, password)
                history.push('/')
              } catch (error) {
                alert(error.message)
              }
            }
          }
      >
      { isLogin ? 'login' : 'Register' }
      </SLoginBtn>
      <br />
      <SToggleLogin onClick={() => setIsLogin(!isLogin)}>
        { isLogin ? "Create new account ? " : "Back to Login" }
      </SToggleLogin>
    </SLoginContainer>
  )
}

export default Login


const SLoginContainer = styled.div`
  padding: 60px 120px;
  background-color: #efe2cf;
  border-radius: 8px;
`

const SLoginTitle = styled.h1`
  color: #1d160b;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
`

const SInputArea = styled.div`
  text-align: center;
`

const SInputForm = styled.input`
  padding: 10px 16px;
  margin: 4px 0;
  font-size: 16px;
  color: #1d160b;
`

const SLoginBtn = styled.button`
  padding: 16px;
  margin: 20px 0 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  out-line: none;
  cursor: pointer;
  color: white;
  background-color: #1d160b;
  border: 8px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b76f0e;
    color: white;
  }
`

const SToggleLogin = styled.span`
  color: #1d160b;
  cursor: pointer;
`
