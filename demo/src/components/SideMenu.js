import React from 'react'
import { Nav } from 'react-blazecss'
import { Link } from 'react-router'
import { Icon } from './Icon'

import './side-menu.scss'

const MenuLabel = ({children}) => (
  <p className="menu-label">
    {children}
  </p>
)

const MenuItem = ({children, ...props}) => (
  <li>
    <Link {...props}
       activeClassName="is-active">
      {children}
    </Link>
  </li>
)

const MenuList = ({children}) => (
  <ul className="menu-list">
    {children}
  </ul>
)

class SubMenu extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  render(){
    const { path, children } = this.props

// console.log("isActive", path, this.context.router.isActive(path, false))
    if (!this.context.router.isActive(path, false)) return null

    return (
      <li>
        <ul>
          {children}
        </ul>
      </li>
    )
  }
}

export class SideMenu extends React.Component {
        // <NavItem bStyle="primary">Link 1</NavItem>
  render(){
    return (
      <Nav className="o-panel" shadow="high" style={{padding: '0.5em', paddingTop: 12, backgroundColor: '#333'}}>
        <aside className="bulma-menu">
          <MenuLabel>Général</MenuLabel>
          <MenuList>
            <MenuItem to="/admin/home">Home</MenuItem>
            <MenuItem to="/admin/pages">Pages</MenuItem>
            <MenuItem to="/admin/users">Utilisateurs</MenuItem>
            <MenuItem to="/admin/agenda">Calendrier</MenuItem>
            <MenuItem to="/admin/workflow">Workflow</MenuItem>
          </MenuList>
          <MenuLabel>Data</MenuLabel>
          <MenuList>
            <MenuItem to="/admin/medias">Medias</MenuItem>
            <MenuItem to="/admin/tables">Fonds</MenuItem>
            <SubMenu path="/admin/tables">
              <MenuItem to="/admin/tables/first">Fond 1</MenuItem>
              <MenuItem to="/admin/tables/second">Fond 2</MenuItem>
              <MenuItem to="/admin/tables/third">Fond 3</MenuItem>
            </SubMenu>
            <MenuItem to="/admin/refs">Référentiels</MenuItem>
            <SubMenu path="/admin/refs">
              <MenuItem to="/admin/refs/first">Ref 1</MenuItem>
              <MenuItem to="/admin/refs/second">Ref 2</MenuItem>
              <MenuItem to="/admin/refs/third">Ref 3</MenuItem>
            </SubMenu>
            <MenuItem to="/admin/forms">Formulaires</MenuItem>
          </MenuList>
        </aside>
      </Nav>
    )
  }
}