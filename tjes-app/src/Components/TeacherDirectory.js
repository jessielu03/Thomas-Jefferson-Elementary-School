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
import {headerStyle, container, tabStyle, studentCardStyle} from './pagescss.js';
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

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from'@mui/material/CardActions';



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
          teachers.sort((a,b) => a.LastName > b.LastName ? 1: -1);
          setTeachers(teachers);
        })
        const classes = []
        getDocs(collection(db, "Classes"))
        .then((allClasses) => {
          allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
          classes.sort((a,b) => a.name > b.name ? 1: -1)  // TODO
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
      setRemoveTeacher(inc);
      alert("Teacher Removed - Refresh Page to Show Removed Teacher")
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
            </center>

          <div style = {studentCardStyle}>
            <Grid container spacing={3}> 
            {teachers.map((c) => 
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
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" type="submit" onClick={() => (removeSingleTeacher(c.id))}>
                        Remove Teacher
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
          </div>
      );
}

export default TeacherDirectory;