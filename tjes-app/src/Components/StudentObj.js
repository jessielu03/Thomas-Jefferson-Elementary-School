function StudentObj(props) {
    return (
        <div>
            <h3>{props.studentFirst} {props.studentLast}</h3>
            <p>Current Grade: {props.gradeLetter}</p>
            <input type="submit" onClick={() => props.upvote(props.id)} value="Upvote" />
        </div>
    );
}

export default StudentObj;