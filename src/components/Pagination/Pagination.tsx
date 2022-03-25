import { IPagTypes } from '@/interfaces/IPagination'
import { Button, Pagination } from '@mui/material'
import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Pagination1: React.FC<IPagTypes> = (props: IPagTypes) => {

  const {
    totalPages,
    setPageNumber,
    pageNumber,
    refTotal,
    totalItems,
    amount,
    sort,
    item,
    refresh
  } = props

  function changePage(event: React.ChangeEvent<unknown>, page: number) :void {
    setPageNumber(page-1)
  }
 
  return (
    <div>
     <Box sx={{ display: 'flex', boxShadow: 4, minWidth: 190 , m:1, p:1, ":hover": {
      boxShadow: 10,
    }}}>
      <FormControl sx={{ minWidth: 150, mr: 2}}>
        <InputLabel id="item">количество</InputLabel>
        <Select ref={refTotal}
          labelId="item"
          label="количество"
          onChange={amount}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>4</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={totalItems}>показать всех</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150}}>
        <InputLabel id="filter">сортировать</InputLabel>
        <Select ref={refTotal}
          labelId="filter"
          label="сортировать"
          onChange={sort}
        >
          <MenuItem value={'title,asc'}>по названию</MenuItem>
          <MenuItem value={'description,asc'}>по описанию</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{ ml:'auto' }}
      variant="outlined" size="small" onClick={refresh} >обновить</Button>
    </Box>
    <Box sx={{ minWidth: 190 , m:1, p:1, boxShadow: 5,}}>
      <Pagination
          onChange={changePage}
          count={totalPages} 
          color="primary" 
          variant="outlined" 
          shape="rounded" 
          defaultValue={1}
        />
      </Box>
    </div>
  )
}

export default Pagination1
