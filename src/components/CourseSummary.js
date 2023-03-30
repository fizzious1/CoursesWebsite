import { Link } from 'react-router-dom';

function CourseSummary(props) {
    const allLessonsCompleted = props.course.lessons.every((lesson) => lesson.completed);

    const medal = allLessonsCompleted ? (
       <img src={"https://em-content.zobj.net/thumbs/120/sony/336/1st-place-medal_1f947.png"} alt={"medal"}/>
    ) : null;

    return (
        <section key={props.course.id} className="summary">
            <div>
                <div className="title">
                    <h2>
                        <Link className="no-underline cursor-pointer" to={'/courses/' + props.course.id}>
                            {props.course.title} {medal}
                        </Link>
                    </h2>
                </div>
                <p>
                    <Link className="no-underline cursor-pointer" to={'/courses/' + props.course.id}>
                        {props.course.description}
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default CourseSummary;
