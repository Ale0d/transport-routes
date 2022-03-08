import { LatLngTuple } from 'leaflet'
import {
  SET_POINT_ROUTE,
  SET_ROUTE,
  SET_ORDERS,
  SET_POINTS,
  UPDATE_ORDER,
} from './actionTypes'

interface ShowRouteAction {
  type: typeof SET_POINT_ROUTE
  payload: {
    startPoint: LatLngTuple | undefined
    endPoint: LatLngTuple | undefined
  }
}
interface SetRoute {
  type: typeof SET_ROUTE
  payload: {
    route: Array<LatLngTuple> | undefined
  }
}
export type RouteActionTypes = ShowRouteAction | SetRoute

interface SetPoints {
  type: typeof SET_POINTS
  payload: PointsState
}

export type PointsActionTypes = SetPoints

interface SetOrders {
  type: typeof SET_ORDERS
  payload: OrdersState
}
interface UpdateOrder {
  type: typeof UPDATE_ORDER
  payload: {
    orderId: number
    nameValue: 'From' | 'To'
    newValue: number
  }
}

export type OrderActionTypes = SetOrders | UpdateOrder

export interface RouteState {
  startPoint: LatLngTuple | undefined
  endPoint: LatLngTuple | undefined
  route: Array<LatLngTuple> | undefined
}

export interface ITransportPoint {
  Id: number
  Name: String
  Point: LatLngTuple
}

export interface ITableItem {
  Id: number | String
  Name: String
  From: ITransportPoint
  To: ITransportPoint
}
export interface IRouteItem {
  Id: number | String
  Name: String
  From: number
  To: number
}

export interface PointsState {
  points: Array<ITransportPoint>
}

export interface OrdersState {
  orders: Array<IRouteItem>
}
export interface ITransportPoint {
  Name: String
  Point: LatLngTuple
}

export interface ITableItem {
  Id: number | String
  Name: String
  From: ITransportPoint
  To: ITransportPoint
}
export interface ITableColItem {
  key: String | number
  NameShipment: String
  From: String
  FromId: number
  To: String
  ToId: number
}
