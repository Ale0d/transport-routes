import { LatLngTuple } from 'leaflet'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer } from 'react-leaflet'
import { RouteState } from '../../features/map/types'
import { RouteLayout } from './RouteLayout'

interface IMapRouter {
  width: Number
  height: Number
}

export const MapRouter: React.FC<IMapRouter> = (props) => {
  const { width, height } = props
  const zoom: number = 8
  const mapStyle = {
    width: `${width}px`,
    height: `${height}px`,
  }

  const map: RouteState | undefined = useSelector(
    (store: { map: RouteState }) => store.map
  )
  const layoutRoute = map ? (
    <RouteLayout
      startPoint={map.startPoint}
      endPoint={map.endPoint}
      route={map.route}
    ></RouteLayout>
  ) : null
  const defaultLatLng: LatLngTuple =
    map && map.startPoint && map.endPoint
      ? [
          (map.startPoint[0] + map.endPoint[0]) / 2,
          (map.startPoint[1] + map.endPoint[1]) / 2,
        ]
      : [55.865572, 37.283523]

  return (
    <Fragment>
      <MapContainer
        key={'' + map.startPoint?.[0] + width + height}
        id="mapId"
        center={defaultLatLng}
        zoom={zoom}
        style={mapStyle}
      >
        {layoutRoute}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </Fragment>
  )
}
