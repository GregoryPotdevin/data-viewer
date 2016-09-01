import React from 'react'

export class FieldContainer extends React.Component {
  render(){
    const { id, name, label, hint, horizontal, children, className, style={}, width, noContainer, type } = this.props

    if (noContainer){
      return (
        <div className={"ac-field-" + type} style={{width: '100%'}}>
          {children}
        </div>
      )
    }

    let classNames = "c-form-element ac-field-" + type
    if (horizontal) classNames += " c-form-element--horizontal"
    if (className)  classNames += " " + className

    return (
      <div className={classNames} style={{
        ...style,
        display: width ? 'inline-block' : undefined,
        // paddingLeft: width ? '1em' : undefined,
        paddingRight: width && !horizontal ? '1em' : undefined,
        width  
      }}>
        <label className="c-label" htmlFor={id}>{label || name || id}</label>
        <div className="c-label-field-group">
          {children}
        </div>
      </div>
    )
  }
}