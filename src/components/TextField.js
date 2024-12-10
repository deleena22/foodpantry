import React from 'react';
import { TextField } from '@mui/material/';

function Textfield(props) {

  return (
    <div>
      <form className='box' noValidate autoComplete="off">
        <TextField id="outlined-basic" label={props.placeholder} variant="outlined" />
      </form>
    </div>
  );
}

export default Textfield;
