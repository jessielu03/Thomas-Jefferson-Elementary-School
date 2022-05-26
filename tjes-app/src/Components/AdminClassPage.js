import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import db from '../database';
import { useLocation } from 'react-router-dom';
import { updateDoc,doc } from 'firebase/firestore';
import { dividerClasses } from '@mui/material';
function AdminClassPage(props){
    // Props include whatever came from the data base
    const location = useLocation();
    const[teacherName, setTeacherName] = useState(location.state?.teacherName);
    const[gradeLevel, setGradeLevel] = useState(location.state?.gradeLevel);
    const[className, setClassName] = useState(location.state?.className);
    const id = location.state?.classID;

    // Check what the actual fields are called
    const update = (id) =>{
        updateDoc(doc(db,"Class",id),{
            teacher: teacherName,
            name: className,
            grade: gradeLevel
       });
    }
    const headerStyle = {
        backgroundColor:"#77a6a1",
        // padding:'1.5em',
        alignItems:"center",
        justifyContent:'center',
        fontFamily:"Hanalei Fill"
        // borderRadius:"25%"
    }
    const container ={
        display:"flex",
        flexGrow:'1',
        flexDirection: 'column',
        textAlign: 'center'
    }
    return(
        <div style ={container}>
            {/* {props.location.state.classN} */}
            <div style={headerStyle}>
            <h1> Class {className}'s admin page</h1>
            <Tabs centered>
                <Tab label="Home" href="/Administrator" />
                <Tab label="Student Directory" href="/StudentDirectory" />
                <Tab label="Teacher Directory" href="/TeacherDirectory" />
            </Tabs>
            </div>
            <div>
            <Grid container spacing={3}>
            <Grid item xs>
                <TextField 
                id="standard-basic" 
                variant="standard"
                helperText = "Teacher"
                onChange={(e) => setTeacherName(e.target.value)}
                inputProps={{
                    defaultValue: teacherName
                }}/>
            </Grid>
            <Grid item xs>
                <TextField 
                id="standard-basic" 
                variant="standard"
                helperText = "Grade Level"
                inputProps={{
                    defaultValue: gradeLevel
                }}
                onChange={(e) => setGradeLevel(e.target.value)}
                />
            </Grid>
            <Grid item xs>
                <TextField 
                id="standard-basic" 
                variant="standard"
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
            {/* <h5>Edit Profile Button</h5> */}
            {/* <body> -> which turns the fields into textfields that you can input into?</body> */}
            <div> 
                {/* Button to change info in firebase */}
                <Button 
                onClick = {() => update()}
                >Edit</Button>
            </div>
            <div>
                <h2>Class Roster</h2>
            </div>
        </div>
    );

}export default AdminClassPage;