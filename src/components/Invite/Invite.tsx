
import { apiInvite } from '@/api/InviteApi'
import { IMyBookings } from '@/interfaces/Ibooking'
import IUser from '@/interfaces/IUser'
import React, { ChangeEvent, useState } from 'react'

const Invite: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [bookings, setBookings] = useState<IMyBookings[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [bookingId, setBookingId] = useState<string>('')

  async function getUsers (): Promise<void> {
    setIsLoading(true)
    
    // const { users, bookings } = await apiGarpix.getUsersAndBooking({
    //   pageNumber: 1,
    //   size: 10,
    //   sort: ['title,asc']
    // })
    setIsLoading(false)
    setUsers(users)
    setBookings(bookings)
    console.log(bookings)
  }

  async function createInvitation (): Promise<void> {
    const invite = await apiInvite.create(userId, bookingId)
    console.log(invite)
  }

  function inviteUser (e: ChangeEvent<HTMLSelectElement>, data: string): void {
    console.log(e.target.value, data)
    switch (data) {
      case 'user':
        setUserId(e.target.value)
        break
      case 'booking':
        setBookingId(e.target.value)
        break
    }
  }

  return (
    <div>
      {isLoading && <h2>идет загрузка...</h2>}
      <fieldset>
        <h3>Пригласить участника</h3>
        <br />
        пригласить участника
        <select onChange={(e) => inviteUser(e, 'user')}>
          <option disabled selected> не выбрано</option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            )
          })}
        </select>
        на мероприятие
        <select onChange={(e) => inviteUser(e, 'booking')}>
          <option disabled selected> не выбрано</option>
          {bookings.map((booking) => {
            return (
              <option key={booking.id} value={booking.id}>
                {booking.title}
              </option>
            )
          })}
        </select>
      </fieldset>
      <button onClick={getUsers}>получить всех пользователей и мероприятия</button>
      <button onClick={createInvitation}>создать приглашение</button>
    </div>
  )
}

export default Invite
