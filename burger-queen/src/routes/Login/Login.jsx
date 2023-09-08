import style from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from "../../assets/burger-queen.png";

export default function Login() {
    return (
        <main className={style.main}>
            <section className={style.section}>
                <img src={logo} className={style.logo}/>
                <div className={style.intro}>
                    <h3 className={style.title}>Welcome</h3>
                    <h4 className={style.text}>Use your credentials to log into our system.</h4>
                </div>
                <LoginForm />
            </section>
        </main>
    )
}
