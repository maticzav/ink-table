import React from "react";
import { render } from "ink";

import { Table } from "../lib/index.js";

const data = [
  {
    gender: "male",
    company: "VALREDA",
    name: "Sosa Saunders",
    phone: "+1 (809) 435-2786",
    email: "sosasaunders@valreda.com",
    address: "Nautilus Avenue, Bentonville, Alabama, 927",
  },
  {
    gender: "female",
    company: "ZENTILITY",
    name: "Angelina Kirk",
    phone: "+1 (870) 567-3516",
    email: "angelinakirk@zentility.com",
    address: "Corbin Place, Stevens, Nevada, 6268",
  },
  {
    gender: "male",
    company: "HYDROCOM",
    name: "Bradford Rosales",
    phone: "+1 (918) 573-3240",
    email: "bradfordrosales@hydrocom.com",
    address: "Troy Avenue, Martinez, Oklahoma, 1402",
  },
];

render(<Table data={data} />);
