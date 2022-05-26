import {useState, useEffect, useRef} from "react"

function IndivStudent (props) {
    const Teacherref = useRef(null);
    const Graderef = useRef(null);
    const id=props.id;

    return (
        <div className="indivStudent">
            <h5>{props.FirstName} {props.LastName}</h5>
            <p>Grade Level: {props.GradeLevel}</p>
            <p>Class: {props.Class}</p>
            <form onSubmit={props.updateTeacher(id, Teacherref.current.value)}>
                Teacher:
                <input type="text" value={props.Teacher} ref={Teacherref}/><br></br>
                <input type="submit" value="Update Teacher"/>
            </form>
            <form onSubmit={props.updateGrade(id, Graderef.current.value)}>
                Class:
                <input type="text" value={props.Grade} ref={Graderef}/><br></br>
                <input type="submit" value="Update Grade"/>
            </form>
        </div>
    );
}

export default IndivStudent;