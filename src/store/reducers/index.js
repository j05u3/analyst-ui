import { combineReducers } from 'redux'
import app from './app'
import config from './config'
import date from './date'
import errors from './errors'
import map from './map'
import route from './route'
import tangram from './tangram'
import viewBounds from './viewBounds'

const reducers = combineReducers({
  app,
  config,
  date,
  errors,
  map,
  route,
  tangram,
  viewBounds
})

export default reducers
