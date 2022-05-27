import {useState, useEffect, useRef} from "react"
import db from "../database.js"
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { common } from '@mui/material/colors';

function IndivStudent (props) {
    const Teacherref = "Teacher";
    const Graderef = "Grade";
    const divStyle = {
        backgroundColor:"#673AB7",
        color: "#FFFFFF",
        width: "500px"
      }
      
    if(true) { //indivClass!=null
        return (
            <div className="indivStudent" style={divStyle}>
                <h4>{props.FirstName} {props.LastName} | Grade Level: {props.GradeLevel} | Grade: {props.Grade}</h4>
                <input type="submit" onClick={() => props.removeStudent(props.id)} value="Remove Student" />
            </div>
        );
    }
  
}
export default IndivStudent;