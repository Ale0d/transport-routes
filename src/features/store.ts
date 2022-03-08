import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mapReducer, { ordersReducer, pointsReducer } from './map/mapReducer'
import rootSaga from './sagas'

const rootReducer = combineReducers({
  map: mapReducer,
  points: pointsReducer,
  orders: ordersReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store
