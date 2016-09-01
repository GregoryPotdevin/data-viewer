import React from 'react'
import { AdminPanel } from '../components'
import { Link } from 'react-router'
import { Icon } from '../../components/Icon'
import { LinkButton } from '../../components/LinkButton'
import { Button, ButtonGroup, Container } from 'react-blazecss'
import { DataEditor } from '../../components/DataEditor'
import { browserHistory } from 'react-router'

const host = "http://localhost:8080"

const userFields = [
  {type: "grid", columns: [
    { fixedWidth: 140, fields: [
      {name: "avatar", label: "Avatar", type: "file", width: 130, height: 110, showInfo: false},
    ]},
    { fields: [
      {name: "firstname", label: "Prénom", type: "string", width: '33%', required: true},
      {name: "lastname", label: "Nom", type: "string", width: '33%', required: true},  
      {name: "label", label: "Nom complet", type: "computed", width: '33%', template: "{{firstname}} {{lastname}}"},  
      {name: "role", label: "Role", type: "choice", options: [
        {label: "Developer", value: "dev"},
        {label: "Product Manager", value: "manager"},
        {label: "Client", value: "client"},
      ]},
    ]}
  ]},

  { type: "section", title: "Adresse", fields: [
    {name: "address", label: "Adresse complète", type: "address"},
    {name: "street number", label: "Numéro", type: "string", width: "30%"},
    {name: "street", label: "Rue", type: "string", width: "70%"},
    {name: "zip code", label: "Code postal", type: "string", width: "30%"},
    {name: "city", label: "Ville", type: "string", width: "70%"},
    {name: "departement", label: "Département", type: "string", width: "30%"},
    {name: "region", label: "Région", type: "string", width: "35%"},
    {name: "country", label: "Pays", type: "string", width: "35%"},
  ]},

  { type: "section", title: "Réseaux sociaux", fields: [
    {name: "facebook", label: "Facebook", type: "string", width: "50%"},
    {name: "google_plus", label: "Google+", type: "string", width: "50%"},
    {name: "twitter", label: "Twitter", type: "string", width: "50%"},
    {name: "linkedin", label: "LinkedIn", type: "string", width: "50%"},
  ]}
]

function addErrors(errors, data, fields){
  for(var i=0; i<fields.length; i++){
    var field = fields[i]
    if (field.type == "grid"){
      const columns = field.columns
      for(var j=0; j<columns.length; j++){
        addErrors(errors, data, columns[j].fields)
      }
    } else if (field.type == "section"){
      addErrors(errors, data, field.fields)
    }else {
      const name = field.name
      if (field.required) console.log(name, data[name])
      if (field.required && (((typeof data[name]) === "undefined") || data[name].length == 0)){
        errors[name] = "ce champ est obligatoire"
      }
    }
  }
}
function computeErrors(data, fields){
  const errors = {}

  addErrors(errors, data, fields)

  if (Object.keys(errors).length == 0) return undefined
  else return errors
}

function sendDocument(endpoint, data){
  return fetch(host + endpoint, {
    method: data.id ? 'PUT' : 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  })
}

function deleteDocument(endpoint){
  return fetch(host + endpoint, {
    method: 'DELETE', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}

export class EditUser extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      data: props.data || {
        table: "users"
      }
    }

    this.addUser = this.addUser.bind(this)
    this.deleteDocument = this.deleteDocument.bind(this)

    this.onChange = (data) => {
      if (this.state.errors){
        // Check again...
        this.setState({
          data,
          errors: computeErrors(data, userFields)
        })
      } else {
        this.setState({data})
      }
    }
  }

  addUser(e){
    e.preventDefault()
    e.stopPropagation()


    const errors = computeErrors(this.state.data, userFields)
    console.log("SET errors", errors)
    if (errors){
      this.setState({ errors })
    } else {
      const { isAdd } = this.props

      console.log("upload", this.state.data)
      sendDocument(isAdd ? '/api/documents' : ('/api/documents/' + this.state.data.id), this.state.data)
      .then(res => res.json())
      .then(res => {
        setTimeout(() => browserHistory.push('/admin/users'), 500)
      })
    }
  }

  deleteDocument(e){
    e.preventDefault()
    e.stopPropagation()

    deleteDocument('/api/documents/' + this.state.data.id)
      .then(res => res.json())
      .then(res => {
        setTimeout(() => browserHistory.push('/admin/users'), 1000)
      })
  }

  render(){
    return (
      <Container size="large">
        {this.renderButtons()}
        <DataEditor size="large" 
                    fields={userFields}
                    errors={this.state.errors} 
                    onChange={this.onChange}
                    data={this.state.data} />
        {this.renderButtons()}
      </Container>
    )
  }

  renderButtons(){
    const { isAdd } = this.props
    if (isAdd){
      return (
        <ButtonGroup>
          <Button bStyle="success"  onClick={this.addUser}>
            <Icon name="plus"/> Ajouter
          </Button>
        </ButtonGroup>
      )
    } else {
      return (
        <ButtonGroup>
          <Button bStyle="success"  onClick={this.addUser}>
            <Icon name="save"/> Save
          </Button>
          <Button bStyle="error"  onClick={this.deleteDocument}>
            <Icon name="trash"/> Delete
          </Button>
        </ButtonGroup>
      )
    }
  }
}

export class DataFetcher extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      data: null
    }
  }

  async componentWillMount(){
    this._isMounted = true
    
    const res = await fetch(this.props.url)
    if (!this._isMounted) return

    const data = await res.json()
    if (!this._isMounted) return

    this.setState({ data })
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render(){
    const { renderer } = this.props
    return renderer(this.state.data)
  }
}

export class EditUserApp extends React.Component {



  render(){
    console.log("app props", this.props)
    const { params } = this.props
    return (
      <AdminPanel title={<span><Link className="c-link" to="/admin/users">Utilisateurs</Link> / Editer (id: {params.id})</span>}>
        <DataFetcher key={params.id} 
                     url={host + `/api/documents/${params.id}`}
                     renderer={(data) => data ? <EditUser data={data} /> : null} />
      </AdminPanel>
    )
  }
}

export const AddUserApp = (props) => (
  <AdminPanel title={<span><Link className="c-link" to="/admin/users">Utilisateurs</Link> / Ajouter</span>}>
    <EditUser {...props} isAdd />
  </AdminPanel>
)

export * from './user-list'
