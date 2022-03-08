import { LatLngTuple } from 'leaflet'
import { ITransportPoint, IRouteItem } from '../map/types'
const polylineModule = require('@mapbox/polyline')

export async function fetchRoute(
  startPoint: LatLngTuple,
  endPoint: LatLngTuple
): Promise<any> {
  const url = `http://router.project-osrm.org/route/v1/driving/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?geometries=polyline&overview=simplified&alternatives=false`

  try {
    const res = await fetch(url)
    const parseData = await res.json()
    const encodedPoly = parseData.routes[0].geometry
    if (encodedPoly) {
      return polylineModule.decode(encodedPoly)
    }
    return ''
  } catch (err) {
    console.log('error')
    console.log(err)
  }
}

const testTransportPoints: Array<ITransportPoint> = [
  {
    Id: 1,
    Name: 'Point 1',
    Point: [55.124, 36.6581],
  },
  {
    Id: 2,
    Name: 'Point 2',
    Point: [55.3893, 37.3802],
  },
  {
    Id: 3,
    Name: 'Point 3',
    Point: [55.4403, 37.1795],
  },
  {
    Id: 4,
    Name: 'Point 4',
    Point: [54.9843, 37.3961],
  },
]
const tableData: Array<IRouteItem> = [
  {
    Id: 1,
    Name: '1 Item',
    From: 1,
    To: 2,
  },
  {
    Id: 2,
    Name: '2 Item',
    From: 2,
    To: 3,
  },
  {
    Id: 3,
    Name: '3 Item',
    From: 3,
    To: 4,
  },
  {
    Id: 4,
    Name: '4 Item',
    From: 4,
    To: 1,
  },
]
export function fakeFetchPoints() {
  const resPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(testTransportPoints)
      } catch (error) {
        reject(error)
      }
    }, 500)
  })
  return resPromise
}
export async function fakeFetchOrders() {
  const resPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(tableData)
      } catch (error) {
        reject(error)
      }
    }, 500)
  })
  return resPromise
}
