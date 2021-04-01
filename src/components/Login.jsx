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
    <div>
      <h1>{isLogin ? 'Login' : 'Register' }</h1>
      <br />
      <input 
        type="text" 
        name="email" 
        aria-label="E-mail" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }} 
      />
      <br />
      <input 
        type="password"
        aria-label="Password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }} 
      />
      <br />
      <button
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
      </button>
      <br />
      <span onClick={() => setIsLogin(!isLogin)}>
        { isLogin ? "Create new account ? " : "Back to Login" }
      </span>
    </div>
  )
}

export default Login