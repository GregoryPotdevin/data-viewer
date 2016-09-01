import React from 'react'
import { Button } from 'react-blazecss'
import { Link } from 'react-router'

export const LinkButton = (props) => (
  <Button componentClass={Link} {...props} />
)