import { Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_POINT_ROUTE, UPDATE_ORDER } from '../../features/map/actionTypes'
import {
  IRouteItem,
  ITableColItem,
  ITransportPoint,
  OrdersState,
  PointsState,
} from '../../features/map/types'

interface SelectPointProps {
  points: PointsState['points']
  defaultPoint: number
  orderId: number
  typePoint: 'From' | 'To'
  updateHandler(): void
}
export const SelectPoint: React.FC<SelectPointProps> = (props) => {
  const dispatch = useDispatch()
  const { points, defaultPoint, orderId, typePoint, updateHandler } = props
  return (
    <Select
      defaultValue={String(defaultPoint)}
      onChange={(value) => {
        dispatch({
          type: UPDATE_ORDER,
          payload: {
            orderId: orderId,
            newValue: value,
            nameValue: typePoint,
          },
        })
        updateHandler()
      }}
    >
      {points.map((el: ITransportPoint) => (
        <Select.Option key={String(el.Id)} value={String(el.Id)}>
          {el.Name}
        </Select.Option>
      ))}
    </Select>
  )
}

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
      <h3>Таблица с заявками</h3>
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
              <SelectPoint
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
              <SelectPoint
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
