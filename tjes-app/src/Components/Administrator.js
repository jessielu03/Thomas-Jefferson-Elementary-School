import {Link} from "react-router-dom";
import React from "react";
import db from '../database.js';
import {useEffect} from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SchoolIcon from '@mui/icons-material/School';
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";

function Administrator() {

  const [classList, setClassList] = useState([]);

  useEffect(() => {
    console.log("rerendering...");
      const classes = []
      getDocs(collection(db, "Classes"))
      .then((allClasses) => {
        allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
        classes.sort()  // TODO
        setClassList(classes)
      })
  }, [db])

  return(
      <nav>
          <Link to='/'>Home</Link>
          <h1>Welcome, admin</h1>
          
          <Link to='TeacherDirectory'><Button
              variant='outlined'
              sx={{ color: 'purple', borderColor: 'purple' }}>
                <SchoolIcon />Teacher Directory</Button></Link>
          
          <Link to='StudentDirectory'><Button
              variant='outlined'
              sx={{ color: 'purple', borderColor: 'purple' }}>
                <SchoolIcon />Student Directory</Button></Link>
          <br></br>
          <br></br>
          <Divider></Divider>
          {/*temporary link to access class page*/}
          <h3>Class Pages:</h3>
          <Link to='AdminClassPage' state={{ className: "1A", classID: "tempID"}}>
            <Button
              variant='outlined'
              sx={{ color: 'purple', borderColor: 'purple' }}>Class 1A</Button>
          </Link>

          <br></br>
        
          {classList.map((c) => 
            <Link to='AdminClassPage' state={{ className: c.name, classID: c.id }}>
              <button>Class {c.name}</button>
            </Link>)
          }
      </nav>
  );
}

export default Administrator;
