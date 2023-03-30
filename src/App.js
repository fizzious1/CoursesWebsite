import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Login from "./components/Login";
import { useState, createContext } from "react";

export const AuthContext = createContext("");

const username = 'bigvu';
const password = 'interview';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const headers = new Headers();
    const location = useLocation();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className="App">
            <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
                <main>
                    {isLoggedIn ? (
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/courses/:courseId" element={<Course />} />
                            <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
                        </Routes>
                    ) : ( location.pathname!=='/login' && location.pathname!=='/login/' &&
                        <div>
                            <h1>You are not logged in</h1>
                            <button onClick={handleLogout}>Log in</button>
                        </div>
                    )}
                    <Routes><Route path="/login" element={<Login />} /></Routes>

                </main>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
