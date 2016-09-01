import React from 'react'

import { Card, CardContent, CardItem } from 'react-blazecss'

export class Types extends React.Component {
  render(){
    const { bStyle="primary", title, fields } = this.props
    return (
      <Card bStyle={bStyle} shadow="higher">
        <CardContent divider>{title}</CardContent>
        {fields.map(field => (
          <CardItem key={field.id} style={{fontSize: '0.82em'}}>
            <span style={{float: 'right', textTransform: 'uppercase', color: '#BBB'}}>{field.type}</span>
            {field.id}
          </CardItem>
        ))}
      </Card>
    )
  }
}



