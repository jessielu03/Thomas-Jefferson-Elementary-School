import './App.css';
import React from "react";
import {Link} from "react-router-dom";
import {headerStyle, container, tabStyle, purpleFont, purpleFont2} from './Components/pagescss.js';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div style ={container}>
      <div style={headerStyle}>
        <br></br>
        <br></br>
        <h1>THOMAS JEFFERSON ELEMENTARY SCHOOL</h1>
        <br></br>
        <br></br>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid container spacing={4}>
      <Grid item xs><p fullWidth>    </p></Grid>
      <Grid item xs><p fullWidth>    </p></Grid>
        <Grid item xs>
          <Link to='/teacher'>
          <Button
            variant='outlined'
            size='large'
            style= {{fontSize:'25px'}}
            sx={{ color: '#673AB7', borderColor: '#673AB7' }}>Teachers
          </Button></Link>
        </Grid>
        <Grid item xs>
          <Link to='/administrator'>
          <Button
            variant='outlined'
            size= 'large'
            style= {{fontSize:'25px'}}
            sx={{ color: '#673AB7', borderColor: '#673AB7' }}>Administrators
          </Button></Link>
        </Grid>
        <Grid item xs><p fullWidth>    </p></Grid>
        <Grid item xs><p fullWidth>    </p></Grid>
      </Grid>

    </div>
  );
}

export default App;
