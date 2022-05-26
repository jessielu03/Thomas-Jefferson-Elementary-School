import React from "react";
import {initializeApp} from "firebase/app"
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import {useState, useEffect, useRef} from "react"
import db from "../database.js"
import IndivTeacher from "./IndivTeacherComp.js"
import {Link} from "react-router-dom";

// create a form where admin can input all fields to create new student
function TeacherDirectory(){
    const FirstNameref = useRef(null);
    const LastNameref = useRef(null);
    const Classref = useRef(null);
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
      console.log("rerendering teacher directory...");
        const teachers = []
        getDocs(collection(db, "Teachers"))  
        .then((allResponses) => {  // format each response into an array as we want it
          allResponses.forEach((response) => teachers.push({ id: response.id, ...response.data() }))
          teachers.sort();
          setTeachers(teachers);
        })
      }, [db])


    const addTeacher = (e) => {
        e.preventDefault(e);
        const newTeacher = {
            FirstName: FirstNameref.current.value,
            LastName: LastNameref.current.value,
            Class: Classref.current.value
        }

        .addDoc(collection(db, "Teachers"), newTeacher)
        .then((docRef) => {
            setTeachers([...teachers, {id: docRef.id, ...newTeacher}])
        })
        .catch((e) => console.error(e))

        FirstNameref.current.value=""
        LastNameref.current.value=""
        Classref.current.value=""
    }


    const updateClass = (responseID, newClass) => {
        updateDoc(doc(db, "Teachers", responseID), {
          Class: newClass
        })
        .then((docRef) => {
          const updatedTeachers = [...teachers]
          updatedTeachers.forEach((teacher) =>  {
            console.log(teacher.id)
            if (teacher.id === responseID) {
              teacher.Class=newClass
            }
          })
          setTeachers(updatedTeachers);
        })
        .catch((e) => console.error(e))
      }

      return (//put in links above the h1
          <div className="teacherDirectory">
            <center>
              <Link to='/administrator'>Administrators</Link>
              <h1>Teacher Directory</h1>
              <h3>Add a Teacher:</h3>
              <form onSubmit={addTeacher}>
                    First Name:<br></br>
                    <input type="text" ref={FirstNameref}/><br></br>
                    Last Name:<br></br>
                    <input type="text" ref={LastNameref}/><br></br>
                    Class: <br></br>
                    <input type="text" ref={Classref}/><br></br>
                    <input type="submit" value="Add Teacher"/>
              </form>
              </center>
              {teachers.map((teacher)=> <IndivTeacher 
                FirstName={teacher.FirstName}
                LastName={teacher.LastName}
                Class={teacher.Class}
                updateClass={updateClass}
              />  )}
          </div>
      );
}

export default TeacherDirectory;
