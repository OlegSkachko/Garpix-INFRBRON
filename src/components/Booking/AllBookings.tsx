import React from 'react'
import { correctTime } from '../../helpers/timeHelper'
import Icon from '../Icon/Icon'
import Pagination from '../Pagination/Pagination'
import usePagination from '@/hooks/usePagination'
import { IUsePagTypes } from '@/interfaces/IPagination'
import { Box, CircularProgress } from '@mui/material'
import { apiBooking } from '@/api/BookingApi'

const AllBookings: React.FC = () => {
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
  }: IUsePagTypes = usePagination(apiBooking.getBookings, 'IMyBookings')

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
      <div>
        {isLoading &&
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>}
        {data.length < 1
          ? <h2>на данный момент список бронирований пуст</h2>
          : data.map((booking) => {
            const start = correctTime(booking.startDate)
            const finish = correctTime(booking.endDate)
            return (
              <fieldset key={booking.id}>
                <h3>
                  <Icon value={booking.reason} />
                  {booking.roomId.title}
                </h3>
                <h5>{booking.roomId.description}</h5>
                Начало в {start} <br />
                Конец в {finish} <br />
              </fieldset>
            )
          })}
      </div>
    </div>
  )
}

export default AllBookings
