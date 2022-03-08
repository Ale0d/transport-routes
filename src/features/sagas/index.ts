import { takeLatest, put, call } from 'redux-saga/effects'
import {
  SET_ROUTE,
  SET_POINT_ROUTE,
  SET_ORDERS,
  FETCH_ORDERS,
  FETCH_POINTS,
  SET_POINTS,
} from '../map/actionTypes'
import { fakeFetchOrders, fakeFetchPoints, fetchRoute } from '../api/RouterApi'

function* loadRoute(action: any): any {
  const data = yield call(
    fetchRoute,
    action.payload.startPoint,
    action.payload.endPoint
  )
  yield put({
    type: SET_ROUTE,
    payload: { route: data },
  })
}

function* loadOrders(): any {
  const data = yield call(fakeFetchOrders)
  yield put({
    type: SET_ORDERS,
    payload: { orders: data },
  })
}

function* loadPoints(): any {
  const data = yield call(fakeFetchPoints)
  yield put({
    type: SET_POINTS,
    payload: { points: data },
  })
}

export function* workerSaga(action: any): any {
  yield call(loadRoute, action)
}

export function* watchClickSaga() {
  yield takeLatest(FETCH_POINTS, loadPoints)
  yield takeLatest(FETCH_ORDERS, loadOrders)
  yield takeLatest(SET_POINT_ROUTE, workerSaga)
}

export default function* rootSaga() {
  yield watchClickSaga()
}
