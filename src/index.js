import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App'

import { Route, BrowserRouter } from 'react-router-dom'
import Login from './components/Login'

document.body.style.backgroundColor = '#2e281f'
document.body.style.height = '100%'
document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'
document.body.style.alignItems = 'center'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
      </>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);