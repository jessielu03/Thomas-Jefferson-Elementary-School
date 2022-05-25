import {Link} from "react-router-dom";
import React from "react";
import db from '../database.js';
import {useEffect} from "react";
import { useState } from "react";
import { getFirestore, collection, addDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";


function Administrator(){

    const [responses, setResponses] = useState([])


    useEffect(() => {
        const classes = []
        getDocs(collection(db, "Classes"))
        .then((allClasses) => {
          allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
          classes.sort()  // TODO
          setResponses(responses)
        })
      }, [db])

    return(
        <nav>
            <Link to='/'>Home</Link>
            <h1>Welcome, admin</h1>
            <Link to='administrator/TeacherDirectory'>Teacher Directory</Link>
            <Link to='administrator/StudentDirectory'>Student Directory</Link>

            {/* links to
                    -use mapping to create links to each
                    class page component
            */}
        </nav>
    );
}export default Administrator;