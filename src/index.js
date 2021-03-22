import React from 'react';
import ReactDOM from 'react-dom';

import { App }  from './components/App'

document.body.style.backgroundColor = '#2e281f'
document.body.style.height = '100%'
document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'
document.body.style.alignItems = 'center'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);