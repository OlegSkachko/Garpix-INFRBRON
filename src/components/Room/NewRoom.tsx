import { apiGarpix } from '@/api/ApiGarpix'
import React, { ChangeEvent, useRef, useState } from 'react'

const NewRoom = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [color, setColor] = useState<string>('#ffffff')
  const [isActive, setIsActive] = useState(false);

  const handleOnChange = () => {
    setIsActive(!isActive);
  };

  
  function getInput (e: ChangeEvent<HTMLInputElement>, type: string): void {
    const log = e.target?.value
    console.log("isActive", isActive);
    console.log("title", title);
    console.log("description", description);
    console.log("color", color);
    
    switch (type) {
      case 'title':
        setTitle(log)
        break
      case 'description':
        setDescription(log)
        break
      case 'color':
        setColor(log)
        break
    }
  }

  async function createRoom(): Promise<void> {
    const invite = await apiGarpix.createNewRoom(title, description, isActive, color)
    console.log(invite)
  }

  return (
    <fieldset>
      <input onChange={(e) => getInput(e, 'title')} placeholder='Введите название' />
      <input onChange={(e) => getInput(e, 'description')} placeholder='Опишите комнату' />
      Комната активна? <input type='checkbox' checked={isActive} onChange={handleOnChange}/>
        выберите цвет: <input type='color' onChange={(e) => getInput(e, 'color')}/>
      <button onClick={createRoom}>создать комнату</button>
    </fieldset>
  )
}

export default NewRoom
