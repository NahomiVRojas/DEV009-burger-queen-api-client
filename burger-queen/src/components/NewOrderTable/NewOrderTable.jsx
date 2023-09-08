import style from "../NewOrderTable/NewOrderTable.module.css";
import iconSeeOrders from  "../../assets/icon-see-orders.svg";
import TakeOrder from "../TakeOrder/TakeOrder";

export default function NewOrderTable() {
  return (
    <main>
      <section className={style.menu}>
        <input type="text" placeholder="Client Name" className={style.client}/>
        <div className={style.component}></div>
        <div>
            <img src={iconSeeOrders}/> 
            <span>See All Orders</span>
        </div>
      </section>
      <section className={style.order}>
        <TakeOrder />
      </section>
    </main>
  );
}
