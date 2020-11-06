import React from 'react'
import { render } from 'ink'

import Table from '../src'

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
]

render(<Table data={data} />)
