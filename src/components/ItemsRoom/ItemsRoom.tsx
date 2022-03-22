import { apiGarpix } from '@/api/ApiGarpix'
import useLoader from '@/hooks/useLoader'
import usePagination from '@/hooks/usePagination'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IUsePagTypes } from '@/interfaces/IPagination'
import { Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'

const ItemsRoom: React.FC = () => {
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
  }: IUsePagTypes = usePagination(apiGarpix.getItemsRoom, 'IItemsRoom')


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
        item={true}
      />
      <button onClick={refresh}>обновить</button>
      <div>
        {isLoading && 
          <Box sx={{ display: 'flex' , justifyContent:'center'}}>
            <CircularProgress />
          </Box>
        }
        {data.length < 1
          ? <h2>на данный момент инвентарь отсутствует</h2>
          : data.map((item) => {
            return (
              <fieldset key={item.id}>
                <h3>{item.roomId.title}</h3>
                <h5>{item.roomId.description}</h5>
                инвентарь
                <h5>{item.title}</h5>
                <h5>{item?.description}</h5>
              </fieldset>
            )
          })}
      </div>
    </div>
  )
}

export default ItemsRoom
