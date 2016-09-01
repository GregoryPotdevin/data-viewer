import React from 'react'
import { Tab, Tabs } from 'react-blazecss'
import { Fields } from '../fields/Fields'

export const FormTabs = ({data, tabs}) => (
  <Tabs defaultActiveKey={0} animate bStyle="primary">
    {tabs.map((tab, idx) => (
      <Tab key={idx} eventKey={idx} title={tab.title}>
        <Fields fields={tab.fields} data={data} horizontal />
      </Tab>
    ))}
  </Tabs>
)