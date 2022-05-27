import {useState, useEffect, useRef} from "react"

function IndivTeacher (props) {
    const divStyle = {
        backgroundColor:"#673AB7",
        color: "#FFFFFF",
        width: "500px",
    }

    return (
        <div className="indivStudent" style={divStyle}>
            <h3>{props.FirstName} {props.LastName}</h3>
            <input type="submit" onClick={() => props.removeTeacher(props.id)} value="Remove Teacher" />
        </div>
    );
}

export default IndivTeacher;

/*
<form onSubmit={props.updateClass(id, Classref.current.value)}>
                Class:
                <input type="text" value={props.Class} ref={Classref}/><br></br>
                <input type="submit" value="Update Class"/>
            </form>
*/