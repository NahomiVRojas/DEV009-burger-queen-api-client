import { useState } from "react";
import { number, string, func } from "prop-types";
import style from "../ModalEdit/ModalEdit.module.css";
import { editProduct } from "../../Services/Request";

export default function ModalEdit({ id, name, type, price, onClose, token, onEditSuccess }) {
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
            console.error("Error al editar el producto")
        }
    })
    .catch((error) => {
        console.error("Error al realizar la solicitud de edición", error);
    });
}

  return (
    <>
      <div className={`modal ${style.modal}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className={`modal-body ${style.modal_body}`}>
              <form>
                <label>ID</label>
                <br />
                <input
                  className={style.inputs}
                  value={id}
                  type="number"
                  readOnly
                />
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
                <input
                  className={style.inputs}
                  value={editedType}
                  type="text"
                  onChange={(e) => setEditedType(e.target.value)}
                />
                <br />
                <label>Price</label>
                <br />
                <input
                  className={style.inputs}
                  value={editedPrice}
                  type="text"
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={`btn btn-secondary ${style.btn_cancel}`}
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn btn-primary ${style.btn_save}`}
                onClick={editProductById}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ModalEdit.propTypes = {
  id: number.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  price: number.isRequired,
  onClose: func.isRequired,
  token: string.isRequired,
  onEditSuccess: func.isRequired
};