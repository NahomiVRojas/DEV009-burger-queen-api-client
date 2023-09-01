import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../Services/Request'
import style from "./LoginForm.module.css";
import { saveData } from "../../Services/LocalData";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateTo = useNavigate();

    function userAuth(e) {
        e.preventDefault();
        auth(email, password)
        .then((response) => {
            console.log('Server Response:', response);
            if (!response.ok) {
              throw new Error('Error en la solicitud de inicio de sesión');
            }
            return response.json();
          })
        .then((data) => {
            console.log('Response Data:', data);
            saveData(data.token, data.user.role);
            return data.user;
          })
        .then((user) => {
            console.log(user.role)
            if (user.role === 'admin') {
                navigateTo("/main/dashboard")
            } else {
                navigateTo("/main")
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className={style.section}>
        <input
        type="text"
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
        <button onClick={userAuth} >Log In</button>
        </div>
    )
}