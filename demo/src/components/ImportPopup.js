import React from 'react'

import { ButtonGroup, Button, H3, 
  Overlay, Container, 
  Modal, ModalHeader, ModalBody, ModalFooter,
  Grid, Cell,
  Tabs, Tab,
} from 'react-blazecss'
// import { Icon } from '../components/Icon'
import { ScrollLock } from './ScrollLock'
import Portal from 'react-portal'
import { FileDropZone } from './FileDropZone'
import { Center } from './Center'
import { Types } from './Schema'
import ReactDataGrid from 'react-data-grid'
import './react-data-grid.css'
import { Icon } from './Icon'
// import { Form } from '../Form'



export class ImportPopup extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    const { title = "Title", onPrev, onNext, onClose, fields, fieldTypes } = this.props
    const { header, data } = this.state
    console.log("header", header)
    return (
      <div style={{position: 'fixed', overflow: 'hidden', left: 0, right: 0, top: 0, bottom: 0, zIndex: 900}}>
        <ScrollLock />
        <Overlay />
        <Container>
          <Modal shadow="highest" style={{width: '90%', height: '90%'}}>
            {<ModalHeader><H3 size="medium">Import Popup</H3></ModalHeader>}
            <ModalBody style={{height: 'calc(100% - 140px)', overflowY: 'auto', position: 'relative'}}>
              {!data && this.renderDropZone()}
              {data && this.renderData()}
            </ModalBody>
            <ModalFooter style={{textAlign: 'right'}}>
              <ButtonGroup>
                <Button><Icon name="times" /> Close</Button>
                {data && <Button bStyle="success"><Icon name="plus" /> Add table</Button>}
              </ButtonGroup>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    )
  }

  renderDropZone(){
    return (
      <FileDropZone onResults={(res) => this.setState(res)}
                    text={<Center><H3>Drop xls/csv files here</H3></Center>} />
    )
  }

  renderData(){
    const { header, data } = this.state
    const columns = header.map(({id, label, type}, idx) => ({
      key: id,
      name: label,
      locked: id == "ID" || id == "DOCID" || idx == 0,
      width: (id === "DOCID") ? 100 : 200
    }))
    const mappedData = data.map(el => ({
      ...el,
      IMG: `http://www.artsdelamarionnette.eu/scripts/atlasgate.dll/marionnettesdb/wa_vignette?docid=${el.DOCID}`
    }))
    columns.splice(1, 0, {
      key: "IMG",
      name: "IMG",
      locked: true,
      width: 60,
      formatter: ({value}) => (
        <img src={value} style={{width: '100%', display: 'block'}} />
      )
    })
    // console.log("columns", columns)
    return (
        <ReactDataGrid
          columns={columns}
          rowGetter={(idx) => mappedData[idx]}
          rowsCount={data.length}
          rowHeight={60}
          minHeight={400} />
    )
    // return this.renderSchema()
    // return (
    //   <Tabs defaultActiveKey="data" bStyle="primary">
    //     <Tab eventKey="data" title="data">
    //       Data
    //     </Tab>
    //     <Tab eventKey="schema" title="schema">
    //       {this.renderSchema()}
    //     </Tab>
    //   </Tabs>
    // )
  }

  renderSchema(){
    return (
      <Grid>
        <Cell>
          <Types title="Source fields"
                fields={this.state.header} />
        </Cell>
        <Cell>
        </Cell>
        <Cell>
          <Types title="Destination fields"
                 bStyle="success"
                 fields={this.state.header} />
        </Cell>
      </Grid>
    )
  }
}