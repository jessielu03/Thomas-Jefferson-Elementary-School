import {useState, useEffect, useRef} from "react"
import db from "../database.js"
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, increment } from "firebase/firestore";

function IndivStudent (props) {
    const Teacherref = "Teacher";
    const Graderef = "Grade";
    /*
    let indivClass
    getDoc(doc(db, props.Class.toString())).then((res )=>
        indivClass=res.data()
    )
    .catch(err => console.log(err))
    
    */
    if(true) { //indivClass!=null
        return (
            <div className="indivStudent">
                <h4>{props.FirstName} {props.LastName} | Grade Level: {props.GradeLevel} | Grade: {props.Grade}</h4>
                <input type="submit" onClick={() => props.removeStudent(props.id)} value="Remove Student" />
            </div>
        );
    }
  
}

/*
           <p>Class: {indivClass.name}</p>
  <form onSubmit={props.updateTeacher(id, Teacherref.current.value)}>
                Teacher:
                <input type="text" value={props.Teacher} ref={Teacherref}/><br></br>
                <input type="submit" value="Update Teacher"/>
            </form>
            <form onSubmit={props.updateGrade(id, Graderef.current.value)}>
                Class:
                <input type="text" value={props.Grade} ref={Graderef}/><br></br>
                <input type="submit" value="Update Grade"/>
            </form>

            <p>Grade Level: {props.GradeLevel}</p>
            <p>Teacher: {props.Teacher}</p>
            <p>Class: {props.Class}</p>
            <p>Grade: {props.Grade}</p>

               alert(props.Class.name) 
    doc(db, referenceField)
    const studnet 

    then call .data
*/

export default IndivStudent;