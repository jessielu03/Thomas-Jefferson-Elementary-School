import {Link} from "react-router-dom";
import React from "react";
function Administrator(){
    return(
        <nav>
            <Link to='/'>Home</Link>
            <Link to='administrator/TeacherDirectory'>Teacher Directory</Link>
            <Link to='administrator/StudentDirectory'>Student Directory</Link>
            

            {/* links to
                    -use mapping to create links to each
                    class page component
            */}
        </nav>
    );
}export default Administrator;