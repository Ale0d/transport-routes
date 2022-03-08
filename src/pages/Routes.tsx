import { Content, Footer, Header } from 'antd/lib/layout/layout'
import React, { Fragment } from 'react'
import { Main } from '../components/Main'
import { Properties } from 'csstype'

export const Routes: React.FC = () => {
  const headerHeight = 64
  const footerHeight = 60

  const contentStyle: Properties = {
    height: `calc(100% - ${headerHeight + footerHeight}px)`,
  }
  const headerStyle: Properties = {
    height: `${headerHeight}px`,
    textAlign: 'center',
  }
  const footerStyle: Properties = {
    border: '1px solid blue',
  }

  return (
    <Fragment>
      <Header style={headerStyle}>
        <h3 style={{ color: 'white' }}>
          Модуль отображения заявок на перевозку
        </h3>
      </Header>
      <Content style={contentStyle}>
        <Main />
      </Content>
      <Footer
        style={{
          height: `${footerHeight}px`,
        }}
      >
        <div style={footerStyle}> </div>
      </Footer>
    </Fragment>
  )
}
