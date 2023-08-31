import style from './DashboardNavigation.module.css';
import Navigate from '../Navigate/Navigate';
import users from '../../assets/hands.png';
import burger from '../../assets/icon-burger.png';
import list from '../../assets/list.png';

const adminButtons = [
    { img: users, title: "Manage Users", path: "/main/users" },
    { img: burger, title: "Manage Products", path: "/main/products" },
    { img: list, title: "All Orders", path: "/main/orders" },
];

export default function DashboardNavigation() {
    return (
        <section className={style.main}>
            {adminButtons.map((val, key) => (
                <Navigate key={key} path={val.path}>
                    <div className={style.btn}>
                        <img src={val.img} className={style.images} alt={val.title} />
                        {val.title}
                    </div>
                </Navigate>
            ))}
        </section>
    );
}

