import {Link} from "react-router-dom";
import React from "react";
import db from '../database.js';
import {useEffect} from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { common } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Administrator() {

  const [classList, setClassList] = useState([]);
  const [newClass, setNewClass] = useState({});
  const [newClassName, setNewClassName] = useState("");
  const [newClassTeacher, setNewClassTeacher] = useState(null);

  useEffect(() => {
    console.log("rerendering...");
      const classes = []
      getDocs(collection(db, "Classes"))
      .then((allClasses) => {
        allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
        classes.sort()  // TODO
        setClassList(classes)
      })
  }, [db])

  const headerStyle = {
    backgroundColor:"#673AB7",
    color: common.white,
    alignItems:"center",
    justifyContent:'center',
  }
  const container ={
      display:"flex",
      flexGrow:'1',
      flexDirection: 'column',
      textAlign: 'center'
  }
  const tabStyle = {
    color: common.white,
    textDecoration: 'none'
  };

  return(
    <div style ={container}>
      <div style={headerStyle}>
        <br></br>
        <br></br>
        <h1>ADMINISTRATOR DASHBOARD</h1>
        <br></br>
        <Tabs centered>
            <Tab style={tabStyle} label={<><HomeIcon />Home</>} href="/" />
            <Tab style={tabStyle} label={<><EventIcon />Calendar</>} href="/" />
            <Tab style={tabStyle} label={<><SchoolIcon />Student Directory</>} href="administrator/StudentDirectory" />
            <Tab style={tabStyle} label={<><SchoolIcon />Teacher Directory</>} href="administrator/TeacherDirectory" />
        </Tabs>
        <br></br>
      </div>

      <br></br>
      <br></br>

      <Grid container spacing={10}>
        <Grid item xs>
            <TextField 
              id="standard-basic" 
              variant="standard"
              helperText = "Class Name"
              onChange={(e) => setNewClassName(e.target.value)}
              inputProps={{ defaultValue: null }}
            />
        </Grid>
        <Grid item xs>
            <TextField 
              id="standard-basic" 
              variant="standard"
              helperText = "Class Name"
              onChange={(e) => setNewClassTeacher(e.target.value)}
              inputProps={{ defaultValue: null }}
            />
        </Grid>
        <Grid item xs><Button>Add Class</Button></Grid>

      </Grid>
      
      <br></br>
      <br></br>
      <br></br>
      <h4>Class Pages:</h4>
    
      {classList.map((c) => 
        <Link to='AdminClassPage' state={{ className: c.name, classID: c.id, gradeLevel:c.grade}}>
          <Button
          variant='outlined'
          sx={{ color: 'purple', borderColor: 'purple' }}>Class {c.name}</Button>
        </Link>)
      }
    </div>
  );
}

export default Administrator;