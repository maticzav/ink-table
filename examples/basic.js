import {h, render} from 'ink'
import Table from '..'

// Demo ----------------------------------------------------------------------

const data = [
  {name: 'Sosa Saunders', gender: 'male', company: 'VALREDA', email: 'sosasaunders@valreda.com', phone: '+1 (809) 435-2786', address: 'Nautilus Avenue, Bentonville, Alabama, 927'},
  {name: 'Angelina Kirk', gender: 'female', company: 'ZENTILITY', email: 'angelinakirk@zentility.com', phone: '+1 (870) 567-3516', address: 'Corbin Place, Stevens, Nevada, 6268'},
  {name: 'Bradford Rosales', gender: 'male', company: 'HYDROCOM', email: 'bradfordrosales@hydrocom.com', phone: '+1 (918) 573-3240', address: 'Troy Avenue, Martinez, Oklahoma, 1402'},
  {name: 'Gwen Schroeder', gender: 'female', company: 'KIDGREASE', email: 'gwenschroeder@kidgrease.com', phone: '+1 (987) 417-2062', address: 'Bainbridge Street, Nogal, Vermont, 1540'},
  {name: 'Ellison Mann', gender: 'male', company: 'KATAKANA', email: 'ellisonmann@katakana.com', phone: '+1 (889) 411-2186', address: 'Raleigh Place, Greenock, Colorado, 4444'},
  {name: 'Lou Gamble', gender: 'female', company: 'EXOSPACE', email: 'lougamble@exospace.com', phone: '+1 (985) 573-3129', address: 'Schenck Avenue, Elbert, Nebraska, 830'},
  {name: 'Leticia Merrill', gender: 'female', company: 'EYEWAX', email: 'leticiamerrill@eyewax.com', phone: '+1 (920) 515-3647', address: 'Bradford Street, Delwood, Washington, 2828'},
  {name: 'Johns Workman', gender: 'male', company: 'ZILLADYNE', email: 'johnsworkman@zilladyne.com', phone: '+1 (873) 503-2314', address: 'Sackman Street, Adelino, Texas, 8004'},
  {name: 'Holmes Collins', gender: 'male', company: 'REALMO', email: 'holmescollins@realmo.com', phone: '+1 (968) 529-3878', address: 'Beverly Road, Vallonia, Indiana, 1057'},
  {name: 'Coleman Dodson', gender: 'male', company: 'BLEENDOT', email: 'colemandodson@bleendot.com', phone: '+1 (812) 445-2559', address: 'Branton Street, Naomi, South Carolina, 9435'},
  {name: 'Marjorie Mckay', gender: 'female', company: 'RODEOMAD', email: 'marjoriemckay@rodeomad.com', phone: '+1 (980) 532-3472', address: 'Grove Street, Caspar, South Dakota, 506'},
  {name: 'Mendez Taylor', gender: 'male', company: 'DOGNOST', email: 'mendeztaylor@dognost.com', phone: '+1 (812) 544-2784', address: 'Willow Street, Basye, New York, 2300'}
]

const config = {
  padding: 3,
  crosses: {
    mid: '$'
  }
}

const Basic = () => (
  <Table data={data} config={config}/>
)

render(<Basic/>)

// ---------------------------------------------------------------------------
