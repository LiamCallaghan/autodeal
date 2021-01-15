import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './component/common/Home'
import CardDisplay from './component/game/CardDisplay'


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/deck' component={CardDisplay}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
