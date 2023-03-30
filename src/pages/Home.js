import courses from '../courses'
import CourseSummary from '../components/CourseSummary'
import Login from "../components/Login";
function Home() {
    document.title = "Courses";
    return (
        <div className="Home page">
            <header>
                <h1>BigVU Online Courses</h1>
                <Login />
            </header>
            {courses.map((course) => (
                <CourseSummary course={course} key={course.id} />

            ))}
        </div>
    )
}
export default Home