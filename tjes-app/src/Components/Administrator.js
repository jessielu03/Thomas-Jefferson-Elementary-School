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
import {headerStyle, container, tabStyle} from './pagescss.js';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Administrator() {

  const [classList, setClassList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newClassTeacher, setNewClassTeacher] = useState(null);

  useEffect(() => {
    console.log("rerendering...");
    const classes = []
    getDocs(collection(db, "Classes"))
    .then((allClasses) => {
      allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
      classes.sort((a, b) => (a.name > b.name) ? 1 : -1)  // TODO
      setClassList(classes)
    })
    const teachers = []
    getDocs(collection(db, "Teachers"))
    .then((allTeachers) => {
      allTeachers.forEach((t) => teachers.push({ id: t.id, ...t.data() }))
      teachers.sort()  // TODO
      setTeacherList(teachers)
      console.log(teacherList)
    })
  }, [db])

  const addClass = (e) => {
    e.preventDefault();  // no reloading the page
    const newClass = {
      name: newClassName,
      students: [],
      teacher: newClassTeacher
    }
    addDoc(collection(db, "Classes"), newClass) // add the new response 
    .then((docRef) => {
      setClassList([...classList, {id: docRef.id, ...newClass}]);
    })
    .catch((e) => console.error(e))
  }

  return(
    <div style ={container}>
      <div style={headerStyle}>
        <br></br>
        <br></br>
        <h1>ADMINISTRATOR DASHBOARD</h1>
        <br></br>
        <Tabs centered>
            <Tab style={tabStyle} label={<><HomeIcon />Home</>} href="/" />
            <Tab style={tabStyle} label={<><EventIcon />Calendar</>} href="/calendar" />
            <Tab style={tabStyle} label={<><SchoolIcon />Student Directory</>} href="administrator/StudentDirectory" />
            <Tab style={tabStyle} label={<><SchoolIcon />Teacher Directory</>} href="administrator/TeacherDirectory" />
        </Tabs>
        <br></br>
      </div>

      <br></br>
      <br></br>
      
      <Grid container spacing={4}>
        <Grid item xs><p fullWidth>    </p></Grid>
        <Grid item xs><p fullWidth>    </p></Grid>
        <Grid item xs><p fullWidth>    </p></Grid>
        <Grid item xs><p fullWidth><b>Add a class: </b></p></Grid>
        <Grid item xs>
            <TextField fullWidth
              id="standard-basic" 
              variant="standard"
              helperText = "Class Name (ex. 1A)"
              onChange={(e) => setNewClassName(e.target.value)}
              inputProps={{ defaultValue: null }}
            />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Teacher"
                type="submit"
                onChange={(e) => setNewClassTeacher(e.target.value)}
            >
              {teacherList.map((t) =>
                <MenuItem value={t.FirstName + " " + t.LastName}>{t.FirstName} {t.LastName}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs><Button onClick={addClass}
          sx={{ color: 'white', backgroundColor: '#673AB7' }}
          >Add</Button></Grid>
        <Grid item xs><p fullWidth>    </p></Grid>
        <Grid item xs><p fullWidth>    </p></Grid>
        <Grid item xs><p fullWidth>    </p></Grid>

      </Grid>
      
      <br></br>
      <br></br>
      <br></br>
      <h4>Class Pages:</h4>
    
      {classList.map((c) => 

        // parameters passed to adminclasspage.js
        <Link to='AdminClassPage' state={{ className: c.name, classID: c.id, teacherName: c.teacher}}>

          <Button
          variant='outlined'
          sx={{ color: '#673AB7', borderColor: '#673AB7' }}>Grade {c.name}</Button>
          
        </Link>)
      }
    </div>
  );
}

export default Administrator;