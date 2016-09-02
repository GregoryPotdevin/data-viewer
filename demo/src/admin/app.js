import React from 'react'
import {render} from 'react-dom'

import { fieldTypes, Form } from '../../src'

import { H1, H2, H3, Container,
  ButtonGroup, Button, 
  Nav, NavContent, NavItem, 
  Grid, Cell } from 'react-blazecss'
import 'blaze/dist/blaze.min.css'
import 'blaze/dist/blaze.animations.min.css'
import 'font-awesome/css/font-awesome.min.css'

import { Panel } from '../components/Panel'
import { Center } from '../components/Center'
import { FileDropZone } from '../components/FileDropZone'
import { ImportPopup } from '../components/ImportPopup'
import { SideMenu } from '../components/SideMenu'
import Portal from 'react-portal'

import brand from 'img/pam_couleur.png'

const Avatar = ({src, size=40}) => (
  <figure className="avatar avatar-sm">
    <img src={src} />
  </figure>
)

export class AdminApp extends React.Component {

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
            <NavItem right bStyle="primary" style={{height: 56, paddingTop: '0.75em', paddingBottom: '0.75em'}}><Avatar src="http://localhost:8080/api/files/181" />&nbsp;&nbsp;Gregory</NavItem>
        </Nav>
        <Panel style={{marginTop: 54}}>
          <Grid noGutter className="o-panel">
            <Cell fixedWidth={200} className="o-panel-container">
              <SideMenu />
             {/* <Nav light className="o-panel" style={{paddingTop: 12}}>
                <NavItem bStyle="primary">Link 1</NavItem>
              </Nav>*/}
            </Cell>
            <Cell className="o-panel-container">
              <Panel>
                {this.props.children}
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
