import style from "../Header/Header.module.css"
import logo from "../../assets/burger-queen.webp";
import iconUser from "../../assets/icon-user.svg";
import iconSignOut from "../../assets/sign-out.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const userName = localStorage.getItem("name");
    const navigate = useNavigate();

    function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        navigate('/', { replace: true });
    }

    return (
        <>
            <header>
                <img src={logo} alt="Burger Queen brand logo" className={style.brand} />
                <div className={style.navbar}>
                    <div className={style.user}>
                        <img src={iconUser} alt="Icon for logged in user" className={style.icon} />
                        <span>{userName}</span>
                    </div>
                    <div className={style.signout} onClick={signOut} data-testid="signout">
                        <span>Sign Out</span>
                        <img src={iconSignOut} alt="Icon for sign out button" className={style.icon} />
                    </div>
                </div>
            </header>   
        </>
    )
}