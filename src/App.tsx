import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Routes } from './pages/Routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container" style={{ height: '100%' }}>
        <Switch>
          <Route path="/" component={Routes} exact />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
