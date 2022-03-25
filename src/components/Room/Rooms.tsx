import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination'
import usePagination from '@/hooks/usePagination'
import { IUsePagTypes } from '@/interfaces/IPagination'
import { Box, Button, CircularProgress, } from '@mui/material'
import ErrorMessage from '../SnackBars/ErrorMessage'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NewRoom from './NewRoom'
import { apiRoom } from '@/api/RoomApi'

const Rooms: React.FC = () => {
  const [progress, setProgress] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)

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
    refresh,
  }: IUsePagTypes = usePagination(apiRoom.get, 'IRoom')
  

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
    <ErrorMessage progress={progress} alert={alert} setAlert={setAlert}/>

      <div>
        {isLoading &&
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>}
        {data.length < 1
          ?  <Typography gutterBottom variant="h5" component="div">на данный момент доступных комнат нет</Typography>
          : data.map((room) => {
            return (
            <Card key={room.id} sx={{ border: 1, borderColor: 'primary.main', borderRadius: 4, m: 1, h:100 }}>
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                {room?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
               {room?.description}
              </Typography>
          <Typography variant="body2" color="text.secondary">
               Активна : {room?.isActive === true? "да": "нет"}
              </Typography>
          <Typography variant="body2" color="text.secondary">
              Офис: {room?.officeId?.title ?? "информация недоступна"}
              </Typography>
          <Typography variant="body2" color="text.secondary">
               Адрес: {room?.officeId?.address ?? "информация недоступна"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">редактировать</Button>
              <Button size="small" variant="outlined">удалить</Button>
            </CardActions>
          </Card>
            )
          })}
      </div>
    </div>
  )
}

export default Rooms
