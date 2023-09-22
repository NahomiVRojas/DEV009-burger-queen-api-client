import style from "../NewOrderTable/NewOrderTable.module.css";
import iconSeeOrders from "../../assets/icon-see-orders.svg";
import TakeOrder from "../TakeOrder/TakeOrder";
import Menu from "../Menu/Menu";
import { useState } from "react";
import NavigateTo from "../Navigate/Navigate";
import returnButton from "../../assets/return-button.svg";
import { postOrder } from "../../Services/Request";
import Alert from "../Alert/Alert";

export default function NewOrderTable() {

  const token = localStorage.getItem("token");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = NavigateTo("/waiter/orders");
  const handleReturn = NavigateTo("/waiter/dashboard");

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSuccessAlert = () => {
    setShowSuccess(true);
  }

  const handleCloseSuccessAlert = () => {
    setShowAlert(false);
    handleClick();
  }

  const handleAddToSelectedItems = (item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );

    if (existingItem) {
      const updatedItems = selectedItems.map((selectedItem) => {
        if (selectedItem.id === item.id) {
          return { ...selectedItem, qty: selectedItem.qty + 1 };
        }
        return selectedItem;
      });

      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, qty: 1 }]);
    }
  };

  const handleRemoveSelectedItems = (item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );

    if (existingItem) {
      if (item.qty > 1) {
        const updatedItems = selectedItems.map((selectedItem) => {
          if (selectedItem.id === item.id) {
            return { ...selectedItem, qty: selectedItem.qty - 1 };
          }
          return selectedItem;
        });
        
        setSelectedItems(updatedItems);
      } else if (item.qty <= 1) {
        const updatedItems = selectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
        setSelectedItems(updatedItems);
      }
    }
  };

  const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });
  const [dataEntry] = useState(currentDateTime);

  const [client, setClient] = useState("");
  const [status] = useState("Pending");

  function handleAddOrder(tableNumber) {
    const data = {
      table: tableNumber,
      client: client,
      products: selectedItems,
      status: status,
      dataEntry: dataEntry,
    };

    if (data.client.length !== 0) {
      handleSuccessAlert();
    } else if (data.client.length === 0) {
      handleShowAlert();
      return;
    }

    postOrder(data, token)
      .then((response) => {
        if (response.ok) {
          setShowSuccess(true);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }

  return (
    <main className={style.new_order}>
      <section className={style.menu}>
        <div>
          <img
            src={returnButton}
            className={style.return_button}
            onClick={handleReturn}
            alt="Return"
          />
          <input
            type="text"
            placeholder="Client Name"
            className={style.client}
            onChange={(e) => setClient(e.target.value)}
          />
          {showAlert && (
            <Alert
              type="error"
              message="Please, enter the client's name."
              option="Try again"
              onClose={handleCloseAlert}
            />
          )}
          {showSuccess && (
            <Alert
              type= "success"
              message="Order successfully sent."
              option="Close"
              onClose={handleCloseSuccessAlert}
            />
          )}
        </div>
        <Menu handleAddToSelectedItems={handleAddToSelectedItems} />
        <div className={style.see_all_orders} onClick={handleClick}>
          <img src={iconSeeOrders} alt="See all orders" className={style.icon_orders} />
          <span>See All Orders</span>
        </div>
      </section>
      <TakeOrder
        selectedItems={selectedItems}
        handleAddToSelectedItems={handleAddToSelectedItems}
        handleRemoveSelectedItems={handleRemoveSelectedItems}
        handleAddOrder={handleAddOrder}
      />
    </main>
  );
}