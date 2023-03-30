import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../App";

const username = 'bigvu';
const password = 'interview';

function Login() {
    document.title = "Login";
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);


    const handleLogin = async (e) => {
        e.preventDefault();

        if (usernameInput === username && passwordInput === password) {
            setLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            navigate(`/`);
        } else {
            alert('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false'); //here is the problem. i get all the way here and App:isLoggedIn still true
        navigate('/login');
    };

    return (
        <div>
             {!isLoggedIn ? (
                <div> <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                </div>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Login;
