import React from 'react'
import { Text } from 'ink'
import { render } from 'ink-testing-library'

import Table from '../src'

// Components ----------------------------------------------------------------

const CustomHeader = ({ children }: React.PropsWithChildren<{}>) => (
  <Text italic color="red">
    {children}
  </Text>
)

const CustomCell = ({ children }: React.PropsWithChildren<{}>) => (
  <Text bold color="white">
    {children}
  </Text>
)

const CustomSkeleton = ({ children }: React.PropsWithChildren<{}>) => (
  <Text color="green">{children}</Text>
)

// Demo ----------------------------------------------------------------------

const data = [
  {
    name: 'Sosa Saunders',
    gender: 'male',
    company: 'VALREDA',
    email: 'sosasaunders@valreda.com',
    phone: '+1 (809) 435-2786',
    address: 'Nautilus Avenue, Bentonville, Alabama, 927',
  },
  {
    name: 'Angelina Kirk',
    gender: 'female',
    company: 'ZENTILITY',
    email: 'angelinakirk@zentility.com',
    phone: '+1 (870) 567-3516',
    address: 'Corbin Place, Stevens, Nevada, 6268',
  },
  {
    name: 'Bradford Rosales',
    gender: 'male',
    company: 'HYDROCOM',
    email: 'bradfordrosales@hydrocom.com',
    phone: '+1 (918) 573-3240',
    address: 'Troy Avenue, Martinez, Oklahoma, 1402',
  },
  {
    name: 'Gwen Schroeder',
    gender: 'female',
    company: 'KIDGREASE',
    email: 'gwenschroeder@kidgrease.com',
    phone: '+1 (987) 417-2062',
    address: 'Bainbridge Street, Nogal, Vermont, 1540',
  },
]

const { lastFrame } = render(
  <Table
    data={data}
    columns={['name', 'gender']}
    padding={3}
    header={CustomHeader}
    skeleton={CustomSkeleton}
    cell={CustomCell}
  />,
)

console.log(lastFrame())

// ---------------------------------------------------------------------------
