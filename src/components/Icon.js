import React from 'react'

export const Icon = ({name, ...props}) => (
  <span {...props} className={"fa fa-fw fa-" + name} />
) 