import { Col, Divider, Row } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MapRouter } from './MapView/MapRouter'
import { TableRouters } from './MapView/TableRouters'
import 'antd/dist/antd.css'
import { FETCH_ORDERS, FETCH_POINTS } from '../features/map/actionTypes'
import { ColStyleWraper, DividerStyle, dividerWidthMargin } from './Main.styles'

const MovingDivider: React.FC = () => {
  return (
    <Divider
      style={DividerStyle}
      type="vertical"
      orientation="center"
    ></Divider>
  )
}
export const Main: React.FC = () => {
  const layoutRef = useRef<HTMLDivElement>(null)
  const [tableWidth, setTableWidth] = useState<number>(400)
  const [mapWidth, setMapWidth] = useState<number>(400)
  const [appWidth, setAppWidth] = useState<number>(832)
  const [appHeight, setAppHeight] = useState<number>(832)
  const [onMove, setOnMove] = useState<number>(-1)
  const dispatch = useDispatch()

  function updateAppSize() {
    if (layoutRef.current) {
      const newAppWidth = layoutRef.current.offsetWidth
      const newAppHeight = layoutRef.current.offsetHeight
      const blockWidth = (newAppWidth - dividerWidthMargin) / 2
      setAppWidth(newAppWidth)
      setAppHeight(newAppHeight)
      setTableWidth(blockWidth)
      setMapWidth(newAppWidth - dividerWidthMargin - blockWidth)
    }
  }

  useEffect(() => {
    dispatch({
      type: FETCH_POINTS,
    })
    dispatch({
      type: FETCH_ORDERS,
    })
  }, [])

  useEffect(() => {
    updateAppSize()
    return () => {}
  }, [])
  useEffect(() => {
    window.addEventListener('resize', updateAppSize)
    return () => window.removeEventListener('resize', updateAppSize)
  })

  function getNewTableWitdh(clientX: number): number {
    const diff = onMove - clientX
    let newTableWidth = tableWidth - diff
    if (newTableWidth < 10) newTableWidth = 10
    if (newTableWidth + dividerWidthMargin + 10 > appWidth)
      newTableWidth = appWidth - (10 + dividerWidthMargin)
    return newTableWidth
  }

  function handlerUp(event: React.MouseEvent) {
    if (onMove !== -1) {
      let newTableWidth = getNewTableWitdh(event.clientX)
      setOnMove(-1)
      setTableWidth(newTableWidth)
      setMapWidth(appWidth - dividerWidthMargin - newTableWidth)
    }
  }

  function handlerMove(event: React.MouseEvent) {
    if (onMove !== -1) {
      let newTableWidth = getNewTableWitdh(event.clientX)
      setTableWidth(newTableWidth)
      setMapWidth(appWidth - dividerWidthMargin - newTableWidth)
      setOnMove(event.clientX)
    }
  }
  function handlerDown(event: React.MouseEvent) {
    setOnMove(event.clientX)
  }
  const TableRouterBox = useMemo(() => <TableRouters />, [])

  return (
    <div>
      <Row
        ref={layoutRef}
        onMouseUp={handlerUp}
        onMouseMove={handlerMove}
        onMouseLeave={handlerUp}
        style={{ height: '100%' }}
      >
        <Col
          style={{
            width: `${tableWidth}px`,
            height: `${appHeight}px`,
            overflow: 'scroll',
          }}
        >
          {TableRouterBox}
        </Col>
        <Col onMouseDown={handlerDown}>
          <MovingDivider />
        </Col>
        <Col style={ColStyleWraper}>
          <MapRouter width={mapWidth} height={appHeight}></MapRouter>
        </Col>
      </Row>
    </div>
  )
}
