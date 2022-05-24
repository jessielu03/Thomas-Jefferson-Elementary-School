import './App.css';
import React from "react";
import {Link} from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to='/teacher'>Teachers</Link>
        <br></br>
        <Link to='/administrators'>Administrators</Link>
      </nav>
    </div>
  );
}

export default App;
