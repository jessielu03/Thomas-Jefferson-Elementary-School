import React from "react";
import {initializeApp} from "firebase/app"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment, deleteDoc } from "firebase/firestore";
import {useState, useEffect, useRef} from "react"
import db from "../database.js"
import IndivTeacher from "./IndivTeacherComp.js"
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {headerStyle, container, tabStyle} from './pagescss.js';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SpeedIcon from '@mui/icons-material/Speed';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';



// create a form where admin can input all fields to create new student
function TeacherDirectory(){
    const [removeTeacher, setRemoveTeacher]=useState(0);
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [className, setClassName]=useState("");
    const [teachers, setTeachers] = useState([])
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        const teachers = []
        getDocs(collection(db, "Teachers"))  
        .then((allResponses) => {  
          allResponses.forEach((response) => teachers.push({ id: response.id, ...response.data() }))
          teachers.sort();
          setTeachers(teachers);
        })
        const classes = []
        getDocs(collection(db, "Classes"))
        .then((allClasses) => {
          allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
          classes.sort()  // TODO
          setClassList(classes)
      })
      }, [db])

    const addTeacher = (e) => {
        e.preventDefault(e);
        const newTeacher = {
          FirstName: firstName,
          LastName: lastName,
          Class: "Classes/" + className,
        }

        addDoc(collection(db, "Teachers"), newTeacher)
        .then((docRef) => {
            setTeachers([...teachers, {id: docRef.id, ...newTeacher}])
        })
        .catch((e) => console.error(e))
    }

    const removeSingleTeacher = async (id) => {
      await deleteDoc(doc(db, "Teachers", id));
      const inc=removeTeacher+1;
      console.log(inc)
      setRemoveTeacher(inc);
      console.log(removeTeacher)
    }

      return (
        <div style ={container}>
          <div style={headerStyle}>
            <br></br>
            <br></br>
            <h1>TEACHER DIRECTORY</h1>
            <br></br>
            <Tabs centered>
                <Tab style={tabStyle} label={<><HomeIcon />Home</>} href="/" />
                <Tab style={tabStyle} label={<><EventIcon />Calendar</>} href="/" />
                <Tab style={tabStyle} label={<><SpeedIcon />Admin Dashboard</>} href="/administrator" />
                <Tab style={tabStyle} label={<><SchoolIcon />Student Directory</>} href="./StudentDirectory" />
            </Tabs>
            <br></br>
          </div>
          <div className="teacherDirectory">
            <center>
            <br></br>
            <Grid container spacing={5}>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth><b>Add a Teacher: </b></p></Grid>
              <Grid item xs>
                  <TextField fullWidth
                    id="standard-basic" 
                    variant="standard"
                    helperText = "First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    inputProps={{ defaultValue: null }}
                  />
              </Grid>
              <Grid item xs>
                  <TextField fullWidth
                    id="standard-basic" 
                    variant="standard"
                    helperText = "Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    inputProps={{ defaultValue: null }}
                  />
              </Grid>
              
              <Grid item xs>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Class"
                      type="submit"
                      onChange={(e) => setClassName(e.target.value)}
                  >
                    {classList.map((indivClass) =>
                      <MenuItem value={indivClass.id}>{indivClass.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs><Button onClick={addTeacher}
                sx={{ color: 'white', backgroundColor: '#673AB7' }}
                >Add Teacher</Button></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>

            </Grid>
              {teachers.map((teacher)=> <IndivTeacher 
                FirstName={teacher.FirstName}
                LastName={teacher.LastName}
                Class={teacher.Class}
                id={teacher.id}
                removeTeacher={removeSingleTeacher}
              />   )}
              </center>
          </div>
          </div>
      );
}

export default TeacherDirectory;