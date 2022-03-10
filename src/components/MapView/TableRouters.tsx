import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_POINT_ROUTE } from '../../features/map/actionTypes'
import {
  IRouteItem,
  ITableColItem,
  OrdersState,
  PointsState,
} from '../../features/map/types'
import { SelectPoints } from './SelectPoints'

export const TableRouters: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined)
  const points: PointsState['points'] | undefined = useSelector(
    (store: { points: PointsState }) => store.points
  ).points
  const orders: OrdersState['orders'] | undefined = useSelector(
    (store: { orders: OrdersState }) => store.orders
  ).orders

  let sourceTable: Array<ITableColItem> = []
  if (points && !!points.length && orders && !!orders.length) {
    sourceTable = orders.map((el) => {
      return {
        key: el.Id,
        NameShipment: el.Name,
        From: points.find((pItem) => el.From === pItem.Id)?.Name || '',
        FromId: el.From,
        To: points.find((pItem) => el.To === pItem.Id)?.Name || '',
        ToId: el.To,
      }
    })
  }
  function updateRow() {
    if (points && orders) {
      let item: IRouteItem | undefined = orders.find(
        (el) => el.Id === selectedRow
      )
      if (item) {
        let startPoint = points.find((el) => el.Id === item?.From)
        let endPoint = points.find((el) => el.Id === item?.To)!
        if (startPoint && endPoint) {
          dispatch({
            type: SET_POINT_ROUTE,
            payload: {
              startPoint: startPoint.Point,
              endPoint: endPoint.Point,
            },
          })
        }
      }
    }
  }
  useEffect(() => {
    if (selectedRow) {
      updateRow()
    }
  }, [selectedRow])

  function rowHandler(record: ITableColItem) {
    return {
      onClick: () => {
        setSelectedRow(Number(record.key))
      },
    }
  }
  return (
    <div>
      <Table
        dataSource={sourceTable}
        rowClassName={(record): string => {
          if (record.key === selectedRow) return 'selected'
          return ''
        }}
        onRow={rowHandler}
      >
        <Table.Column<ITableColItem> key="Id" title="#" dataIndex="key" />
        <Table.Column<ITableColItem>
          key="NameShipment"
          title="Название заказа"
          dataIndex="NameShipment"
        />
        <Table.Column<ITableColItem>
          key="From"
          title="Откуда"
          dataIndex="From"
          render={(value, record) => {
            return (
              <SelectPoints
                orderId={Number(record.key)}
                points={points}
                defaultPoint={Number(record.FromId)}
                typePoint="From"
                updateHandler={updateRow}
              />
            )
          }}
        />
        <Table.Column<ITableColItem>
          key="To"
          title="Куда"
          dataIndex="To"
          render={(value, record) => {
            return (
              <SelectPoints
                orderId={Number(record.key)}
                points={points}
                defaultPoint={Number(record.ToId)}
                typePoint="To"
                updateHandler={updateRow}
              />
            )
          }}
        />
      </Table>
    </div>
  )
}
