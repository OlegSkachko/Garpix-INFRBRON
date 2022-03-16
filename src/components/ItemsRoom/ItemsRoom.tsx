import { apiGarpix } from '@/api/ApiGarpix'
import useLoader from '@/hooks/useLoader'
import IitemsRoom from '@/interfaces/IItemsRoom'
import React, { useState } from 'react'

const ItemsRoom: React.FC = () => {
  const { isLoading, loadData } = useLoader(refreshItemsRoom, apiGarpix.getItemsRoom)
  const [itemsRoom, setItemsRoom] = useState<IitemsRoom[]>([])

  async function refreshItemsRoom (): Promise<void> {
    const itemsRoom = await loadData()
    setItemsRoom(itemsRoom)
  }

  return (
    <div>
      <button onClick={refreshItemsRoom}>обновить</button>
      <div>
        {isLoading && <h2>идет загрузка...</h2>}
        {itemsRoom.length < 1
          ? <h2>на данный момент инвентарь отсутствует</h2>
          : itemsRoom.map((item) => {
            return (
              <fieldset key={item.id}>
                <h3>{item.roomId.title}</h3>
                <h5>{item.roomId.description}</h5>
                инвентарь
                <h5>{item.title}</h5>
                <h5>{item.description}</h5>
              </fieldset>
            )
          })}
      </div>
    </div>
  )
}

export default ItemsRoom
