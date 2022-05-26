import {Link} from "react-router-dom";
import React from "react";
// import db from './database.js';
import {useEffect} from "react"

function Administrator(){

    // useEffect(() => {
    //     const classes = []
    //     getDocs(collection(db, "Classes"))
    //     .then((allClasses) => {
    //       allClasses.forEach((c) => classes.push({ id: c.id, ...c.data() }))
    //       // classes.sort((a, b) => )  // TODO
    //       setResponses(responses)
    //     })
    //   }, [db])

    return(
        <nav>
            <Link to='/'>Home</Link>
            <h1>Welcome, admin</h1>
            <Link to='/TeacherDirectory'>Teacher Directory</Link>
            <Link to='/StudentDirectory'>Student Directory</Link>
            <Link to ='/AdminClassPage' state={{className: "1A"
            , classID: "tempClass", teacherName: "Teach", gradeLevel: "1"}}
                >ClassPage</Link>
            {/* links to
                    -use mapping to create links to each
                    class page component
            */}
        </nav>
    );
}export default Administrator;