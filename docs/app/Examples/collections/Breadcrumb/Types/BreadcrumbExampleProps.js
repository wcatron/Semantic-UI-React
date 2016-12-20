import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

const sections = [
  { content: 'Home', link: true, key: 'Home' },
  { content: 'Store', link: true, key: 'Store' },
  { content: 'T-Shirt', active: true, key: 'Shirt' },
]

const BreadcrumbExampleProps = () => (
  <Breadcrumb icon='right angle' sections={sections} />
)

export default BreadcrumbExampleProps
