import style from "../ChefOrders/ChefOrders.module.css";
import returnButton from "../../assets/return-button.svg";
import NavigateTo from "../Navigate/Navigate";
import React, { useState, useEffect } from "react";
import { allOrders } from "../../Services/Request";
import iconShowInfo from "../../assets/icon-show-info.svg";
import Delivered from "../Delivered/Delivered";
import iconRefresh from "../../assets/icon-refresh.svg";

export default function ChefOrders() {
  const token = localStorage.getItem("token");
  const handleClick = NavigateTo("/chef/dashboard");
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  function getAllOrders(token) {
    allOrders(token)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No orders available.");
      }
      return response.json();
    })
    .then((data) => {
      setOrders(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const storedCheckedItems = JSON.parse(localStorage.getItem("checkedItems")) || {};
    setCheckedItems(storedCheckedItems);

    getAllOrders(token);

  },[token]);

  function toggleExpand(orderId) {
    setExpandedOrder((prevExpandedOrder) =>
      prevExpandedOrder === orderId ? null : orderId
    );
  }

  function handleInfoClick(event, orderId) {
    if (event.target.tagName === "IMG") {
      toggleExpand(orderId);
    }
  }

  const updatedOrderData = (updateOrder) => {
    setOrders((orders) =>
      orders.map((order) => {
        if (order.id === updateOrder.id) {
          return {
            ...order,
            status: updateOrder.status,
            dateProcessed: updateOrder.dateProcessed,
            duration: updateOrder.duration,
          };
        } else {
          return order;
        }
      })
    );
  };

  function handleCheckboxChange(productIndex, orderId) {
    setCheckedItems((prevCheckedItems) => {
      const updatedOrder = prevCheckedItems[orderId] || {};
      const currentStatus = updatedOrder[productIndex] || false;
      const newStatus = !currentStatus;
  
      const newCheckedItems = {
        ...prevCheckedItems,
        [orderId]: {
          ...updatedOrder,
          [productIndex]: newStatus,
        },
      };
  
      localStorage.setItem("checkedItems", JSON.stringify(newCheckedItems));
  
      return newCheckedItems;
    });
  }

  return (
    <>
      <div className={style.title_section}>
        <div className={style.title}>
          <img src={returnButton} onClick={handleClick} alt="Return" className={style.icon_return} />
          <h1>Active Orders</h1>
        </div>
        <div>
        <img src={iconRefresh} className={style.icon_refresh} alt="Refresh" onClick={() => getAllOrders(token)}/>
        </div>
      </div>
      <div className={`table-responsive ${style.responsive}`}>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Table</th>
              <th>Received</th>
              <th>Status</th>
              <th>Delivered</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <React.Fragment key={index}>
                  <tr onClick={(event) => handleInfoClick(event, order.id)}>
                    <td>
                      <img src={iconShowInfo} alt="Info" className={style.icon_info} />
                    </td>
                    <td>{order.table}</td>
                    <td>{order.dataEntry}</td>
                    <td>{order.status}</td>
                    <td>{order.dateProcessed}</td>
                    <td>{order.duration}</td>
                    <td>
                      {order.status === "Pending" && (
                        <Delivered
                          order={order}
                          onEditSuccess={updatedOrderData}
                        />
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr
                      key={`expanded_${order.id}`}
                      className={style.expanded_row}
                    >
                      <td colSpan="7" className={style.expanded_info}>
                        <ul>
                          {order.products.map((product, productIndex) => (
                            <li
                              key={productIndex}
                              className={style.expanded_list}
                            >
                              <input
                                className={style.checkbox}
                                type="checkbox"
                                checked={checkedItems[order.id]?.[productIndex] || false}
                                onChange={() => handleCheckboxChange(productIndex, order.id)}
                              />
                              <label className={style.label}>
                                {product.qty}x {product.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
