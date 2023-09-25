import { useState } from "react";
import { string, func } from "prop-types";
import { addProduct } from "../../Services/Request";
import Modal from "../Modal/Modal.jsx";
import style from "../AddProduct/AddProduct.module.css";
import exclamationIcon from "../../assets/exclamation-icon.svg";

export default function AddProduct({ onClose, token, onAdd }) {
  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addType, setAddType] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [error, setError] = useState("");

  const data = {
    id: addId,
    name: addName,
    price: addPrice,
    type: addType,
  };

  function addNewProduct() {
    addProduct(data, token)
      .then((response) => {
        if (response.status === 500) {
          setError("ID already in use");
        }
        return response.json();
      })
      .then((product) => {
        onAdd(product);
        onClose();
        return product;
      })
      .catch(() => {
        setError("An error occurred while adding the user.");
      });
  }

  return (
    <Modal
      onClose={onClose}
      title="New Product"
      action={addNewProduct}
      nameAction="Add"
    >
      <div>
        <label>ID</label>
        <input
          type="text"
          value={addId}
          data-testid="id_product"
          onChange={(e) => setAddId(e.target.value)}
        />
        {error && (
          <div className={style.error_message}>
            <img src={exclamationIcon} className={style.icon} alt="Error" />
            <span className={style.error} data-testid="error_message">
              {error}
            </span>
          </div>
        )}
      </div>
      <div>
        <label>Product</label>
        <input
          type="text"
          value={addName}
          data-testid="name_product"
          onChange={(e) => setAddName(e.target.value)}
        />
      </div>
      <div>
        <label>Menu</label>
        <select
          value={addType}
          data-testid="menu_product"
          onChange={(e) => setAddType(e.target.value)}
        >
          <option>--</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch/Dinner">Lunch/Dinner</option>
        </select>
      </div>
      <div>
        <label>Price</label>
        <input
          type="text"
          value={addPrice}
          data-testid="price_product"
          onChange={(e) => setAddPrice(e.target.value)}
        />
      </div>
    </Modal>
  );
}

AddProduct.propTypes = {
  onClose: func.isRequired,
  token: string.isRequired,
  onAdd: func.isRequired,
};
