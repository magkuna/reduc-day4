import React from 'react'
import ReactDOM from 'react-dom'

import { store } from './store'
import { Provider } from 'react-redux'

import App from './App'
import Auth from './Auth'


ReactDOM.render(
    <Provider store={store}>
        <Auth>
            <App />
        </Auth>
    </Provider>,
    document.getElementById('root'))

