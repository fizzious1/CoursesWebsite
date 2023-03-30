import React, { useState , useEffect, useRef} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import courses from "../courses";
import "./Lesson.css";

function Lesson() {
    /*relevantFields*/
    const { courseId, lessonId } = useParams(); //map: course-->lessons
    const course = courses.find((course) => course.id === parseInt(courseId)); // find the wanted course
    const lesson = course.lessons.find((lesson) => lesson.id === parseInt(lessonId)); //find the wanted lesson
    const navigate = useNavigate(); //here for go back button
    const videoRef = useRef(null);
    const lastSaveTime = useRef(Date.now());
    /*Functions*/
    const [videoUrl, setVideoUrl] = useState(lesson.asset.resource.stream.url); // URLSetter
    const [lessonCompleted, setLessonCompleted] = useState(   //lesson.complete Setter, saved locally
        JSON.parse(localStorage.getItem(`progress_${courseId}`)) || {});
    const [videoPosition, setVideoPosition] = useState( //video position Setter
        lessonCompleted[lessonId] || 0);
    function SetCurrLessonCompleted(lesson) {
        if (lesson) {
            lesson.completed = true;
        }
    }
    function handleBackButtonClick() { //backToCourses button
        navigate(`/courses/${courseId}?lesson=${lessonId}&position=${videoPosition}`);
    }
    function getNextLesson(courseId, lessonId) {
        const courseIndex = courses.findIndex((course) => course.id === parseInt(courseId));
        const currentCourse = courses[courseIndex];
        const lessonIndex = currentCourse.lessons.findIndex((lesson) => lesson.id === parseInt(lessonId));
        if (lessonIndex < currentCourse.lessons.length - 1) { //not last lesson of currentCourse
            return {
                courseId,
                ...currentCourse.lessons[lessonIndex + 1] //return next lesson
            };
        }
        else return null;

    }

    function handleNextCourse() {
        const nextLesson = getNextLesson(courseId, lessonId);
        if (!nextLesson) {
            const courseIndex = courses.findIndex((course) => course.id === parseInt(courseId));
            const nextCourse = courses[courseIndex + 1];
            if (nextCourse) {
                navigate(`/courses/${nextCourse.id}/lessons/${nextCourse.lessons[0].id}`);
            }
            else navigate('/')
        }
    }


    function completeAndContinue() {
        setLessonCompleted(lessonId);
        SetCurrLessonCompleted(lesson);
        const nextLesson = getNextLesson(courseId, lessonId);

        if (nextLesson) {
            navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
            const currentTime = videoRef.current.currentTime;
            setVideoPosition(currentTime);
            localStorage.setItem(`progress_${courseId}_${lessonId}`, currentTime);
            setVideoUrl(nextLesson.asset.resource.stream.url);
        }
        else {
            handleNextCourse();
        }
    }
    useEffect(() => {
        document.title = lesson.title;
        const progress = JSON.parse(localStorage.getItem(`progress_${courseId}`));
        if (progress) {
            setLessonCompleted(progress);
            setVideoPosition(progress[lessonId] || 0);
        }
        if (videoRef.current) { //currVideoPlaying
            videoRef.current.autoplay = true; //autoplay it
            videoRef.current.addEventListener('ended', completeAndContinue); //when video end, move to next video (if exsits)
        }

        setVideoUrl(lesson.asset.resource.stream.url);
    }, [lessonId, courseId,videoRef]);




    function handleVideoTimeUpdate(event) {
        const currentTime = Math.floor(event.target.currentTime);
        setVideoPosition(currentTime);
        const now = Date.now();

        // save progress to local storage every 5 seconds
        if (now - lastSaveTime.current >= 5000) {
            localStorage.setItem(
                `progress_${courseId}_${lessonId}`,
                currentTime
            );
            lastSaveTime.current = now;
        }
    }

    return (
        <div className="lesson-container">
            <div className="video-container" style={{ display: "flex", flexDirection: "column"}}>
                <h2>{lesson.title}</h2>
                <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    onTimeUpdate={handleVideoTimeUpdate}
                />

                <button className="button" onClick={handleBackButtonClick}>
                    Back to Courses
                </button>
            </div>
            <div className="table-container" style={{ display: "flex", flexDirection: "column" }}>
                <h2>Lesson</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Lesson</th>
                        <th>Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {course.lessons.map((lesson, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>
                                        {lesson.title}
                                    </Link>
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={lesson.completed}
                                        onChange={(e) => {

                                            lesson.completed = e.target.checked;
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <button onClick={completeAndContinue}>Complete and continue to next lesson</button>
            </div>
        </div>
    );
}

export default Lesson;
