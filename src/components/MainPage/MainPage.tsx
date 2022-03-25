import React from 'react';
import { navbar } from '@/consts';
import MainCards from './MainCards';
import Grid from '@mui/material/Grid';

const MainPage = () => {

  return (
    <Grid container >
      {  navbar.map((el)=> (
            <MainCards 
            key={el.primary}
            primary={el.primary} 
            to={el.to}
            img={el.img}
          />
            ))
      }
    </Grid>
  );
};

export default MainPage;