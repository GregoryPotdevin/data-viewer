import React from 'react'

export const Center = ({children, ...props}) => (
    <div {...props} className="u-center-block__content">{children}</div>
)