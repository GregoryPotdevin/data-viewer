import React from 'react'
import './styles.scss'

import { Fields } from './fields/Fields'

export class Form extends React.Component {

  getChildContext() {
    return {
      acForms: {
        fieldTypes: this.props.fieldTypes
      }
    }
  }

  static childContextTypes = {
    acForms: React.PropTypes.object
  }

  render(){
    var className = "c-form"

    return (
      <form className={className} style={{color: "#333", fontSize: '1em'}}>
        <Fields {...this.props} horizontal/>
      </form>
    )
  }
}
