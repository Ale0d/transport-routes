import { LatLngTuple } from 'leaflet'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { CircleMarker, MapContainer, Polyline, TileLayer } from 'react-leaflet'
import { RouteState } from '../../features/map/types'

interface IMapRouter {
  width: Number
  height: Number
}
export const MapRouter: React.FC<IMapRouter> = (props) => {
  const { width, height } = props
  const blueOptions = { fillColor: 'blue' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }
  const zoom: number = 8
  const mapStyle = {
    width: `${width}px`,
    height: `${height}px`,
  }

  const map: RouteState | undefined = useSelector(
    (store: { map: RouteState }) => store.map
  )
  const layoutRoute = map ? (
    <Fragment>
      {map.startPoint ? (
        <CircleMarker
          center={map.startPoint}
          pathOptions={blueOptions}
          radius={20}
        ></CircleMarker>
      ) : null}
      {map.endPoint ? (
        <CircleMarker
          center={map.endPoint}
          pathOptions={redOptions}
          radius={20}
        ></CircleMarker>
      ) : null}

      {map.route ? (
        <Polyline pathOptions={purpleOptions} positions={map.route} />
      ) : null}
    </Fragment>
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
      <div id="map" style={{ width: '100%', height: '100%' }}>
        <MapContainer
          key={defaultLatLng.join('')}
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
      </div>
    </Fragment>
  )
}
