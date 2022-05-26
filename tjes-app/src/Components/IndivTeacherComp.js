import {useState, useEffect, useRef} from "react"

function IndivTeacher (props) {
    const Classref = useRef(null);
    const id=props.id;

    return (
        <div className="indivStudent">
            <h5>{props.FirstName} {props.LastName}</h5>
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