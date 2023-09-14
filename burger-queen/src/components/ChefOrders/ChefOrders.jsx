import style from "../ChefOrders/ChefOrders.module.css";
import returnButton from "../../assets/return-button.svg";
import NavigateTo from "../Navigate/Navigate";
import React, { useState, useEffect } from "react";
import { allOrders } from "../../Services/Request";
import iconShowInfo from "../../assets/icon-show-info.svg";
import Delivered from "../Delivered/Delivered";

export default function ChefOrders() {
  const token = localStorage.getItem("token");
  const handleClick = NavigateTo("/admin/dashboard");
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    allOrders(token)
      .then((response) => {
        console.log("Response allOrders:", response);
        if (!response.ok) {
          throw new Error("No orders available.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data getProducts:", data);
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

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
    console.log(updateOrder);
    setOrders((orders) =>
      orders.map((order) => {
        if (order.id === updateOrder.id) {
          return {
            ...order,
            status: updateOrder.status,
            dateProcessed: updateOrder.dateProcessed,
          };
        } else {
          return order;
        }
      })
    );
  };

  return (
    <>
      <div className={style.title_section}>
        <div className={style.title}>
          <img src={returnButton} onClick={handleClick} alt="Return" />
          <h2>Active Orders</h2>
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

              function calculateDuration() {
                let total;
                const timeString1 = order.dataEntry;
                const timeString2 = order.dateProcessed;
                const receivedTime = new Date(`1970-01-01T${timeString1}`);
                const deliveredTime = new Date(`1970-01-01T${timeString2}`);
                const duration = Math.floor(
                  (deliveredTime - receivedTime) / 60000
                );
                if (isNaN(duration)) {
                  total = "--";
                } else {
                  total = `${duration} minutes`;
                }
                return total;
              }

              const isExpanded = expandedOrder === order.id;

              return (
                <React.Fragment key={index}>
                  <tr onClick={(event) => handleInfoClick(event, order.id)}>
                    <td>
                      <img src={iconShowInfo} alt="Info" />
                    </td>
                    <td>{order.table}</td>
                    <td>{order.dataEntry}</td>
                    <td>{order.status}</td>
                    <td>{order.dateProcessed}</td>
                    <td>{calculateDuration()}</td>
                    <td>
                      {order.status !== "Delivered" && (
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
                              />
                              <label className={style.label}>
                                {product.name}
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
