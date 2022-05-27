import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import db from '../database';
import { useLocation } from 'react-router-dom';
import { updateDoc,doc,getDoc,collection, getDocs, increment } from 'firebase/firestore';
import {headerStyle, container, tabStyle,studentCardStyle} from './pagescss.js';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


function AdminClassPage(props){
    // Props include whatever came from the data base
    const location = useLocation();
    const teacherName = location.state?.teacherName;
    const str = teacherName.split(' ');
    const[firstName, setFirstName] = useState(str[0]);
    const[lastName, setLastName] = useState(str[1]);
    const[className, setClassName] = useState(location.state?.className);
    const id = location.state?.classID;
    const [thisClass, setClass] = useState([])
    const [classList, setClassList] = useState([]);
    //const gradeName = className.charAt(0);
    
    useEffect(() => {
        const classes = [];
        getDocs(collection(db, "Classes"))
        .then((allClasses) => {
          allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
          classes.sort();  // TODO
          setClass(classes);
        })
      const students = [];
      getDocs(collection(db, "Students"))
      .then((allStudents) => {
        allStudents.forEach((c) => students.push({ id: c.id, ...c.data() }))
        students.sort()
        // setClassList(students);
        students.forEach((s) =>{
            if(s.GradeLevel === className && !(classList.includes(s)))
            classList.push(s);
        })
        // // setClassList((a) => (a.Class === id) ? classList.push(a):console.log("not a part of this class"))
        setClassList(classList);
      })
    //   getDoc(c.teacher)
    //   .then((doc) => thisClass.push(doc.data())))
  }, [db])

    // Check what the actual fields are called
    const update = (id) =>{
        updateDoc(doc(db, "Classes", id), {
            Class: className,
            teacher: firstName + ' '+ lastName
        })
        .then((doc) => {
            setFirstName(firstName);
       });
    }
    return(
        <div style ={container}>
            {/* {props.location.state.classN} */}
            <div style={headerStyle}>
                <br></br>
                <br></br>
                <h1>CLASS {className}'S CLASS PAGE</h1>
                <br></br>
                <Tabs centered>
                    <Tab style={tabStyle} label={<><HomeIcon />Home</>} href="/" />
                    <Tab style={tabStyle} label={<><EventIcon />Calendar</>} href="/" />
                    <Tab style={tabStyle} label={<><SpeedIcon />Admin Dashboard</>} href="/administrator" />
                    <Tab style={tabStyle} label={<><SchoolIcon />Student Directory</>} href="./StudentDirectory" />
                    <Tab style={tabStyle} label={<><SchoolIcon />Teacher Directory</>} href="./TeacherDirectory" />
                </Tabs>
                <br></br>
            </div>
            <div>
                <br></br> 
                <Card style = {studentCardStyle}>
            <h2>Teacher Information</h2>
                <br></br>
            <Grid container spacing={3} style={studentCardStyle}>
            <Box style = {studentCardStyle}>
            <Card style = {studentCardStyle} xs={{ maxWidth: 200}}>
                    <CardMedia
                    component="img"
                    height="200"
                    alt="student image"
                    image='https://static.thenounproject.com/png/62983-200.png'
                    />
            </Card>
            </Box>
            <div style={studentCardStyle}>
            <Grid item xs>
                <TextField id="standard-basic" variant="standard"
                helperText = "First Name"
                onChange={(e) => setFirstName(e.target.value)}
                inputProps={{
                    defaultValue: firstName
                }}/>
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" variant="standard"
                helperText = "Last Name"
                inputProps={{
                    defaultValue: lastName
                }}
                onChange={(e) => setLastName(e.target.value)}
                />
            </Grid>
            </div>
            <div style={studentCardStyle}>
            <Grid item xs>
                <TextField id="standard-basic" variant="standard"
                helperText = "Grade Level"
                inputProps={{
                    defaultValue: className
                }}
                onChange={(e) => setClassName(e.target.value)}
                />
            </Grid>
            <Button variant="contained" sx={{backgroundColor:'#673AB7'}}onClick = {() => update(id)}
                >Submit Changes</Button>
            </div>
            </Grid>
            </Card>
            </div>
            
            <Card style = {studentCardStyle}>
            <div>
                <h2>Class Roster</h2>
            </div>
            <div style = {studentCardStyle}>
            <Grid container spacing={3}> 
            {classList.map((c) => 
            <Grid item xs = {6}>
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
                        Current Grade: {c.Grade}
                        </Typography>
                    </CardContent>
                </Card>
                </Box>
                </Grid>
            )}
            </Grid>     
            {/* {thisClass.map((c) => <h3>{c.FirstName}</h3>)} */}
            </div>
            </Card>
        </div>
    );

}export default AdminClassPage;