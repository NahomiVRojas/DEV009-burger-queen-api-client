import style from "./AllOrdersTable.module.css";
import returnButton from "../../assets/return-button.svg";
import NavigateTo from "../Navigate/Navigate";
import { useState, useEffect } from "react";
import { allOrders } from "../../Services/Request";

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
              <th>ID</th>
              <th>Client</th>
              <th>Products</th>
              <th>Received At</th>
              <th>Status</th>
              <th>Delivered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.product.id}>
                        {product.qty}x {product.product.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.dataEntry}</td>
                <td>{order.status}</td>
                <td>{order.dateProcessed || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
