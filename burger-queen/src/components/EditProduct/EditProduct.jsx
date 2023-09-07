import { useState } from "react";
import { number, string, func } from "prop-types";
import Modal from "../Modal/Modal";
import style from "../EditProduct/EditProduct.module.css";
import { editProduct } from "../../Services/Request";

export default function EditProduct({
  id,
  name,
  type,
  price,
  onClose,
  token,
  onEditSuccess,
}) {
  const [editedName, setEditedName] = useState(name);
  const [editedType, setEditedType] = useState(type);
  const [editedPrice, setEditedPrice] = useState(price);

  const updatedData = {
    id,
    type: editedType,
    name: editedName,
    price: editedPrice,
  };

  function editProductById() {
    editProduct(id, updatedData, token)
      .then((response) => {
        if (response.ok) {
          console.log("Producto editado con éxito");
          onClose();
          onEditSuccess(updatedData);
        } else {
          console.error("Error al editar el producto");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud de edición", error);
      });
  }

  return (
    <>
      <Modal
        onClose={onClose}
        title="Edit Product"
        action={editProductById}
        nameAction="Save Changes"
      >
        <label>ID</label>
        <br />
        <input className={style.inputs} value={id} type="number" readOnly />
        <br />
        <label>Product</label>
        <br />
        <input
          className={style.inputs}
          value={editedName}
          type="text"
          onChange={(e) => setEditedName(e.target.value)}
        />
        <br />
        <label>Menu</label>
        <br />
        <select
          value={editedType}
          onChange={(e) => setEditedType(e.target.value)}
        >
          <option>--</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch/Dinner">Lunch/Dinner</option>
        </select>
        <br />
        <label>Price</label>
        <br />
        <input
          className={style.inputs}
          value={editedPrice}
          type="text"
          onChange={(e) => setEditedPrice(e.target.value)}
        />
      </Modal>
    </>
  );
}

EditProduct.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  price: number.isRequired,
  onClose: func.isRequired,
  token: string.isRequired,
  onEditSuccess: func.isRequired,
};
