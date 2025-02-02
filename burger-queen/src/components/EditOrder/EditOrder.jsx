import style from "../EditOrder/EditOrder.module.css";
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import NavigateTo from "../Navigate/Navigate";
import returnButton from "../../assets/return-button.svg";
import iconSeeOrders from "../../assets/icon-see-orders.svg";
import { userOrder } from "../../Services/Request";
import { useParams } from "react-router-dom";
import UpdateOrder from "../UpdateOrder/UpdateOrder";
import { patchOrder } from "../../Services/Request";
import Alert from "../Alert/Alert";

export default function EditOrder() {

  const token = localStorage.getItem("token");
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});

  const { orderId } = useParams();

  const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });
  const [dataEntry] = useState(currentDateTime);

  const handleClick = NavigateTo("/waiter/orders");
  const handleReturn = NavigateTo("/waiter/orders");

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccessAlert = () => {
    setShowSuccess(true);
  }

  const handleCloseSuccessAlert = () => {
    setShowSuccess(false);
    handleClick();
  }

  useEffect(() => {
    userOrder(orderId, token)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No existe productos");
        }
        return response.json();
      })
      .then((data) => {
        setOrderInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderId, token]);

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
    const itemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (itemIndex !== -1) {
      const updatedItems = [...selectedItems];

      if (updatedItems[itemIndex].qty > 1) {
        updatedItems[itemIndex].qty -= 1;
      } else {
        updatedItems.splice(itemIndex, 1);
      }
      setSelectedItems(updatedItems);
    }
  };

  function handleEditOrder(updateData) {

    const updatedOrderData = {
      ...updateData,
      dataEntry: dataEntry,
      dateProcessed: null,
      status: "Pending"
    };

    patchOrder(orderId, updatedOrderData, token)
      .then((response) => {
        if (response.ok) {
          handleSuccessAlert();
        }
        return response.json();
      })
      .then((newData) => {
        return newData;
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud de edición", error);
      });
  }

  return (
    <main className={style.new_order}>
      <section className={style.menu}>
        <div className={style.container_client}>
          <img
            src={returnButton}
            className={style.return_button}
            onClick={handleReturn}
            alt="Return"
          />
          <span className={style.client}>{orderInfo && orderInfo.client}</span>
        </div>
        <Menu handleAddToSelectedItems={handleAddToSelectedItems} />
        <div className={style.see_all_orders} onClick={handleClick}>
          <img src={iconSeeOrders} className={style.icon_orders} alt="See orders" />
          <span>See All Orders</span>
        </div>
      </section>
      <UpdateOrder
        selectedItems={selectedItems}
        handleAddToSelectedItems={handleAddToSelectedItems}
        handleRemoveSelectedItems={handleRemoveSelectedItems}
        handleEditOrder={handleEditOrder}
        orderInfo={orderInfo}
      />
      {showSuccess && (
        <Alert
          type="success"
          message="Order successfully sent."
          option="Close"
          onClose={handleCloseSuccessAlert}
        />
      )}
    </main>
  );
}
