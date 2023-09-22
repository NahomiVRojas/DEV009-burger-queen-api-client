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
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);

  function getAllOrders(token) {
    allOrders(token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllOrders(token);
  }, [token]);

  const handleOpenDelete = (id) => {
    setOrderIdToDelete(id);
    setShowModalDelete(true);
  };

  const handleCloseDelete = () => {
    setOrderIdToDelete(null);
    setShowModalDelete(false);
  };

  const handleDelete = () => {
    if (orderIdToDelete) {
      const updatedOrders = orders.filter(
        (order) => order.id !== orderIdToDelete
      );
      setOrders(updatedOrders);
      handleCloseDelete();
    }
  };

  return (
    <>
      <div className={style.title_section}>
        <div className={style.title}>
          <img src={returnButton} onClick={handleClick} alt="Return" className={style.icon_return} />
          <h1>All Orders</h1>
        </div>
        <div className={style.options}>
          {role === "Waiter/Waitress" ? (

            <Link to="/waiter/new" className={style.new_order}>
              New Order
            </Link>
          ) : null}
          <img
            src={iconRefresh}
            alt="Refresh"
            data-testid="refresh_icon"
            className={style.icon_refresh}
            onClick={() => getAllOrders(token)}
          />
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td data-testid={`table_cell_${order.id}`}>{order.table}</td>
                <td data-testid={`client_cell_${order.id}`}>{order.client}</td>
                <td>
                  <ul>
                    {order.products.map((product, productIndex) => (
                      <li key={productIndex}>
                        {product.qty}x {product.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td data-testid={`data_entry_cell_${order.id}`}>
                  {order.dataEntry}
                </td>
                <td data-testid={`status_cell_${order.id}`}>{order.status}</td>
                <td data-testid={`dateProcessed_cell_${order.id}`}>
                  {order.dateProcessed || "--"}
                </td>
                <td>
                  {order.status !== "Closed" ? (
                    <Link
                      to={`/waiter/editOrder/${order.id}`}
                      data-testid={`update_link-${order.id}`}
                      className={style.button}
                    >
                      Update
                    </Link>
                  ) : null}
                  {role === "Admin" || role === "admin" ? (
                    <button
                      onClick={() => handleOpenDelete(order.id)}
                      data-testid="delete_button"
                      className={style.delete}
                    >
                      Delete
                    </button>
                  ) : null}
                  {showModalDelete && (
                    <DeleteOrder
                      id={orderIdToDelete}
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
