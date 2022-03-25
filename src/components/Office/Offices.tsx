import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import usePagination from '@/hooks/usePagination'
import { IUsePagTypes } from '@/interfaces/IPagination'
import { Box, CircularProgress, Skeleton } from '@mui/material'
import NewOffice from './NewOffice'
import { apiOffice } from '@/api/OfficeApi'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Add from '../Room/Add'
import TextField from '@mui/material/TextField';


const Offices: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const changeOffice = () => {
    setEdit(true);
  };

  
  const sendEditOffice = () => {
    setEdit(false);
  };

  const {
    totalPages,
    setPageNumber,
    pageNumber,
    refTotal,
    totalItems,
    setSize,
    setFilter,
    isLoading,
    data,
    refresh
  }: IUsePagTypes = usePagination(apiOffice.get, 'IOffice')

  return (
    <div>
     
      <Pagination
        totalPages={totalPages}
        setPageNumber={(value) => setPageNumber(value)}
        pageNumber={pageNumber}
        refTotal={refTotal}
        totalItems={totalItems}
        amount={(e) => setSize(+e.target.value)}
        sort={(e) => setFilter(e.target.value)}
        refresh={refresh}
      />
      <NewOffice open={open} handleClose={handleClose}/>
        {isLoading &&
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>}
        {data.length < 1
          ? <h4>офисы не найдены</h4>
          :  <Grid container >
              {data.map((office) => {
            return ( 
              <Grid item xs={12} sm={12} md={12} >
              <Card key={office.id} sx={{ maxHeight:300, boxShadow: 2, ":hover" : {boxShadow: 10},  borderColor: 'primary.main', m: 1, h:100 }}>
                
                  { edit ? <>
                  <CardContent >
                    <TextField sx={{ mt:2}}
                    defaultValue={office.address}
                    label="Введите название офиса" 
                    variant="outlined"
                  />
                  <TextField sx={{ mt:2}}
                    defaultValue={office.address}
                    label="Введите название офиса" 
                    variant="outlined"
                  />  
                 
                  </CardContent>
                <CardActions>
                  <Button size="small" onClick={sendEditOffice}>отправить изменения</Button>
                  <Button size="small" onClick={sendEditOffice} variant="outlined">отмена</Button>
                </CardActions>
                </>
                  : <>
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div">{office.title}</Typography>
                  <Typography variant="body2" color="text.secondary">Адрес: {office.address} </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={changeOffice}>редактировать</Button>
                    <Button size="small" variant="outlined">удалить</Button>
                  </CardActions>
                </>
                }
              </Card>
            </Grid>
            )
          })}
          </Grid>
        }
          <Add open={()=>setOpen(true)}/>
    </div>
  )
}

export default Offices
