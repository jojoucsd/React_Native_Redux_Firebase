import React from 'react';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from './reducers'
import App from './app'

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(reducers)

const AppStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppStore