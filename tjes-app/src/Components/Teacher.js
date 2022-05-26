import {Link} from "react-router-dom";
import React from "react";
import StudentObj from "./StudentObj.js";
import { useState } from "react";
import db from '../database';
import {useEffect} from "react";
import {collection, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import {headerStyle,container} from './pagescss.js';

function Teacher(){

    const [students, setStudents] = useState([])
  
    useEffect (() => {
      const students = []
      getDocs(collection(db, "Students"))
      .then((allResponses) => {
        allResponses.forEach((student) => students.push({id: student.id, ...student.data() }))
        students.sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1)
        setStudents(students)
      })
    }, [db])

    // upvote feature
    const upvote = (studentID) => {
        updateDoc(doc(db, "Students", studentID), {
            GradeLevel: increment(1)  
        })
        .then((docRef) => {
        // update the state variable
        const updatedStudents = [...students]
        updatedStudents.forEach((student) =>  {
            //console.log(entry.id)
            if (student.id === studentID) {
            student.GradeLevel++
            }
        })
        updatedStudents.sort((a, b) => (a.GradeLevel < b.GradeLevel) ? 1 : -1)
        setStudents(updatedStudents)
        })
        .catch((e) => console.error(e))
    } 


    return(
        <div style={container}>
            <div style={headerStyle}>
                <h1> Teacher Dashboard</h1>
            </div>
        <nav>
            <Link to='/'>Home</Link>
            {
                // List grades of each student
                // can edit each student's grades - 
                // can map the students out too
          
            <div className="App">
                <h1>Teacher Dashboard</h1>
                <h3>Students:</h3>
                {students.map((Students) => <StudentObj key={Students.id} id={Students.id} studentFirst={Students.FirstName} studentLast={Students.LastName} gradeLetter={Students.GradeLevel} upvote={upvote}/>)}
            </div>

            } 
        </nav>
        </div>
    );
}export default Teacher;