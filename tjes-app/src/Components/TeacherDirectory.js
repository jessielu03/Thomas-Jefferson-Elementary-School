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


import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



// create a form where admin can input all fields to create new student
function TeacherDirectory(){
    const [removeTeacher, setRemoveTeacher]=useState(0);
    const FirstNameref = useRef(null);
    const LastNameref = useRef(null);
    const Classref = useRef(null);
    const [teachers, setTeachers] = useState([])
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        const teachers = []
        getDocs(collection(db, "Teachers"))  
        .then((allResponses) => {  // format each response into an array as we want it
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
            FirstName: FirstNameref.current.value,
            LastName: LastNameref.current.value,
            Class: "Classes/" + Classref.current.value
        }

        addDoc(collection(db, "Teachers"), newTeacher)
        .then((docRef) => {
            setTeachers([...teachers, {id: docRef.id, ...newTeacher}])
        })
        .catch((e) => console.error(e))

        FirstNameref.current.value=""
        LastNameref.current.value=""
        Classref.current.value=""
    }

    const removeSingleTeacher = async (id) => {
      await deleteDoc(doc(db, "Teachers", id));
      const inc=removeTeacher+1;
      console.log(inc)
      await setRemoveTeacher(inc);
      console.log(removeTeacher)
    }

      return (//put in links above the h1
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
              <h3>Add a Teacher:</h3>
              <form onSubmit={addTeacher} class=".mui-textfeild">
                    First Name:<br></br>
                    <div>
                      <input type="text" ref={FirstNameref} class="mui-textfeild"/><br></br>
                    </div>
                    Last Name:<br></br>
                    <input type="text" ref={LastNameref}/><br></br>
                    <label for="class">Class:</label><br></br>
                      <select id="cars" name="cars" ref={Classref}>
                        {classList.map((indivClass) => 
                        <option value={indivClass.id}>{indivClass.name}
                        </option> 
                        )}
                      </select><br></br>
                    <Button type="submit" value="Add Teacher" class="mui-btn mui-btn--raised">Add Teacher</Button>
              </form>
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
