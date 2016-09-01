import React from 'react'
import { Nav } from 'react-blazecss'
import { Link } from 'react-router'

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
      <Nav light className="o-panel" shadow="high" style={{padding: '0.5em', paddingTop: 12, backgroundColor: '#FAFAFA'}}>
        <aside className="menu">
          <MenuLabel>Général</MenuLabel>
          <MenuList>
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/pages">Pages</MenuItem>
            <MenuItem to="/users">Utilisateurs</MenuItem>
            <MenuItem to="/medias">Medias</MenuItem>
          </MenuList>
          <MenuLabel>Data</MenuLabel>
          <MenuList>
            <MenuItem to="/tables">Fonds</MenuItem>
            <SubMenu path="/tables">
              <MenuItem to="/tables/first">Fond 1</MenuItem>
              <MenuItem to="/tables/second">Fond 2</MenuItem>
              <MenuItem to="/tables/third">Fond 3</MenuItem>
            </SubMenu>
            <MenuItem to="/refs">Référentiels</MenuItem>
            <SubMenu path="/refs">
              <MenuItem to="/refs/first">Ref 1</MenuItem>
              <MenuItem to="/refs/second">Ref 2</MenuItem>
              <MenuItem to="/refs/third">Ref 3</MenuItem>
            </SubMenu>
            <MenuItem to="/forms">Formulaires</MenuItem>
          </MenuList>
        </aside>
      </Nav>
    )
  }
}