import React from 'react'
import { H1 } from 'react-blazecss'

export const AdminPanel = ({title, headerRight, children, style={}, ...props}) => (
  <div style={{padding: '0 24px 24px 24px', fontSize: '0.8em', ...style}} {...props}>
    <div>
      {headerRight && <div style={{float: 'right', paddingTop: '2.5em'}}>{headerRight}</div>}
      <H1 size="large">{title}</H1>
    </div>
    {children}
  </div>
)