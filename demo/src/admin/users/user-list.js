import React from 'react'
import { Link } from 'react-router'
import { AdminPanel } from '../components'
import { Icon } from '../../components/Icon'
import { LinkButton } from '../../components/LinkButton'
import { 
  H3, SubHeading,
  Button, ButtonGroup,
  Card, CardContent, Grid, Cell, Image 
} from 'react-blazecss'
import { DataEditor } from '../../components/DataEditor'

const host = "http://localhost:8080"

import {
  SearchkitManager, SearchkitProvider,
  Layout, TopBar, SearchBox, SideBar, Panel, SelectedFilters, 
  LayoutBody, LayoutResults, ActionBar, ActionBarRow, HitsStats, 
  ViewSwitcherToggle, SortingSelector, ViewSwitcherHits, Pagination,
} from 'searchkit'

import 'searchkit/theming/theme.scss'

class HitsTable extends React.Component<any, {}> {

  render(){
    const { hits } = this.props
    return (
      <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
        <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
          <thead>
            <tr>
              <th style={{width: 100}}></th>
              <th style={{width: 64, textAlign: 'right'}}>Id</th>
              <th style={{width: 45}}></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {hits.map(({_id, _source}) => (
              <tr key={_id}>
                <td>
                  <label className="c-choice" style={{padding: '0.5em', display: 'inline-block', marginRight: 8}}>
                    <input type="checkbox" style={{padding: 8}}/>
                  </label>
                  <ButtonGroup ghost>
                    <LinkButton bStyle="primary" to={`/admin/users/${_source.id}`}><Icon name="pencil"/></LinkButton>
                    {/*<LinkButton bStyle="error" to={`/admin/users/$_source.id`}><Icon name="trash"/></LinkButton>*/}
                  </ButtonGroup>
                </td>
                <td style={{textAlign: 'right'}}>{_source.id}</td>
                <td style={{margin: 0, padding: 0, height: 45}}>
                  {_source.avatar && <img src={host + "/api/files/" + _source.avatar.id} style={{width: 45, height: 45, display: 'block'}}/>}
                </td>
                <td>{_source.firstname}</td>
                <td>{_source.lastname}</td>
                <td>{_source.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function initials(firstname="", lastname=""){
  let ini = ""
  if (firstname.length > 0) ini += firstname[0]
  if (lastname.length > 0) ini += lastname[0]
  return ini
}

const Avatar = ({avatar, firstname, lastname}) => (
  <figure className="avatar"
          data-initial={avatar ? '' : initials(firstname, lastname)}  
          style={{width: '2em', height: '2em', background: '#42a5f5', display: 'block', marginRight: 0}}>
    {avatar && <img src={host + "/api/files/" + avatar.id} />}
  </figure>
)


const MediaCard = ({result}) => (
  <Link to={`/admin/users/${result._source.id}`} style={{width: '100%'}}>
    <Card shadow="high" style={{width: '100%', marginBottom: '1em'}}>
      <CardContent>
        <Grid>
          <Cell fixedWidth="4em">
            <Avatar {...result._source} />
          </Cell>
          <Cell style={{paddingLeft: 16}}>
            <H3 size="small" style={{paddingTop: 0, paddingBottom: 0, lineHeight: '1.35em'}}>
              {result._source.label || (result._source.firstname + " " + result._source.lastname)}<br />
            <SubHeading style={{paddingTop: 0, paddingBottom: 0}}>{result._source.role}</SubHeading></H3>
          </Cell>
        </Grid>
      </CardContent>
    </Card>
  </Link>
)

class BlazeSearchBox extends SearchBox {
  render() {
    let block = this.bemBlocks.container

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)} style={{marginRight: '1em'}}>
          <input type="text"
          data-qa="query"
          className={"c-field"}
          placeholder={this.props.placeholder || this.translate("searchbox.placeholder")}
          value={this.getValue()}
          onFocus={this.setFocusState.bind(this, true)}
          onBlur={this.setFocusState.bind(this, false)}
          ref="queryField"
          autoFocus={this.props.autofocus}
          onInput={this.onChange.bind(this)}/>
          <input type="submit" value="search" className={block("action")} data-qa="submit"/>
        </form>
      </div>
    );

  }
}

class TableSearch extends React.Component {

  constructor(props){
    super(props)

    this.searchkit = new SearchkitManager(host + "/api/documents")
  }

  handleViewModeChange(e){
    this.setState({viewMode: e.target.value})
  }

  render(){
    return (
      <SearchkitProvider searchkit={this.searchkit}>
        <div>

            <ActionBar>

              <ActionBarRow>
                <BlazeSearchBox autofocus={true}
                                placeholder="filtrer" 
                                searchOnChange={true} 
                                prefixQueryFields={["firstname", "lastname", "role", "label"]}/>

                <HitsStats translations={{
                  "hitstats.results_found":"{hitCount} results found"
                }}/>

                <ViewSwitcherToggle/>
                {/*<ViewSwitcherToggle listComponent={Select}/>*/}



                <SortingSelector options={[
                  {label:"Identifiant", field:"id", order:"asc"},
                  {label:"Pertinence", field:"_score", order:"desc"},
                  {label:"Prénom", field:"firstname", order:"asc"},
                  {label:"Nom", field:"lastname", order:"asc"}
                ]}/>
              </ActionBarRow>

{/*
              <ActionBarRow>
                <GroupedSelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>
*/}
            </ActionBar>

            <ViewSwitcherHits
                hitsPerPage={12} highlightFields={["title","plot"]}
                hitComponents = {[
                  {key:"table", title:"Table", listComponent:HitsTable, defaultOption:true},
                  {key:"list", title:"Liste", itemComponent:MediaCard},
                ]}
                scrollTo="body"
            />
            <Pagination showNumbers={true}/>
        </div>
      </SearchkitProvider>
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
          <TableSearch table="users" />
        </div>
      </AdminPanel>
    )
  }
}