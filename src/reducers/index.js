"use strict"
import {combineReducers} from 'redux'

// Import reducers to be combined here
import {booksReducers} from './booksReducers'
import {cartReducers} from './cartReducers'

// Combine them here
export default combineReducers({
  books: booksReducers,
  cart: cartReducers
})
