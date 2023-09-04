import { deleteProduct } from "../../Services/Request";
import { number, string } from "prop-types";
import style from "../ModalDelete/ModalDelete.module.css"

export default function ModalDelete({ productId, token, onClose }) {
    function deleteProductById() {
        deleteProduct(productId, token)
            .then((response) => {
                if (response.status === 'OK') {
                    console.log('Deleted');
                } else {
                    console.error(response.status);
                }
            })
    }

    return (
        <>
            <div className={`modal ${style.modal}`} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className={`modal-body ${style.modal_body}`}>
                            <span>Do you want to delete this product?</span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={`btn btn-secondary ${style.btn_cancel}`} data-bs-dismiss="modal" onClick={onClose}>No</button>
                            <button type="button" className={`btn btn-primary ${style.btn_delete}`} onClick={deleteProductById}>Yes, delete it.</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ModalDelete.propTypes = {
    productId: number.isRequired,
    token: string.isRequired,
    onClose: Boolean.isRequired
};