import { Outlet } from "react-router-dom";
import logo from "../assets/burger-queen.png";
import iconUser from "../assets/icon-user.svg";
import iconSignOut from "../assets/sign-out.svg";

export default function App() {
    return (
        <>
        <header>
          <img src={logo} className="logo"></img>
          <nav>
            <div className="user-info">
              <img src={iconUser} className="icon"></img>
              <p>Employee</p>
            </div>
            <img src={iconSignOut} className="icon"></img>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        </>
    )
}
