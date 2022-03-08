/* eslint-disable @typescript-eslint/default-param-last */

import {
  SET_POINT_ROUTE,
  SET_ROUTE,
  SET_ORDERS,
  SET_POINTS,
  UPDATE_ORDER,
} from './actionTypes'
import {
  RouteActionTypes,
  OrdersState,
  RouteState,
  PointsActionTypes,
  OrderActionTypes,
  PointsState,
  IRouteItem,
} from './types'

const initialStateRoute: RouteState = {
  startPoint: undefined,
  endPoint: undefined,
  route: undefined,
}

const routeReducer = (state = initialStateRoute, action: RouteActionTypes) => {
  switch (action.type) {
    case SET_POINT_ROUTE:
      return {
        ...state,
        startPoint: action.payload.startPoint,
        endPoint: action.payload.endPoint,
        route: undefined,
      }
    case SET_ROUTE:
      return {
        ...state,
        route: action.payload.route,
      }
    default:
      return state
  }
}

const initialStateOrders: OrdersState = {
  orders: [],
}

export const ordersReducer = (
  state = initialStateOrders,
  action: OrderActionTypes
) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
      }
    case UPDATE_ORDER:
      const newState = { ...state }
      newState.orders = newState.orders.map((el: IRouteItem) => {
        if (el.Id === action.payload.orderId) {
          el[action.payload.nameValue] = Number(action.payload.newValue)
        }
        return el
      })
      return newState
    default:
      return state
  }
}

const initialStatePoints: PointsState = {
  points: [],
}

export const pointsReducer = (
  state = initialStatePoints,
  action: PointsActionTypes
) => {
  switch (action.type) {
    case SET_POINTS:
      return {
        ...state,
        points: action.payload.points,
      }
    default:
      return state
  }
}

export default routeReducer
