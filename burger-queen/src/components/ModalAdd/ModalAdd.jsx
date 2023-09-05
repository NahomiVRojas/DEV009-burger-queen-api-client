import style from "../ModalAdd/ModalAdd.module.css";
import { func } from "prop-types";

export default function ModalAdd({ onClose }) {
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
                            <input type="text" /><br />
                            <label>Product</label><br />
                            <input type="text" /><br />
                            <label>Menu</label><br />
                            <select>
                                <option>--</option>
                                <option>Breakfast</option>
                                <option>Lunch/Dinner</option>
                            </select><br />
                            <label>Price</label><br />
                            <input type="text" /><br />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className={`btn btn-secondary ${style.btn_cancel}`} data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                        <button type="button" className={`btn btn-primary ${style.btn_add}`}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalAdd.propTypes = {
    onClose: func.isRequired,
};