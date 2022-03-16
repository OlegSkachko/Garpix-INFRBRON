import React, { useState } from 'react'
import { IMyBookings } from '@/interfaces/Ibooking'
import { apiGarpix } from '@/api/ApiGarpix'
import { correctTime } from '../../helpers'
import useLoader from '@/hooks/useLoader'

const AllBookings: React.FC = () => {
  const { isLoading, loadData } = useLoader(refreshMyBookings, apiGarpix.getBookings)
  const [myBookings, setMyBookings] = useState<IMyBookings[]>([])

  async function refreshMyBookings (): Promise<void> {
    const bookings = await loadData()
    setMyBookings(bookings)
  }

  return (
    <div>
      <button onClick={refreshMyBookings}>обновить</button>
      <div>
        {isLoading && <h2>идет загрузка...</h2>}
        {myBookings.length < 1
          ? <h2>на данный момент список бронирований пуст</h2>
          : myBookings.map((booking) => {
            const start = correctTime(booking.startDate)
            const finish = correctTime(booking.endDate)
            return (
              <fieldset key={booking.id}>
                <h3>{booking.roomId.title}</h3>
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
