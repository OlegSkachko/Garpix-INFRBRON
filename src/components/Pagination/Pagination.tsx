import { IPagTypes } from '@/interfaces/IPagination'
import React from 'react'

const Pagination: React.FC<IPagTypes> = (props: IPagTypes) => {
  const {
    arrayPages,
    setPageNumber,
    pageNumber,
    refTotal,
    totalItems,
    amount,
    sort,
    item
  } = props

  return (
    <div>
      {arrayPages.map((page) => {
        return (
          <button
            key={page - 1}
            onClick={() => setPageNumber(page - 1)}
            style={{ backgroundColor: `${pageNumber === page - 1 ? 'lightgreen' : 'white'}` }}
          >
            {page}
          </button>
        )
      })}
      <br />
      <br />
      количество:
      <select ref={refTotal} onChange={amount}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value={totalItems}>показать всех</option>
      </select>
      <br />
      <br />
      сортировать:
      <select ref={refTotal} onChange={sort}>
        <option value='roomId.title,asc'>по названию</option>
        <option value='roomId.description,asc'>по описанию</option>
        <option value={`${item ? 'created,asc':'startDate,asc'}`}>по дате</option>
      </select>
      <br />
      <br />
    </div>
  )
}

export default Pagination
