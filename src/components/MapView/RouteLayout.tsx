import { Marker, Polyline, Popup } from 'react-leaflet'
import React, { Fragment } from 'react'
import { RouteState } from '../../features/map/types'
import { purpleOptions } from './stytes'

interface IRouteLayout extends RouteState {}

export const RouteLayout: React.FC<IRouteLayout> = (props) => {
  const { startPoint, endPoint, route } = props
  return (
    <Fragment>
      {startPoint ? (
        <Marker position={startPoint}>
          <Popup>Точка отправки</Popup>
        </Marker>
      ) : null}
      {endPoint ? (
        <Marker position={endPoint}>
          <Popup>Точка доставки</Popup>
        </Marker>
      ) : null}

      {route ? (
        <Polyline pathOptions={purpleOptions} positions={route} />
      ) : null}
    </Fragment>
  )
}
