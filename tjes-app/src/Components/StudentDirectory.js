import React from "react";
import {initializeApp} from "firebase/app"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import {useState, useEffect, useRef} from "react"
import db from "../database.js"
import IndivStudent from "./indivStudentComp.js"
import {Link} from "react-router-dom";

// create a form where admin can input all fields to create new student
function StudentDirectory(){
    const FirstNameref = useRef(null);
    const LastNameref = useRef(null);
    const GradeLevelref = useRef(null);
    const Classref = useRef(null);
    const Teacherref = useRef(null);
    const [students, setStudents] = useState([])


    useEffect(() => {
        const students = []
        getDocs(collection(db, "Students"))  
        .then((allResponses) => {  // format each response into an array as we want it
          allResponses.forEach((response) => students.push({ id: response.id, ...response.data() }))
          students.sort()
          setStudents(students);
        })
      }, [db])

    const addStudent = (e) => {
        e.preventDefault(e);
        console.log("hello");
        const newStudent = {
            FirstName: FirstNameref.current.value,
            LastName: LastNameref.current.value,
            GradeLevel: GradeLevelref.current.value,
            Class: Classref.current.value,
            Grade: "Not Yet Assigned",
            Teacher: "NEED TO FIND"
        }

        .addDoc(collection(db, "Students"), newStudent)
        .then((docRef) => {
            setStudents([...students, {id: docRef.id, ...newStudent}])
        })
        .catch((e) => console.error(e))

        FirstNameref.current.value=""
        LastNameref.current.value=""
        GradeLevelref.current.value=""
        Classref.current.value=""
        Teacherref.current.value=""
    }

    const updateTeacher = (responseID, newTeacher) => {
      updateDoc(doc(db, "Teacher", responseID), {
        Teacher: newTeacher
      })
      .then((docRef) => {
        const updatedStudents = [...students]
        updatedStudents.forEach((student) =>  {
          console.log(student.id)
          if (student.id === responseID) {
            student.Teacher=newTeacher
          }
        })
        setStudents(updatedStudents);
      })
      .catch((e) => console.error(e))
    }

    const updateGrade = (responseID, grade) => {
      updateDoc(doc(db, "students", responseID), {
        Grade: grade
      })
      .then((docRef) => {
        const updatedStudents = [...students]
        updatedStudents.forEach((student) =>  {
          console.log(student.id)
          if (student.id === responseID) {
            student.Grade=grade
          }
        })
        setStudents(updatedStudents);
      })
      .catch((e) => console.error(e))
    }


      return (//put in links above the h1
          <div className="studentDirectory">
            <center>
              <Link to='/administrator'>Administrators</Link>
              <h1>Student Directory</h1>
              <h3>Add a Student:</h3>
              <form onSubmit={addStudent}>
                    First Name:<br></br>
                    <input type="text" ref={FirstNameref}/><br></br>
                    Last Name:<br></br>
                    <input type="text" ref={LastNameref}/><br></br>
                    Grade Level (enter a number):<br></br>
                    <input type="text" ref={GradeLevelref}/><br></br>
                    Class: <br></br>
                    <input type="text" ref={Classref}/><br></br>
                    Teacher: <br></br>
                    <input type="text" ref={Teacherref}/><br></br>
                    <input type="submit" text="Add Student"/>
              </form>
              </center>
              {students.map((student)=> <IndivStudent
                id={student.id} 
                FirstName={student.FirstName}
                LastName={student.LastName}
                GradeLevel={student.GradeLevel}
                Teacher={student.Teacher}
                Class={student.Class}
                Grade={student.Grade}
                updateTeacher={updateTeacher}
                updateGrade={updateGrade}
              />  )}
          </div>
      );
}


export default StudentDirectory;
