import React from 'react'
import {render} from 'react-dom'

import { fieldTypes, Form } from '../../src'

import { H1, H2, H3, Container, Nav, NavContent, NavItem, Grid, Cell } from 'react-blazecss'
import 'blaze/dist/blaze.min.css'
import 'blaze/dist/blaze.animations.min.css'
import 'font-awesome/css/font-awesome.min.css'

import { Panel } from './components/Panel'
import { Center } from './components/Center'
import { FileDropZone } from './components/FileDropZone'
import { ImportPopup } from './components/ImportPopup'
import { SideMenu } from './components/SideMenu'
import Portal from 'react-portal'

import brand from 'img/pam_couleur.png'

import { Redirect, Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import './styles.scss'

import { AdminApp, CalendarApp, WorkflowApp, UserApp, AddUserApp, EditUserApp } from './admin'

const Empty = (props) => (
  null
)

render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/admin/home"/>
    <Route path="/admin" component={AdminApp}>
      <Route path="home" component={Empty}/>
      <Route path="pages" component={Empty}/>
      <Route path="users" component={UserApp}/>
      <Route path="users/_add" component={AddUserApp}/>
      <Route path="users/:id" component={EditUserApp}/>
      <Route path="agenda" component={CalendarApp}/>
      <Route path="workflow" component={WorkflowApp}/>
        {/*<Route path="about" component={About}/>
        <Route path="users" component={Users}>
          <Route path="/user/:userId" component={User}/>
        </Route>
        */}
      <Route path="medias" component={Empty}/>
      <Route path="tables" component={Empty}>
        <Route path=":tableId" component={Empty}/>
      </Route>
      <Route path="refs" component={Empty}>
        <IndexRoute component={Empty} />
        <Route path=":refId" component={Empty} />
      </Route>
      <Route path="forms" component={Empty}/>
    </Route>
  </Router>
), document.querySelector('#demo'))


document.getElementsByTagName("body")[0].className = "c-text"

// Add a few scripts
function addScript(url){
    const script = document.createElement('script') 
    script.type = "text/javascript"
    script.async = true
    script.src = url
    // script.onload = () => {
    //   if (this._isMounted) this.initGoogleMaps()
    // }
}

addScript("http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js")
// addScript("https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.0.7/jsPlumb.min.js")
