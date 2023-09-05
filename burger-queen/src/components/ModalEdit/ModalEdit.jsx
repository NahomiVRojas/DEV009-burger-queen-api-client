import { number, string } from "prop-types";
import style from "../ModalEdit/ModalEdit.module.css";

export default function ModalEdit({ id, name, type, price, onClose }) {
    return (
        <>
        <div className={`modal ${style.modal}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className={`modal-body ${style.modal_body}`}>
                        <form>
                            <label>ID</label><br />
                            <input className={style.inputs} value={id} type="text" /><br />
                            <label>Product</label><br />
                            <input className={style.inputs} value={name} type="text" /><br />
                            <label>Menu</label><br />
                            <input className={style.inputs} value={type} type="text" /><br />
                            <label>Price</label><br />
                            <input className={style.inputs} value={price} type="number" />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className={`btn btn-secondary ${style.btn_cancel}`} data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                        <button type="button" className={`btn btn-primary ${style.btn_save}`}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

ModalEdit.propTypes = {
    id: number.isRequired,
    type: string.isRequired,
    name: string.isRequired,
    price: number.isRequired,
    onClose: Boolean.isRequired
};