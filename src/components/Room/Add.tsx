import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import AddIcon from '@mui/icons-material/Add';


const Add = ({open}) => {
  
    return (
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<AddIcon />}
          onClick={open}
        />
    );
};

export default Add;



