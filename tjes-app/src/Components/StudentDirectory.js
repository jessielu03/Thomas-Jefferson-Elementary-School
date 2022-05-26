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

// create a form where admin can input all fields to create new student
function StudentDirectory(){
    const [removeStudnet, setRemovedStudents]=useState(0);
    const FirstNameref = useRef(null);
    const LastNameref = useRef(null);
    const GradeLevelref = useRef(null);
    const Graderef = useRef(null);
    const Classref = useRef(null);
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
          classes.sort()  // TODO
          setClassList(classes)
      })
      }, [db])

    const addStudent = (e) => {
        e.preventDefault(e);

        const newStudent = {
            FirstName: FirstNameref.current.value,
            LastName: LastNameref.current.value,
            GradeLevel: GradeLevelref.current.value,
            Class: "Classes/" + Classref.current.value,
            Grade: "Not Yet Assigned",
            Teacher: "NEED TO FIND"
        }

        addDoc(collection(db, "Students"), newStudent)
        .then((docRef) => {
            setStudents([...students, {id: docRef.id, ...newStudent}])
        })
        .catch((e) => console.error(e))

        FirstNameref.current.value=""
        LastNameref.current.value=""
        GradeLevelref.current.value=""
        Graderef.current.value=""
    }

    const removeStudent = async (id) => {
      await deleteDoc(doc(db, "Students", id));
      const inc=removeStudnet+1;
      setRemovedStudents(inc);
    }

      return (//put in links above the h1
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
          </div>

          <div className="studentDirectory">
            <center>
              <h3>Add a Student:</h3>
              <form onSubmit={addStudent}>
                    First Name:<br></br>
                    <input type="text" ref={FirstNameref}/><br></br>
                    Last Name:<br></br>
                    <input type="text" ref={LastNameref}/><br></br>
                    Grade Level (enter a number):<br></br>
                    <input type="text" ref={GradeLevelref}/><br></br>
                    Grade: <br></br>
                    <input type="text" ref={Graderef}/><br></br>
                    <label for="class">Class:</label><br></br>
                      <select id="cars" name="cars" ref={Classref}>
                        {classList.map((indivClass) => 
                        <option value={indivClass.id}>{indivClass.name}
                        </option> 
                        )}
                      </select><br></br>
              <input type="submit" text="Add Student"/>
              </form>
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


/*
<InputLabel id="demo-simple-select-label" ref={Classref}>Class</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="Classes"
                        label="Class"
                      >
                      {classList.map((indivClass) => 
                        <MenuItem value={indivClass.id}>{indivClass.name}
                        </MenuItem> 
                      )}
                      </Select> <br></br><br></br>
*/