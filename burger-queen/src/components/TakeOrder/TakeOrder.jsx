import style from "../TakeOrder/TakeOrder.module.css";
import { useState } from "react";
import { array } from "prop-types";

export default function TakeOrder({ selectedItems }) {
  const [tableNumber, setTableNumber] = useState("Table");

  const tables = ["Table", "1", "2", "3", "4", "5", "TA"];
  const options = tables.map((item) => <option key={item}>{item}</option>);

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  return (
    <section className={style.order}>
      <div className={style.header}>
        <h4>Order</h4>
        <select
          className={style.select}
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        >
          {options}
        </select>
      </div>
      <div className={style.items}>
        {selectedItems.length === 0 ? (
          <div className={style.emptyBasket}>No items selected</div>
        ) : (
          selectedItems.map((item, index) => (
            <div key={index} className={style.item}>
              <div>
                {item.name}
                <br />${item.price}
              </div>
              <div className={style.container}>
                <button className={style.add_item}>+</button>
                <span className={style.qty}>{item.qty}</span>
                <button className={style.reduce_item}>-</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={style.buttons}>
        <div className={style.price}>
          <span>Total</span>
          <span className={style.total}>${calculateTotal()}</span>
        </div>
        <button className={style.button}>Send</button>
        <button className={style.button}>Check Out</button>
      </div>
    </section>
  );
}

TakeOrder.propTypes = {
  selectedItems: array.isRequired,
};
