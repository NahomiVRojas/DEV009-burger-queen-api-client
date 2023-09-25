import { deleteProduct } from "../../Services/Request";
import { func, string } from "prop-types";
import Modal from "../Modal/Modal";

export default function DeleteProduct({ id, token, onClose,  onDelete }) {

    function deleteProductById() {
        deleteProduct(id, token)
            .then((response) => {
                if (response.ok) {
                    onClose();
                    onDelete(id);
                } else {
                    console.error(response.status);
                }
            })
    }

    return (
        <>
            <Modal onClose={onClose} title="Delete Product" action={deleteProductById} nameAction="Yes, delete it.">
                <div>
                    <span>Do you want to delete this product?</span>
                </div>       
            </Modal>
        </>
    );
}

DeleteProduct.propTypes = {
    id: string.isRequired,
    token: string.isRequired,
    onClose: func.isRequired,
    onDelete: func.isRequired
};