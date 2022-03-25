import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardMedia } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';


const MainCards = ({to, primary, img }) => {
    
    return (
        <Grid item xs={12} sm={6} md={4} >
            <Card sx={{ maxWidth: 345, m:2, boxShadow: 2, ":hover" : {boxShadow: 10}}} >
                <CardMedia
                component="img"
                height="140"
                image={img}
                alt="офисы"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {primary}
                </Typography>
                </CardContent>
                <CardActions>
                <NavLink 
                    key={primary}
                    to={to} 
                    style={{ textDecoration: 'none' }}
                >
                <Button size="small" variant='outlined'>Перейти</Button>
                </NavLink>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default MainCards;