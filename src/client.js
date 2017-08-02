"use strict"
//react
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// Import combined reducers
import reducers from './reducers/index'
//Import actions
import {addToCart} from './actions/cartActions'
//step 1 create the store
const middleware = applyMiddleware(thunk, logger)
// PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE
const store = createStore(reducers, initialState, middleware); //createStore takes the reducer and makes a store with it

import routes from './routes'
const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)

render(
  Routes, document.getElementById('app')
)
