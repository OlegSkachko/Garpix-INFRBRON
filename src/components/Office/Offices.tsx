import React from 'react'
import { apiGarpix } from '@/api/ApiGarpix'
import Pagination from '../Pagination/Pagination'
import usePagination from '@/hooks/usePagination'
import { IUsePagTypes } from '@/interfaces/IPagination'
import { Box, CircularProgress } from '@mui/material'
import NewOffice from './NewOffice'

const Offices: React.FC = () => {
  const {
    arrayPages,
    setPageNumber,
    pageNumber,
    refTotal,
    totalItems,
    setSize,
    setFilter,
    isLoading,
    data,
    refresh
  }: IUsePagTypes = usePagination(apiGarpix.getOffice, 'IOffice')

  return (
    <div>
      <Pagination
        arrayPages={arrayPages}
        setPageNumber={(value) => setPageNumber(value)}
        pageNumber={pageNumber}
        refTotal={refTotal}
        totalItems={totalItems}
        amount={(e) => setSize(+e.target.value)}
        sort={(e) => setFilter(e.target.value)}
      />
      <button onClick={refresh}>обновить</button>
      <NewOffice></NewOffice>
      <div>
        {isLoading && 
          <Box sx={{ display: 'flex' , justifyContent:'center'}}>
            <CircularProgress />
         </Box>
        }
        {data.length < 1
          ? <h2>на данный момент доступных офисов нет</h2>
          : data.map((office) => {
            return (
              <fieldset key={office.id}>
                <h3>{office.title}</h3>
                <h5>Адрес: {office.address}</h5>
              </fieldset>
            )
          })}
      </div>
    </div>
  )
}

export default Offices
