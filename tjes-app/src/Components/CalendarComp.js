import {Link} from "react-router-dom";
import React from "react";
import db from '../database.js';
import {useEffect} from "react";
import { useState } from "react";
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Paper, Typography } from "@mui/material";
import {headerStyle, container, tabStyle, purpleFont, purpleFont2} from './pagescss.js';

export default function CalendarComp() {
  return (
    <Paper
    sx={{
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    }}
>
        <React.Fragment>
<Typography component="h2" variant="h6" color="primary" gutterBottom> Calendar </Typography>
<div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
<Calendar/>
</div>

        </React.Fragment>
    </Paper>

  )
}
