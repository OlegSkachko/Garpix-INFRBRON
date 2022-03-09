import IBookingNotice from '@/types'
import React, { ChangeEvent, useRef, useState } from 'react'

const BookingNotice: React.FC<IBookingNotice> = (props: IBookingNotice) => {
  const [hour, setHour] = useState<string|number>(0)
  const [minute, setMinute] = useState<string|number>(0)
  const refSelect = useRef<HTMLSelectElement|null>(null)
  const startDate = new Date(props.startDate)
  const endDate = new Date(props.endDate)

  function chooseTime (e: ChangeEvent<HTMLInputElement>): void {
    const time = e.target.value
    setHour(+time.split(':')[0])
    setMinute(+time.split(':')[1])
  }

  function getTime (): void {
    const choosenTime = (+hour * 60 + Number(minute)) * 60 * 1000
    const currentOption = refSelect?.current?.options?.selectedIndex
    const difference = (currentOption === 0)
      ? new Date(startDate.getTime() - choosenTime)
      : new Date(endDate.getTime() - choosenTime)

    if (difference.getTime() < new Date().getTime()) {
      alert('напоминаю!')
    }
  }

  return (
    <div>
      Бронирование:Главная <br />
      Вы забронировали переговорную с 00.00 до 01.00 <br />
      Напомнить до:
      <select ref={refSelect}>
        <option value='1' label='начало бронирования' />
        <option value='2' label='конец бронирования' />
      </select>
      <br />
      Напомнить за часов: {hour}, минут: {minute}<br />
      <label>Изменить время напоминания</label><br />
      <input
        defaultValue='00:00'
        type='time'
        max='01:00'
        onChange={chooseTime}
      />
      <br />
      <button onClick={getTime}>Изменить</button>
      <br />
    </div>
  )
}

export default BookingNotice