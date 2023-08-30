import style from '../DashboardButtons/DashboardButtons.module.css';
import users from '../../assets/hands.png';
import burger from '../../assets/icon-burger.png';
import list from '../../assets/list.png';

export default function DashboardButtons() {
    return (
        <section className={style.main}>
            <button className={style.users}>
                <div>
                    <img src={users} alt="Manage Users" className={style.images} />
                    <h5>Manage Users</h5>
                </div>
            </button>
            <button className={style.products}>
                <div>
                    <img src={burger} alt="Manage Products" className={style.images} />
                    <h5>Manage Products</h5>
                </div>
            </button>
            <button className={style.orders}>
                <div>
                    <img src={list} alt="All Orders" className={style.images} />
                    <h5>All Orders</h5>
                </div>
            </button>
        </section>
    )
}