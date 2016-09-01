import React from 'react'
import Dropzone from 'react-dropzone';
import Papa from 'papaparse'

import { guessTypeFromValues } from '../utils'

function isValidLine(line){
  const len = line.length
  // console.log("isValidLine", line)
  for(var i=0; i<len; i++){
    if (line[i].length > 0) return true
  }
  // console.log("NOPE !")
  return false
}

function makeHeader(header, data){
  return header.map((col, idx) => ({
    id: col,
    label: col,
    type: guessTypeFromValues(data.map(l => l[idx]))
  }))
}

function makeObject(header, line){
  const obj = {}
  for(var i=0; i<header.length; i++){
    obj[header[i].id] = line[i]
  }
  return obj
}

function parseFile(file, cb){
  Papa.parse(file, {
      error: (error, file) => {
        console.log("error", error)
      },
      complete: (results, file) => {
        const data = results.data.filter(isValidLine) 
        const header = makeHeader(data.shift(), data)
        const filteredResults = {
          ...results,
          data: data.map(el => makeObject(header, el)),
          header
        }
        cb(filteredResults)
      },
      encoding: "ISO-8859-15",
      skipEmptyLines: true,
    })
}

class FileList extends React.Component {
  render(){
    return null
  }
}

export class FileDropZone extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      files: []
    }
    this.onDrop = this.onDrop.bind(this)
    this.handleClean = this.handleClean.bind(this)
  }

  componentWillMount(){
    // progressCb = (id, progress, props) => {
    //   const files = [...this.state.files]
    //   files.forEach((f, idx) => {
    //     if (f.id == id){
    //       files[idx] = {
    //         ...f,
    //         convertProgress: progress,
    //         ...props
    //       }
    //     }
    //   })
    //   this.setState({ files })
    // }
  }
  
  componentWillUnmount(){
    // progressCb = undefined
  }
  
  handleClean(e){
    e.preventDefault()
    e.stopPropagation()
    const files = this.state.files.filter(file => file.convertProgress < 100);
    this.setState({ files })
  }

  onDrop(files) {
    console.log('onDrop', files);
    for(var file of files){
      console.log("file", file)
      parseFile(file, (res) => {
        console.log("results", res)
        const { onResults } = this.props
        if (onResults) onResults(res)
      })
    }
    // const progress = files.map(file => ({
    //   // id: guid(),
    //   progress: 0,
    //   convertProgress: 0,
    //   file,
    //   result: parseFile(file)
    // }))
    // console.log('progress', progress)
    // this.setState({
    //   files: [...this.state.files, ...progress]
    // })
    // if (onChange){
    //   onChange(name, file);
    // }
  }

  render(){
    const { text, value } = this.props;
    const { files } = this.state;
    var url = ((typeof value) === 'string') ? value : undefined;
    var dropzoneStyle = {
      width: '100%', minHeight: 200, height: '100%',
      border: '2px dashed rgb(102, 102, 102)',
      borderRadius: 4
    };
    return (
      <div style={{height: '100%', width: '100%', backgroundColor: '#f7f7f7'}}>
        <Dropzone onDrop={this.onDrop} multiple={true} style={dropzoneStyle}>
          {files.length > 0 
              ? <FileList files={this.state.files} onClean={this.handleClean} />
              : <div style={{textAlign: 'center'}}>{text}</div>
          }
        </Dropzone>
      </div>
    )
  }
}