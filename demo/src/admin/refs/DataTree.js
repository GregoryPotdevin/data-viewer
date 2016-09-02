import React from 'react'

import { Tree, TreeItem } from 'react-blazecss'

export class DataTree extends React.Component {
  render(){
    const { data=[], onSelect, expandFirstLevel, selectedId, ...treeProps } = this.props
    return (
      <Tree {...treeProps}>
        {data.map((el, idx) => <DataTreeItem key={el.key || idx} data={el} selectedId={selectedId} onSelect={onSelect} treeProps={treeProps} expandFirstLevel={expandFirstLevel} />)}
      </Tree>
    )
  }
}

const randomLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"

export function randomId(length=10){
  let str = ""
  for(var i=0; i<length; i++){
    str += randomLetters[Math.floor(Math.random()*randomLetters.length)]
  }
  return str
}

export class DataTreeItem extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      expanded: props.expandFirstLevel
    }

    this.onToggle = (e) => {
      const { data, onSelect, selectedId } = this.props
      e.preventDefault()
      e.stopPropagation()
      // console.log("onToggle", onSelect, data)
      if (data.children && data.children.length > 0){
        // Only close if wasn't selectedId or open
        if (selectedId == data.id || !this.state.expanded){
          this.setState({
            expanded : !this.state.expanded
          })
        }
      }
      if (onSelect){
        onSelect(data)
      }
    }
  }

  render(){
    const { data, treeProps, onSelect, selectedId } = this.props

    if (!data.id) data.id = randomId()

    let { expanded } = this.state
    const children = data.children || []

    let lab = data.label
    if (selectedId && selectedId == data.id) {
      lab = <span style={{color: "#ff7043"}}>{lab}</span>
    }

    const label = (expanded || children.length > 0) 
      ? lab
      : <span className="c-link" 
              onClick={this.onToggle}>{lab}</span>

    return (
      <TreeItem expanded={expanded} 
                expandable={children.length > 0}
                onClick={this.onToggle}
                label={label}>
        {children.length > 0 && <DataTree {...treeProps} selectedId={selectedId} onSelect={onSelect} data={expanded ? children : []} />}
      </TreeItem>
    )
  }
}