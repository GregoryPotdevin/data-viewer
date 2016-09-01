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

import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import './styles.scss'


class Demo extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      showImportPopup: false
    }

  }
  
  render(){
    console.log("data", this.state.data)
    return (
      <div className="c-text">
        <Nav inline shadow="high" animate position="top" fixed style={{zIndex: 11}}>
          {/*<Nav inline shadow="higher" animate position="top" fixed>*/}
            <span className="c-nav__brand"><img src={brand} /></span>
            <NavItem right bStyle="primary">Gregory</NavItem>
        </Nav>
        <Panel style={{marginTop: 54}}>
          <Grid noGutter className="o-panel">
            <Cell fixedWidth={250} className="o-panel-container">
              <SideMenu />
             {/* <Nav light className="o-panel" style={{paddingTop: 12}}>
                <NavItem bStyle="primary">Link 1</NavItem>
              </Nav>*/}
            </Cell>
            <Cell className="o-panel-container">
              <Panel>
                <Center style={{width: '100%', height: '100%', padding: 8}}>
                  {/*<FileDropZone text={<Center><H3>Drop files here</H3></Center>} />*/}
                </Center>
              </Panel>
            </Cell>
          </Grid>
        </Panel>
        {<Portal isOpened={this.state.showImportPopup}>
            <ImportPopup onClose={() => this.setState({showImportPopup: false})}/>
          </Portal>
        }
      </div>
    )
  } 
}

const Empty = (props) => (
  null
)

render((
  <Router history={browserHistory}>
    <Route path="/" component={Demo} />
    <Route path="/pages" component={Demo}/>
    <Route path="/users" component={Demo}/>
    <Route path="/medias" component={Demo}/>
      {/*<Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      */}
    <Route path="/tables" component={Demo}>
      <Route path=":tableId" component={Empty}/>
    </Route>
    <Route path="/refs" component={Demo}>
      <IndexRoute component={Empty} />
      <Route path=":refId" component={Empty} />
    </Route>
    <Route path="/forms" component={Demo}/>
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
addScript("https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.0.7/jsPlumb.min.js")
