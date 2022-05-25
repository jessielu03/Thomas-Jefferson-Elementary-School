function IndivStudent (props) {
    return (
        <div className="indivStudent">
            <h5>{props.FirstName} {props.LastName}</h5>
            <p>{props.FirstName} </p> <br></br>
            <p>Grade Level: {props.GradeLevel}</p><br></br>
            <p>Teacher: {props.Teacher}</p><br></br>
            <p>Class: {props.Class}</p><br></br>
            <p>Current Grade: {props.Grade} </p>
        </div>
    );
}

export default IndivStudent;