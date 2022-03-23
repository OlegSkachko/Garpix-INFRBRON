import React from 'react'
import { apiGarpix } from '@/api/ApiGarpix'
import Pagination from '../Pagination/Pagination'
import usePagination from '@/hooks/usePagination'
import { IUsePagTypes } from '@/interfaces/IPagination'
import { Box, CircularProgress } from '@mui/material'
import NewRoom from './NewRoom'

const Rooms: React.FC = () => {
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
  }: IUsePagTypes = usePagination(apiGarpix.getRooms, 'IRoom')

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
    <NewRoom ></NewRoom>
      <div>
        {isLoading &&
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>}
        {data.length < 1
          ? <h2>на данный момент доступных комнат нет</h2>
          : data.map((room) => {
            return (
            <fieldset key={room.id}>
                <h3> {room?.title ?? "информация недоступна"}</h3>
                <h3> {room?.description ?? "информация недоступна"}</h3>
                <h3> Активна : {room?.isActive === true? "да": "нет"}</h3>
                <h5>Офис: {room?.officeId?.title ?? "информация недоступна"}</h5>
                <h5>Адрес: {room?.officeId?.address ?? "информация недоступна"}</h5>
            </fieldset>
            )
          })}
      </div>
    </div>
  )
}

export default Rooms
