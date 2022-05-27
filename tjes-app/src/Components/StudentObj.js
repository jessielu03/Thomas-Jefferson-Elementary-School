//import Table from '@mui/material/Table';
//import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
//import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react'
//import Title from './Title';
//import Typography from '@mui/material/Typography';

function StudentObj(props) {
    //const [grade, setGrade] = useState('')
    //const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //    setGrade(event.target.value as string)
    //}
    return (
        <div>
        <TableRow key={props.id}>
            <TableCell>{props.studentFirst}</TableCell>
            <TableCell>{props.studentLast}</TableCell>
            <TableCell>{props.studentClass}</TableCell>
            <TableCell>{props.gradeLetter}</TableCell>
            <TableCell align="right">
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //value={grade}
                        label="Grade"
                        //onChange={handleChange}
                        type="submit"
                    >
                        <MenuItem value={4}>A</MenuItem>
                        <MenuItem value={3.7}>A-</MenuItem>
                        <MenuItem value={3.3}>B+</MenuItem>
                        <MenuItem value={3.0}>B</MenuItem>
                        <MenuItem value={2.7}>B-</MenuItem>
                        <MenuItem value={2.3}>C+</MenuItem>
                        <MenuItem value={2.0}>C</MenuItem>
                        <MenuItem value={1.7}>C-</MenuItem>
                        <MenuItem value={1.3}>D+</MenuItem>
                        <MenuItem value={1.0}>D</MenuItem>
                        <MenuItem value={0.7}>D-</MenuItem>
                        <MenuItem value={0.0}>F</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
        </TableRow>
        </div>
    );
}

export default StudentObj;

{/*
<div>
<h3>{props.studentFirst} {props.studentLast}</h3>
<p>Current Grade: {props.gradeLetter}</p>
<input type="submit" onClick={() => props.upvote(props.id)} value="Upvote" />
</div>
*/}