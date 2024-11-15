import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Table from './my-table'

const tableName = 'Company Table';
const headers = ['Company', 'Contact', 'Country'];
const data = [
  { Company: 'Alfreds Futterkiste', Contact: 'Maria Anders', Country: 'Germany' },
  { Company: 'Centro comercial Moctezuma', Contact: 'Francisco Chang', Country: 'Mexico' },
  { Company: 'Ernst Handel', Contact: 'Roland Mendel', Country: 'Austria' },
  { Company: 'Island Trading', Contact: 'Helen Bennett', Country: 'UK' },
  { Company: 'Laughing Bacchus Winecellars', Contact: 'Yoshi Tannamuri', Country: 'Canada' },
  { Company: 'Magazzini Alimentari Riuniti', Contact: 'Giovanni Rovelli', Country: 'Italy' },
  { Company: 'Magazzini Alimentari Riuniti', Contact: 'Giovanni Rovelli', Country: 'Italy' },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Table headers={headers} data={data} tableName={tableName} />
  </StrictMode>,
)
