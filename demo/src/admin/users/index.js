import React from 'react'
import { AdminPanel } from '../components'
import { Icon } from '../../components/Icon'
import { LinkButton } from '../../components/LinkButton'
import { Button, ButtonGroup, Container } from 'react-blazecss'
import { DataEditor } from '../../components/DataEditor'

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

export class AddUserApp extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      data: {
        table: "users"
      }
    }

    this.addUser = this.addUser.bind(this)

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
      console.log("upload", this.state.data)
    }
  }

  render(){
    console.log("fetch", fetch)
    return (
      <AdminPanel title="Ajouter un utilisateur">
        <Container size="large">
          {this.renderButtons()}
          <DataEditor size="large" 
                      fields={userFields}
                      errors={this.state.errors} 
                      onChange={this.onChange}
                      data={this.state.data} />
          {this.renderButtons()}
        </Container>
      </AdminPanel>
    )
  }

  renderButtons(){
    return (
      <ButtonGroup>
        <Button bStyle="success"  onClick={this.addUser}>
          <Icon name="plus"/> Ajouter
        </Button>
      </ButtonGroup>
    )
  }
}

export class UserApp extends React.Component {
  render(){
    return (
      <AdminPanel title="Utilisateurs" headerRight={
        <ButtonGroup ghost>
          <LinkButton bStyle="primary" to="/admin/users/_add"><Icon name="plus" /> Ajouter</LinkButton>
        </ButtonGroup>
      }>
        <div>
          List users...
        </div>
      </AdminPanel>
    )
  }
}