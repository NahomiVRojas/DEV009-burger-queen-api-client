import style from "./AllOrdersTable.module.css";
import returnButton from "../../assets/return-button.svg";
import NavigateTo from "../Navigate/Navigate";
import { useState, useEffect } from "react";
import { allOrders } from "../../Services/Request";
import DeleteOrder from "../DeleteOrder/DeleteOrder";
import { Link } from "react-router-dom";
import iconRefresh from "../../assets/icon-refresh.svg";

export default function AllOrders() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const handleClick = NavigateTo("/admin/dashboard");
  const [orders, setOrders] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);

  function getAllOrders(token) {
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
  }

  useEffect(() => {
    getAllOrders(token)
  }, [token]);

  const handleOpenDelete = () => {
    setShowModalDelete(true);
  };

  const handleCloseDelete = () => {
    setShowModalDelete(false);
  };

  const handleDelete = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    handleCloseDelete(); 
  };

  return (
    <>
      <div className={style.title_section}>
        <div className={style.title}>
          <img src={returnButton} onClick={handleClick} alt="Return" />
          <h2>All Orders</h2>
        </div>
        {role === "Waiter/Waitress" ? (
        <div className={style.options}>
          <Link to="/waiter/new" className={style.new_order}>New Order</Link>
          <img src={iconRefresh} alt="Refresh" className= {style.icon_refresh} onClick={() => getAllOrders(token)} />
          </div>
          ) : null}
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
                <td>{order.dateProcessed || "--"}</td>
                <td>
                  {order.status !== "Closed" ? (
                    <Link
                      to={`/waiter/editOrder/${order.id}`}
                      className={style.button}
                    >
                      Update
                    </Link>
                  ) : null}
                  {role === "Admin" || role === "admin" ? (
                    <button  onClick={() => handleOpenDelete(order.id)} className={style.delete}>
                      Delete
                    </button>
                  ) : null}
                  {showModalDelete[order.id] && (
                    <DeleteOrder
                      id={order.id}
                      token={token}
                      onClose={handleCloseDelete}
                      onDelete={handleDelete}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
