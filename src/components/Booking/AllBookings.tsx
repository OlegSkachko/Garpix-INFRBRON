import React from 'react'
import { apiGarpix } from '@/api/ApiGarpix'
import { correctTime } from '../../helpers'
import Icon from '../Icon/Icon'
import Pagination from '../Pagination/Pagination'
import usePagination from '@/hooks/usePagination'


const AllBookings: React.FC = () => {
  const {arrayPages, 
    setPageNumber, 
    pageNumber,  
    refTotal, 
    totalItems, 
    setSize, 
    setFilter, 
    isLoading, 
    myBookings,
    refresh
  } = usePagination(apiGarpix.getBookings)
 

  return (
    <div>
      <Pagination 
        arrayPages= {arrayPages}
        setPageNumber = {(value)=>setPageNumber(value)}
        pageNumber = {pageNumber}
        refTotal = {refTotal}
        totalItems={totalItems}
        amount = {(e)=>setSize(+e.target.value)}
        sort={(e)=>setFilter(e.target.value)}
      />
      <button onClick={refresh}>обновить</button>
      <div>
        {isLoading && <h2>идет загрузка...</h2>}
        {myBookings.length < 1
          ? <h2>на данный момент список бронирований пуст</h2>
          : myBookings.map((booking) => {
            const start = correctTime(booking.startDate)
            const finish = correctTime(booking.endDate)
            return (
              <fieldset key={booking.id}>
                <h3>
                  <Icon value={booking.reason}/> 
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
