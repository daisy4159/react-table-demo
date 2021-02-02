import React, {useState, useEffect } from 'react';
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
import dateTime from 'dayjs';
import { mockFetchHelper } from './mock-backend';
import './App.css';


const Styles = styled.div `
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({columns, data}) {
  const storedSortBy = localStorage.getItem('sortBy');
  const sortByData = storedSortBy? JSON.parse(storedSortBy) : [{
    id: 'last_listened',
    desc: true
  }];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { 
        pageIndex: 0,
        sortBy: sortByData
      },
    },
    useSortBy
  )

  localStorage.setItem('sortBy', JSON.stringify(sortBy));
  return (
    <>
       <table {...getTableProps()}>
       <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{backgroundColor: column.isSorted? '#add8e6': "transparent"}}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

         <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>  
    </>

  )
}

function App() {

  let [data, setData] = useState([]);
  let [isLoaded, setIsLoaded] = useState(false);
  let [err, setErr] = useState(null);
  useEffect(() => {
  const getData = () => {
      mockFetchHelper()
          .then(res => {
              setData(res)
              setIsLoaded(true)
          },
          err => {
              setErr(err)
              setIsLoaded(true)
          })
  };
  getData()
  }, [])

 
  const columns = [
    {
      Header: 'Album Title',
      accessor: 'album_title'
    }, 
    {
      Header: 'Avg User Rating',
      accessor: item =>  item.avg_user_rating?item.avg_user_rating.toFixed(1): null,
    }, 
    {
      Header: 'Band Name',
      accessor: 'band_name'
    }, 
    {
      Header: 'Genres',
      accessor:  item => item.genres.join(',')
    }, 
    {
      Header: 'Last Played',
      accessor: 'last_listened',
      Cell: item =>{
        return dateTime(item.value).format('MM/DD/YYYY HH:MM a')
      }
    }
    , 
    {
      Header: 'Release Date',
      accessor: 'release_date'
    }
  ]

  if(!isLoaded) {
    return (
      <div className="loader">
      </div>
    )
  }
  return (
    <Styles>
      <Table data={data} columns={columns}/>
    </Styles>
  )

}

export default App