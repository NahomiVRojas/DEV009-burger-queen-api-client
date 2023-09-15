import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../Services/Request'
import style from "./LoginForm.module.css";
import { saveData } from "../../Services/LocalData";
import exclamationIcon from "../../assets/exclamation-icon.svg";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigateTo = useNavigate();

    function userAuth(e) {
        e.preventDefault();
        auth(email, password)
            .then((response) => {
                console.log('Server Response:', response);
                if (!response.ok) {
                    setError("Invalid credentials.")
                    throw new Error('Error en la solicitud de inicio de sesión');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Response Data:', data);
                saveData(data.accessToken, data.user.role, data.user.name);
                return data.user;
            })
            .then((user) => {
                if (user.role === 'admin' || user.role === 'Admin') {
                    navigateTo("/admin/dashboard")
                } else if (user.role === 'Waiter/Waitress') {
                    navigateTo("/waiter/dashboard")
                } else {
                    navigateTo("/chef/dashboard")
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className={style.section}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={userAuth}>Log In</button>
            {error && 
            <div className={style.error_message}>
            <img src={exclamationIcon} className={style.icon} />
            <span className={style.error}>{error}</span>
            </div>}
        </div>
    )
}