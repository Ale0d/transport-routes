import { Properties } from 'csstype'

export const dividerWidth = 2
export const dividerWidthMargin = dividerWidth * 8 + 16
export const DividerStyle: Properties = {
  height: '100%',
  cursor: 'col-resize',
  padding: `0px ${dividerWidth}px`,
  backgroundColor: 'black',
  userSelect: 'none',
  width: `${dividerWidth}px`,
  border: `${dividerWidth}px solid #0000`,
}
export const ColStyleWraper = {
  width: `auto`,
  overflow: 'hidden',
}
