import React from 'react'
import { Button } from 'react-blazecss'
import { Icon } from './Icon'

export const IconButton = ({icon, span, ...props}) => (
  <Button componentClass={span ? "span" : undefined} {...props}>
    <Icon name={icon} />
  </Button>
) 