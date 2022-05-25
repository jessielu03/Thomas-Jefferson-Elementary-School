import {Link} from "react-router-dom";
import React from "react";
import db from './database.js';

function Teacher(){
    return(
        <nav>
            <Link to='/'>Home</Link>
            {
                // List grades of each student
                // can edit each student's grades - 
                // can map the students out too
            
            } 
        </nav>
    );
}export default Teacher;