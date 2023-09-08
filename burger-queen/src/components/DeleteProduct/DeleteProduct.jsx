import { deleteProduct } from "../../Services/Request";
import { func, string } from "prop-types";
import Modal from "../Modal/Modal";

export default function DeleteProduct({ id, token, onClose,  onDelete }) {
    function deleteProductById() {
        deleteProduct(id, token)
            .then((response) => {
                if (response.ok) {
                    console.log('Deleted');
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
                    <p>Do you want to delete this product?</p>
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