import ReactDOM from 'react-dom'
import 'normalize.css'
import axios from 'axios'

import './index.css'
import { App } from './app'

window.axios = axios

ReactDOM.render(<App />, document.getElementById('root'))
