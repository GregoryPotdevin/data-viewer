import React from 'react'
import { Link } from 'react-router'
import refs from './data'

import { H2, Grid, Cell, Card, CardContent } from 'react-blazecss'
import { DataTree, randomId } from './DataTree'
import { AdminPanel } from '../components'
import { DataEditor } from '../../components/DataEditor'

import { ColleagueRenderer } from '../users'

const refFields = [
  {type: "string", name: "label", label: "Label"},
  {type: "ref", table: "user", name: "createdby", label: "Créé par"},
  {type: "richtext", name: "description", label: "Description"},
]

let refTreeFields = [
  {type: "string", name: "label", label: "Label"},
  {type: "ref", table: "users", name: "createdby", label: "Créé par", optionRenderer: ColleagueRenderer},
  {type: "richtext", name: "description", label: "Description"},
]

refTreeFields.push(
  {name: "children", label: "Fils", type: "table", fields: refTreeFields, visibleFields: ["label"]}
)


function updateChildren(children, node){
  if (!children) return undefined

  let found = false
  const newChildren = children.map(n => {
    if (n.id == node.id) {
      found = true
      return node
    } else if (n.children){
      const c = updateChildren(n.children, node)
      if (n.children == c) return n
      else {
        found = true
        return {
          ...n,
          children: c
        }
      }
      return n
    } else {
      return n
    }
  })
  return found ? newChildren : children
}

export class RefList extends React.Component {
  render(){

    const refList = []
    Object.keys(refs).forEach(key => {
      refList.push(refs[key])
    })

    return (
      <AdminPanel title="Référentiels">
        {refList.map(ref => (
          <div>
            <Link to={`/admin/refs/${ref.table}`} className="c-link">
              <H2 size="medium">{ref.label}</H2>
            </Link>
          </div>
        ))}
      </AdminPanel>
    )
  }
}

export class RefEdit extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      selected: null
    }

    this.handleSelect = (selected) => {
      if (!selected.id) selected.id = randomId()
      this.setState({
        selected
      })
    }

    this.onChange = (ref) => {
      // Also update in fake dict...
      const data = refs[this.props.params.table]
      if (ref.id == data.id){
        refs[this.props.params.table] = ref
      } else {
        data.children = updateChildren(data.children, ref)
      }
      console.log("editing", ref)
      console.log("data", data)
      this.setState({
        selected: ref
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.params.table != this.props.params.table){
      this.setState({
        selected: null
      })
    }
  }

  render(){
    const { params } = this.props
    const { selected } = this.state
    console.log("selected", selected)
    const { table } = params
    const data = refs[table]
    return (
      <AdminPanel title={<span><Link className="c-link" to="/admin/refs">Référentiels</Link> / {data.label}</span>}>
        <Grid noGutter>
          <Cell fixedWidth={380}>  
            {this.renderTree(table, [data])}
          </Cell>
          <Cell>
            {selected && (
              <Card shadow="high">
                <CardContent>
                  <H2 size="medium">{selected.label}</H2>
                  <DataEditor key={selected.id} data={selected} fields={data.isTree ? refTreeFields : refFields} onChange={this.onChange} />
                </CardContent>
              </Card>
            )}
          </Cell>
        </Grid>
      </AdminPanel>
    )
  }

  // renderList(table, children){
  //   return (
  //     <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
  //       <DataTree key={table} data={children} />
  //     </div>
  //   )
  // }

  renderTree(table, children){
    const { selected } = this.state
    return (
      <div style={{width: '100%', boxSizing: 'border-box', padding: 8, fontSize: '1.2em'}}>
        <DataTree key={table} data={children} onSelect={this.handleSelect} expandFirstLevel={true} selectedId={selected ? selected.id : undefined} />
      </div>
    )
  }
}