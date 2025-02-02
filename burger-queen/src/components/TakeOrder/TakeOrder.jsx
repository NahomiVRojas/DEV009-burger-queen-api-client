import style from "../TakeOrder/TakeOrder.module.css";
import { useState } from "react";
import { array, func } from "prop-types";
import Alert from "../Alert/Alert";

export default function TakeOrder({
  selectedItems,
  handleAddToSelectedItems,
  handleRemoveSelectedItems,
  handleAddOrder,
}) {

  const [tableNumber, setTableNumber] = useState("Table");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertTable, setShowAlertTable] = useState(false);

  const tables = ["Table", "1", "2", "3", "4", "5", "TA"];
  const options = tables.map((item) => <option key={item}>{item}</option>);

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.qty,
      0
    );
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleShowAlertTable = () => {
    setShowAlertTable(true)
  }

  const handleCloseAlertTable = () => {
    setShowAlertTable(false)
  }

  return (
    <section className={style.order}>
      <div className={style.header}>
        <h1>Order</h1>
        <select
          className={style.select}
          value={tableNumber}
          data-testid="table_order"
          onChange={(e) => setTableNumber(e.target.value)}
        >
          {options}
        </select>
      </div>
      <div className={style.items}>
        {selectedItems.length === 0 ? (
          <div className={style.emptyBasket} data-testid="no_items_order">No items selected</div>
        ) : (
          selectedItems.map((item, index) => (
            <div key={index} className={style.item}>
              <div data-testid={`order_${item.name}`}>
                {item.name}
                <br />${item.price}
              </div>
              <div className={style.container}>
                <button
                  className={style.add_item}
                  data-testid={`add_item_${item}`}
                  onClick={() => handleAddToSelectedItems(item)}
                >
                  +
                </button>
                <span className={style.qty} data-testid={`qty_item_${item.qty}`}>{item.qty}</span>
                <button
                  className={style.reduce_item}
                  data-testid={`remove_item_${item}`}
                  onClick={() => handleRemoveSelectedItems(item)}
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={style.buttons}>
        <div className={style.price}>
          <span>Total</span>
          <span className={style.total} data-testid="total_order">${calculateTotal()}</span>
        </div>
        <button
          className={style.button_send}
          data-testid="send_order"
          onClick={() => {
            if (selectedItems.length === 0) {
              handleShowAlert();
            } else if (tableNumber === "Table") {
              handleShowAlertTable();
            } else {
              handleAddOrder(tableNumber);
            }
          }}
        >
          Send
        </button>
        {showAlert && (
          <Alert
            title="Oops..."
            message="Please, select an item."
            option="Try again"
            onClose={handleCloseAlert}
          />
        )}
         {showAlertTable && (
          <Alert
            title="Oops..."
            message="Please, select a table or the Take Away (TA) option."
            option="Try again"
            onClose={handleCloseAlertTable}
          />
        )}
      </div>
    </section>
  );
}

TakeOrder.propTypes = {
  selectedItems: array.isRequired,
  handleAddToSelectedItems: func.isRequired,
  handleRemoveSelectedItems: func.isRequired,
  handleAddOrder: func.isRequired,
};
