import style from './DashboardNavigation.module.css';
import { useNavigate } from "react-router-dom";
import users from '../../assets/hands.png';
import burger from '../../assets/icon-burger.png';
import list from '../../assets/list.png';

const adminButtons = [
    { img: users, title: "Manage Users", path: "/main/users" },
    { img: burger, title: "Manage Products", path: "/main/products" },
    { img: list, title: "All Orders", path: "/main/orders" },
];

export default function DashboardNavigation() {
    const navigateTo = useNavigate();

    function handleClick(path) {
      navigateTo(path);
    }

    return (
        <section className={style.main}>
            {adminButtons.map((val, key) => (
                <button className={style.btn} key={key} onClick={() => handleClick(val.path)}>
                    <img src={val.img} className={style.images} alt={val.title} />
                    {val.title}
                </button>
            ))}
        </section>
    );
}