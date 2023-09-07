import style from './DashboardNavigation.module.css';
import { useNavigate } from "react-router-dom";
import users from '../../assets/hands.png';
import burger from '../../assets/icon-burger.png';
import list from '../../assets/list.png';

export default function DashboardNavigation() {

    const userRole = localStorage.getItem("role");

    const adminButtons = [
        { img: users, title: "Manage Users", path: "/admin/users" },
        { img: burger, title: "Manage Products", path: "/admin/products" },
        { img: list, title: "All Orders", path: "/admin/orders" },
    ];

    const waiterButtons = [
        { img: burger, title: "New Order", path: "/waiter/new" },
        { img: list, title: "All Orders", path: "/waiter/orders" },
    ];

    const dashboardButtons =
        userRole === "Admin" || userRole === "admin" ? adminButtons : waiterButtons;


    const navigateTo = useNavigate();

    function handleClick(path) {
        navigateTo(path);
    }

    return (
        <section className={style.main}>
            {dashboardButtons.map((val, key) => (
                <button className={style.btn} key={key} onClick={() => handleClick(val.path)}>
                    <img src={val.img} className={style.images} alt={val.title} />
                    {val.title}
                </button>
            ))}
        </section>
    );
}