import style from "./AllOrdersTable.module.css";
import returnButton from "../../assets/return-button.svg";
import NavigateTo from "../Navigate/Navigate";
import { useState, useEffect } from "react";
import { allOrders } from "../../Services/Request";
import { Link } from "react-router-dom";

export default function AllOrders() {
  const token = localStorage.getItem("token");
  const handleClick = NavigateTo("/admin/dashboard");
  const [orders, setOrders] = useState([]);

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

  return (
    <>
      <div className={style.title_section}>
        <div className={style.title}>
          <img src={returnButton} onClick={handleClick} alt="Return" />
          <h2>All Orders</h2>
        </div>
      </div>
      <div className={`table-responsive ${style.responsive}`}>
        <table className="table">
          <thead>
            <tr>
              <th>Table</th>
              <th>Client</th>
              <th>Products</th>
              <th>Received</th>
              <th>Status</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.table}</td>
                <td>{order.client}</td>
                <td>
                  <ul>
                    {order.products.map((product, productIndex) => (
                      <li key={productIndex}>
                        {product.qty}x {product.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.dataEntry}</td>
                <td>{order.status}</td>
                <td>{order.dateProcessed || "-"}</td>
                <td>
                  <Link to={`/waiter/editOrder/${order.id}`} className={style.button}>Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
