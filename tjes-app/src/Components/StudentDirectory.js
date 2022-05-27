import React from "react";
import {initializeApp} from "firebase/app"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment, deleteDoc } from "firebase/firestore";
import {useState, useEffect, useRef} from "react"
import db from "../database.js"
import IndivStudent from "./indivStudentComp.js"
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
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

// create a form where admin can input all fields to create new student
function StudentDirectory(){
    const [removeStudnet, setRemovedStudents]=useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [grade, setGrade] = useState("");
    const [className, setClassName]=useState("");
    const [students, setStudents] = useState([])
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        const students = []
        getDocs(collection(db, "Students"))  
        .then((allResponses) => {  // format each response into an array as we want it
          allResponses.forEach((response) => students.push({ id: response.id, ...response.data() }))
          students.sort()
          setStudents(students);
        })
        const classes = []
        getDocs(collection(db, "Classes"))
        .then((allClasses) => {
          allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
          classes.sort() 
          setClassList(classes)
      })
      }, [db])

    const addStudent = (e) => {
        e.preventDefault(e);
        const newStudent = {
          FirstName: firstName,
          LastName: lastName,
          GradeLevel: gradeLevel,
          Class: "Classes/" + className,
          Grade: grade,
          Teacher: "NEED TO FIND"
      }

        addDoc(collection(db, "Students"), newStudent)
        .then((docRef) => {
            setStudents([...students, {id: docRef.id, ...newStudent}])
        })
        .catch((e) => console.error(e))
    }

    const removeStudent = async (id) => {
      await deleteDoc(doc(db, "Students", id));
      const inc=removeStudnet+1;
      setRemovedStudents(inc);
    }

      return (
        <div style ={container}>
          <div style={headerStyle}>
            <br></br>
            <br></br>
            <h1>STUDENT DIRECTORY</h1>
            <br></br>
            <Tabs centered>
                <Tab style={tabStyle} label={<><HomeIcon />Home</>} href="/" />
                <Tab style={tabStyle} label={<><EventIcon />Calendar</>} href="/" />
                <Tab style={tabStyle} label={<><SpeedIcon />Admin Dashboard</>} href="/administrator" />
                <Tab style={tabStyle} label={<><SchoolIcon />Teacher Directory</>} href="./TeacherDirectory" />
            </Tabs>
            <br></br>
            <br></br>
          </div>
          <div className="studentDirectory">
            <center>
            <br></br>
            <Grid container spacing={5}>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth><b>Add a Student: </b></p></Grid>
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
                  <TextField fullWidth
                    id="standard-basic" 
                    variant="standard"
                    helperText = "Grade Level"
                    onChange={(e) => setGradeLevel(e.target.value)}
                    inputProps={{ defaultValue: null }}
                  />
              </Grid>
              <Grid item xs>
                  <TextField fullWidth
                    id="standard-basic" 
                    variant="standard"
                    helperText = "Grade"
                    onChange={(e) => setGrade(e.target.value)}
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
              <Grid item xs><Button onClick={addStudent}
                sx={{ color: 'white', backgroundColor: '#673AB7' }}
                >Add Student</Button></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>
              <Grid item xs><p fullWidth>    </p></Grid>

            </Grid>
              {students.map((student)=> <IndivStudent
                id={student.id} 
                FirstName={student.FirstName}
                LastName={student.LastName}
                GradeLevel={student.GradeLevel}
                Class={student.Class}
                Grade={student.Grade}
                removeStudent={removeStudent}
              />  )}
              </center>
          </div>
          </div>
      );
}

export default StudentDirectory;