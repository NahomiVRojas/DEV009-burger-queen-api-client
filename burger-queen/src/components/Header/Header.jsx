import style from "../Header/Header.module.css"
import logo from "../assets/burger-queen.png";
import iconUser from "../assets/icon-user.svg";
import iconSignOut from "../assets/sign-out.svg";

export default function Header() {
    return (
        <>
            <header>
                <img src={logo} alt="Burger Queen brand logo" className={style.brand} />
                <div className={style.navbar}>
                    <div className={style.user}>
                        <img src={iconUser} alt="Icon for logged in user" className={style.icon} />
                        <span>Employee</span>
                    </div>
                    <div className={style.signout}>
                        <span>Sign Out</span>
                        <img src={iconSignOut} alt="Icon for sign out button" className={style.icon} />
                    </div>
                </div>
            </header>   
        </>
    )
}