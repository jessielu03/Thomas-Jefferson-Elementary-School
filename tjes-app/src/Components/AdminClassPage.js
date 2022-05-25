import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import db from '../database';
function AdminClassPage(props){
    // Props include whatever came from the data base
    const[teacherName, setTeacherName] = useState("Teach");
    const[gradeLevel, setGradeLevel] = useState("1st");
    const[className, setClassName] = useState("1A");

    const update = () =>{
        // update whatever through database
    }
    return(
        <div>
            <h3>Admin-View Class Page</h3>
            <div>
            <Grid container spacing={3}>
            <Grid item xs>
                <TextField 
                id="standard-basic" 
                variant="standard"
                helperText = "Teacher"
                onChange={(e) => setTeacherName(e.target.value)}
                inputProps={{
                    defaultValue: "Teach"
                }}/>
            </Grid>
            <Grid item xs>
                <TextField 
                id="standard-basic" 
                variant="standard"
                helperText = "Grade Level"
                inputProps={{
                    defaultValue: "1st"
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
                    defaultValue: "1A"
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
                <h5>Class</h5>
            </div>
        </div>
    );

}export default AdminClassPage;