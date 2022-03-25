import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material'


const ErrorMessage = ({progress, alert, setAlert}) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
        setAlert(false)
      }

    if (progress === "success") {
      return (
        <>
          { alert &&  
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%', background: 'lightgreen', color: 'darkgreen' }}>
                  Все прошло успешно!
                </Alert>
             </Snackbar>
        }
        </>  
      )
    } else {
      return (
        <>
          { alert &&  
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='error' sx={{ width: '100%', background: 'lightred', color: 'darkred' }}>
                Произошла непредвиденная ошибка!
                </Alert>
             </Snackbar>
        }
        </>  
    );

    }
      
   
};

export default ErrorMessage;