import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import db from '../database';
import { useLocation } from 'react-router-dom';
import { updateDoc,doc,getDoc,collection, getDocs, increment } from 'firebase/firestore';
import {headerStyle,container} from './pagescss.js';
function AdminClassPage(props){
    // Props include whatever came from the data base
    const location = useLocation();
    const[teacherName, setTeacherName] = useState(location.state?.teacherName);
    const[gradeLevel, setGradeLevel] = useState(location.state?.gradeLevel);
    const[className, setClassName] = useState(location.state?.className);
    const id = location.state?.classID;
    const [thisClass, setClass] = useState([])
    const [classList, setClassList] = useState([]);
    const gradeName = className.charAt(0);
    
    useEffect(() => {
        // const classes = [];
        // getDocs(collection(db, "Classes"))
        // .then((allClasses) => {
        //   allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
        //   classes.sort();  // TODO
        //   setClassList(classes);
    const students = []
      getDocs(collection(db, "Students"))
      .then((allStudents) => {
        allStudents.forEach((c) => students.push({ id: c.id, ...c.data() }))
        students.sort()
        // setClassList(students);
        students.forEach((s) =>{
            if(s.GradeLevel === gradeLevel)
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
            teacher: teacherName,
            name:className,
            grade:gradeLevel 
        })
        .then((doc) => {
            setTeacherName(teacherName);
       });
    }
    return(
        <div style ={container}>
            {/* {props.location.state.classN} */}
            <div style={headerStyle}>
            <h1> Class {className}'s admin page</h1>
            <Tabs centered>
                <Tab label="Home" href="/Administrator" />
                <Tab label="Student Directory" href="./StudentDirectory" />
                <Tab label="Teacher Directory" href="./TeacherDirectory" />
            </Tabs>
            </div>
            <div>
            <Grid container spacing={3}>
            <Grid item xs>
                <TextField id="standard-basic" variant="standard"
                helperText = "Teacher"
                onChange={(e) => setTeacherName(e.target.value)}
                inputProps={{
                    defaultValue: teacherName
                }}/>
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" variant="standard"
                helperText = "Grade Level"
                inputProps={{
                    defaultValue: gradeLevel
                }}
                onChange={(e) => setGradeLevel(e.target.value)}
                />
            </Grid>
            <Grid item xs>
                <TextField id="standard-basic" variant="standard"
                helperText = "Class"
                inputProps={{
                    defaultValue: className
                }}
                onChange={(e) => setClassName(e.target.value)}
                />
            </Grid>
            </Grid>
                Teacher's Name: {teacherName} |
                Grade level: {gradeLevel} |
                Class: {className}
            </div>
            {id}
            <div> 
                {/* Button to change info in firebase */}
                <Button onClick = {() => update(id)}
                >Edit</Button>
            </div>
            <div>
                <h2>Class Roster</h2>
            </div>
            {classList.map((c) => <h3>{c.FirstName}</h3>)}
        </div>
    );

}export default AdminClassPage;