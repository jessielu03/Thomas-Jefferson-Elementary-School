import {Link} from "react-router-dom";
import React from "react";
import db from '../database.js';
import {useEffect} from "react";
import { useState } from "react";
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function CalendarComp() {
  return (
    <>
      <Calendar />
    </>
  )
}
