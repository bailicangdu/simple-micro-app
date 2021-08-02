import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Page1 from './pages/page1'

const Page2 = lazy(() => import(/* webpackChunkName: "page2" */ './pages/page2'))

function AppRouter () {
  return (
    <BrowserRouter basename='/react17/'>
      <Switch>
        <Route path="/" exact>
          <Page1 />
        </Route>
        <Route path="/page2">
          <Suspense fallback={<div>Loading...</div>}>
            <Page2 />
          </Suspense>
        </Route>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
