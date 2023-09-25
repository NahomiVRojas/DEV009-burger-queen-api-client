import style from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/burger-queen.webp";

export default function Login() {
    return (
        <main className={style.main}>
            <section className={style.section}>
                <img src={logo} className={style.logo} alt="Logo" />
                <div className={style.intro}>
                    <h1 className={style.title}>Welcome</h1>
                    <h2 className={style.text}>Use your credentials to log into our system.</h2>
                </div>
                <LoginForm />
            </section>
        </main>
    )
}
