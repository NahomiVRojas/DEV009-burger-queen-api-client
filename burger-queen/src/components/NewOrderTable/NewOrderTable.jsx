import style from "../NewOrderTable/NewOrderTable.module.css";
import iconSeeOrders from "../../assets/icon-see-orders.svg";
import TakeOrder from "../TakeOrder/TakeOrder";
import Menu from "../Menu/Menu";
import { useState } from "react";
import NavigateTo from "../Navigate/Navigate";
import returnButton from "../../assets/return-button.svg";

export default function NewOrderTable() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddToSelectedItems = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleClick = NavigateTo("/waiter/orders");
  const handleReturn = NavigateTo("/waiter/dashboard");

  return (
    <main className={style.new_order}>
      <section className={style.menu}>
        <div>
          <img src={returnButton} className={style.return_button} onClick={handleReturn} />
          <input
            type="text"
            placeholder="Client Name"
            className={style.client}
          />
        </div>
        <Menu
          handleAddToSelectedItems={handleAddToSelectedItems}
        />
        <div className={style.see_all_orders} onClick={handleClick}>
          <img src={iconSeeOrders} />
          <span>See All Orders</span>
        </div>
      </section>
      <TakeOrder selectedItems={selectedItems} />
    </main>
  );
}
