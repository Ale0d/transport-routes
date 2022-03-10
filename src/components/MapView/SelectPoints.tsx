import { Select } from 'antd'
import { UPDATE_ORDER } from '../../features/map/actionTypes'
import { ITransportPoint, PointsState } from '../../features/map/types'
import { useDispatch } from 'react-redux'

interface SelectPointProps {
  points: PointsState['points']
  defaultPoint: number
  orderId: number
  typePoint: 'From' | 'To'
  updateHandler(): void
}
export const SelectPoints: React.FC<SelectPointProps> = (props) => {
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
