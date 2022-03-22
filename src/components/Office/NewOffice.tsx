import { apiGarpix } from '@/api/ApiGarpix'
import React, { ChangeEvent, useState } from 'react'

const NewOffice = () => {
  const [title, setTitle] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  function getInput (e: ChangeEvent<HTMLInputElement>, type: string): void {
    const log = e.target.value
    switch (type) {
      case 'title':
        setTitle(log)
        break
      case 'adress':
        setAddress(log)
        break
    }
  }

  async function createInvitation (): Promise<void> {
    const invite = await apiGarpix.createNewOffice(title, address)
    console.log(invite)
  }

  return (
    <fieldset>
      <input onChange={(e) => getInput(e, 'title')} placeholder='Введите название' />
      <input onChange={(e) => getInput(e, 'adress')} placeholder='Укажите адрес' />
      <button onClick={createInvitation}>создать офис</button>
    </fieldset>
  )
}

export default NewOffice
