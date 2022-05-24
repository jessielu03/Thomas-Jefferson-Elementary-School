import {Link} from "react-router-dom";
import React from "react";
function Administrator(){
    return(
        <nav>
            <Link to='/'>Home</Link>
            {/* links to
                    -student directory
                    -teacher directory
                    -use mapping to create links to each
                    class page component
            */}
        </nav>
    );
}export default Administrator;