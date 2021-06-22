import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'

import './index.css'
import { App } from './app'
import { DialogProvider } from './common/dialog'

ReactDOM.render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
