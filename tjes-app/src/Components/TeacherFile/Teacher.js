import {Link} from "react-router-dom";
import React from "react";
function Teacher(){
    return(
        <nav>
            <Link to='/'>Home</Link>
            {/* 
                Links to:
                    - student directory
                    - teacher directory
                    - link to their class page
            */}
        </nav>
    );
}export default Teacher;