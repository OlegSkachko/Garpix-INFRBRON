
import { apiItemRoom } from '@/api/ItemRoomApi'
import React, { ChangeEvent, useRef, useState } from 'react'

const NewItemRoom = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [count, setCount] = useState<number>(1)
  const [isActive, setIsActive] = useState(false);

  const handleOnChange = () => {
    setIsActive(!isActive);
  };

  
  function getInput (e: ChangeEvent<HTMLInputElement>, type: string): void {
    const log = e.target?.value
   
    switch (type) {
      case 'title':
        setTitle(log)
        break
      case 'description':
        setDescription(log)
        break
      case 'color':
        setCount(+log)
        break
    }
  }
  let roomId

  async function createRoom(): Promise<void> {
    const invite = await apiItemRoom.create(title, description, isActive, count, roomId=16 )
    console.log(invite)
  }

  return (
    <fieldset>
      <input onChange={(e) => getInput(e, 'title')} placeholder='Введите название' />
      <input onChange={(e) => getInput(e, 'description')} placeholder='Опишите инвентарь' />
      Инвентарь активен? <input type='checkbox' checked={isActive} onChange={handleOnChange}/>
      выберите количество: <input type='number' onChange={(e) => getInput(e, 'color')}/>
      <button onClick={createRoom}>создать инвентарь</button>
    </fieldset>
  )
}

export default NewItemRoom
