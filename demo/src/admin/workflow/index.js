import React from 'react'
import { AdminPanel } from '../components'

export class WorkflowApp extends React.Component {
  render(){
    return (
      <AdminPanel title="Workflow" style={{overflow: 'hidden', height: '100%'}}>
        <iframe src="http://localhost:3010" style={{
          border: 0,
          margin: '0 -24px',
          width: 'calc(100% + 48px)',
          height: 'calc(100% - 70px)',
        }} />
      </AdminPanel>
    )
  }
}