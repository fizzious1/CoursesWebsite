import { Link } from 'react-router-dom';

function LessonSummary(props) {
    return (
        <section key={props.lesson.id} className="summary">
            <div>
                <div className="title">
                    <h2>
                        <Link
                            className="no-underline cursor-pointer"
                            to={'/courses/' + props.courseId + '/lessons/' + props.lesson.id}
                        >
                            {props.num}. {props.lesson.title}
                        </Link>
                        {props.lesson.completed && (
                            <img src={"https://em-content.zobj.net/thumbs/120/sony/336/1st-place-medal_1f947.png"} alt={"medal"}/>
                        )}
                    </h2>
                </div>
                <p>
                    <Link
                        className="no-underline cursor-pointer"
                        to={'/courses/' + props.courseId + '/lessons/' + props.lesson.id}
                    >
                        {props.lesson.description}
                    </Link>
                </p>
            </div>
        </section>
    );
}
export default LessonSummary;
