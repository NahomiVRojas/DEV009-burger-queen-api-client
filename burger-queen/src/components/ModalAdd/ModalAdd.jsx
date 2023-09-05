import { useState } from "react";
import style from "../ModalAdd/ModalAdd.module.css";
import { func, string } from "prop-types";
import { addProduct } from "../../Services/Request";

export default function ModalAdd({ onClose, token, onAddSuccess }) {
    const [addId, setAddId] = useState('');
    const [addName, setAddName] = useState('');
    const [addType, setAddType] = useState('');
    const [addPrice, setAddPrice] = useState('');

    const data = {
        id: addId,
        name: addName,
        price: addPrice,
        type: addType,
    }

    function addNewProduct() {
        addProduct(data, token)
            .then((response) => {
                if (response.ok) {
                    console.log("Producto agregado con éxito");
                }
                return response.json();
            })
            .then((product) => {
                console.log(product)
                onAddSuccess(product);
                onClose();
                return product
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud de edición", error);
            })
    }

    return (
        <div className={`modal ${style.modal}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">New Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className={`modal-body ${style.modal_body}`}>
                        <form>
                            <label>ID</label><br />
                            <input
                                type="text"
                                value={addId}
                                onChange={(e) => setAddId(e.target.value)}
                            /><br />
                            <label>Product</label><br />
                            <input
                                type="text"
                                value={addName}
                                onChange={(e) => setAddName(e.target.value)}
                            /><br />
                            <label>Menu</label><br />
                            <select
                                value={addType}
                                onChange={(e) => setAddType(e.target.value)}
                            >
                                <option>--</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch/Dinner">Lunch/Dinner</option>
                            </select><br />
                            <label>Price</label><br />
                            <input
                                type="text"
                                value={addPrice}
                                onChange={(e) => setAddPrice(e.target.value)}
                            /><br />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className={`btn btn-secondary ${style.btn_cancel}`} data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                        <button type="button" className={`btn btn-primary ${style.btn_add}`} onClick={addNewProduct}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalAdd.propTypes = {
    onClose: func.isRequired,
    token: string.isRequired,
    onAddSuccess: func.isRequired,
};