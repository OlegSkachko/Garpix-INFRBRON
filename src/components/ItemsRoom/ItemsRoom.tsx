import { apiItemRoom } from '@/api/ItemRoomApi'
import useLoader from '@/hooks/useLoader'
import usePagination from '@/hooks/usePagination'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IUsePagTypes } from '@/interfaces/IPagination'
import { Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import NewItemRoom from './NewItemRoom'

const ItemsRoom: React.FC = () => {
  const {
    totalPages,
    setPageNumber,
    pageNumber,
    refTotal,
    totalItems,
    setSize,
    setFilter,
    isLoading,
    data,
    refresh
  }: IUsePagTypes = usePagination(apiItemRoom.get, 'IItemsRoom')
console.log(totalItems);

  return (
    <div>
      <Pagination
        totalPages={totalPages}
        setPageNumber={(value) => setPageNumber(value)}
        pageNumber={pageNumber}
        refTotal={refTotal}
        totalItems={totalItems}
        amount={(e) => setSize(+e.target.value)}
        sort={(e) => setFilter(e.target.value)}
        refresh={refresh}
      />
      <NewItemRoom/>
      <div>
        {isLoading &&
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>}
        {data.length < 1
          ? <h2>на данный момент инвентарь отсутствует</h2>
          : data.map((item) => {
            return (
              <fieldset key={item.id}>
                <h3>{item?.title}</h3>
                <h4>{item?.description}</h4>
                Информация о комнате:
                <h5>{item?.roomId?.title}</h5>
                <h5>{item?.roomId?.description}</h5>
              </fieldset>
            )
          })}
      </div>
    </div>
  )
}

export default ItemsRoom
