import { useState } from "react";
import style from "./LoginForm.module.css";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userAuth = (email, password) => {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    };

    function userLogIn(e) {
        e.preventDefault();
        userAuth(email, password)
        .then(() => {
            console.log('You are logged in.')
        })
        .catch(() => {
            console.log('You are NOT logged in.')
        })

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
        <button onClick={userLogIn} >Log In</button>
        </div>
    )
}