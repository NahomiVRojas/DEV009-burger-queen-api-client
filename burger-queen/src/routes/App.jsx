import { Outlet } from "react-router-dom";
import logo from "../assets/burger-queen.png";
import iconUser from "../assets/icon-user.svg";
import iconSignOut from "../assets/sign-out.svg";

export default function App() {
  return (
    <>
      <header>
        <img src={logo} alt="Burger Queen brand logo" className="logo" />
        <div className="navbar">
          <div className="user-info">
            <img src={iconUser} alt="Icon for logged in user" className="icon" />
            <span>Employee</span>
          </div>
          <div className="sign-out">
              <span>Sign Out</span>
              <img src={iconSignOut} alt="Icon for sign out button" className="icon" />
            </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
