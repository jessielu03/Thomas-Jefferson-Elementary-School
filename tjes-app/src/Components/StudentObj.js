//import Table from '@mui/material/Table';
//import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
//import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import React, { useState } from 'react'
import {useEffect} from "react";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import db from '../database';

//import Title from './Title';
//import Typography from '@mui/material/Typography';

export default function StudentObj(props) {
    const [grade, setGrade] = useState('');
    const [students, setStudents] = useState([])
    const handleChange = (event) => {
        setGrade(event.target.value);
    };

    useEffect (() => {
        const students = []
        getDocs(collection(db, "Students"))
        .then((allResponses) => {
          allResponses.forEach((student) => students.push({id: student.id, ...student.data() }))
          students.sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1)
          setStudents(students)
        })
      }, [db])

    // updating grade feature
    const updateGrade = (studentID) => {
        updateDoc(doc(db, "Students", studentID,), {
            Grade: grade  
        })
        .then((docRef) => {
        //console.log("Updated Grade: ", gradeChange)
        // update the state variable
        const updatedStudents = [...students]
        updatedStudents.forEach((student) =>  {
            //console.log(entry.id)
            if (student.id === studentID) {
                student.Grade = grade
            }
        })
        setStudents(updatedStudents)
        })
        .catch((e) => console.error(e))
        .then((docRef) => window.location.reload(false));
    } 


    return (
        <TableRow key={props.id} >
            <TableCell>{props.studentFirst}</TableCell>
            <Divider />
            <TableCell>{props.studentLast}</TableCell>
            <Divider />
            <TableCell>{props.studentGradeLevel}</TableCell>
            <Divider />
            <TableCell>{props.gradeLetter}</TableCell>
            <Divider />
            <TableCell align="right">
                <FormControl>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={grade}
                        label="Grade"
                        onChange={handleChange}
                    >
                        <MenuItem value={'A'}>A</MenuItem>
                        <MenuItem value={'A-'}>A-</MenuItem>
                        <MenuItem value={'B+'}>B+</MenuItem>
                        <MenuItem value={'B'}>B</MenuItem>
                        <MenuItem value={'B-'}>B-</MenuItem>
                        <MenuItem value={'C+'}>C+</MenuItem>
                        <MenuItem value={'C'}>C</MenuItem>
                        <MenuItem value={'C-'}>C-</MenuItem>
                        <MenuItem value={'D+'}>D+</MenuItem>
                        <MenuItem value={'D'}>D</MenuItem>
                        <MenuItem value={'D-'}>D-</MenuItem>
                        <MenuItem value={'F'}>F</MenuItem>
                    </Select>
                    <input type="submit" onClick={() => updateGrade(props.id)} value="Update" />
                </FormControl>
            </TableCell>
        </TableRow>
    );
}

{/*
<div>
<h3>{props.studentFirst} {props.studentLast}</h3>
<p>Current Grade: {props.gradeLetter}</p>
<input type="submit" onClick={() => props.upvote(props.id)} value="Upvote" />
</div>
*/}