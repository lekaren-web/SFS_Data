import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import appReducer from './redux'
import { createLogger } from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

