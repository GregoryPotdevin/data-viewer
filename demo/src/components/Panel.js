import React from 'react'

export const Panel = ({children, ...props}) => (
  <div {...props} className="o-panel">
    {children}
  </div>
)
