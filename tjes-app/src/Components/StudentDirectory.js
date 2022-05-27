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
import {headerStyle, container, tabStyle, studentCardStyle} from './pagescss.js';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SpeedIcon from '@mui/icons-material/Speed';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from'@mui/material/CardActions';

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
    const [localClassName, setLocalClassName]=useState("")

    useEffect(() => {
        const students = []
        getDocs(collection(db, "Students"))  
        .then((allResponses) => {  // format each response into an array as we want it
          allResponses.forEach((response) => students.push({ id: response.id, ...response.data() }))
          students.sort( (a, b) => {
            let fa = a.FirstName.toLowerCase(),
                fb = b.FirstName.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
          });
          setStudents(students);
        })
        const classes = []
        getDocs(collection(db, "Classes"))
        .then((allClasses) => {
          allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
          classes.sort((a,b) => a.name > b.name ? 1: -1)  // TODO
          setClassList(classes)
      })
      }, [db])

    const addStudent = (e) => {

        for(let i=0; i<classList.length; i++) {
          if(className===classList[i].id){
            setLocalClassName(classList[i].name)
          }
        }

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
      alert("Student Removed - Refresh Page to Show Removed Student")
    }

    const findClass = (student) => {
      let indivClass="";
      for(let i=0; i<classList.length; i++) {
        if(student.Class.substring(8, student.Class.length)===classList[i].id){
          indivClass=classList[i].name
        }
      }
      return indivClass;
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
                <Tab style={tabStyle} label={<><EventIcon />Calendar</>} href="/calendar" />
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
              </center>
          </div>

          <div style = {studentCardStyle}>
            <Grid container spacing={3}> 
            {students.map((c) => 
            <Grid item xs={3}>
            <Box style = {studentCardStyle}>
                <Card sx={{ maxWidth: 200}}>
                    <CardMedia
                    component="img"
                    height="140"
                    alt="student image"
                    image='https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179856.jpg'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {c.FirstName} {c.LastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Grade Level: {c.GradeLevel}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Current Grade: {c.Grade}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Class: {findClass(c)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" type="submit" onClick={() => (removeStudent(c.id))}>
                        Remove Student
                      </Button>
                    </CardActions>
                </Card>
                </Box>
              </Grid>
            )}
            {/* {thisClass.map((c) => <h3>{c.FirstName}</h3>)} */}
            </Grid>
          </div>
        </div>

      );
}

export default StudentDirectory;