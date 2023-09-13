import { func, number, string } from "prop-types";
import Modal from "../Modal/Modal";
import { deleteOrder } from "../../Services/Request";

export default function DeleteOrder({ id, token, onClose, onDelete }) {
  function deleteOrderById() {
    deleteOrder(id, token).then((response) => {
      if (response.ok) {
        console.log("Deleted");
        onClose()
        onDelete(id);
      } else {
        console.error(response.status);
      }
    });
  }

  return (
    <>
      <Modal
        onClose={onClose}
        title="Delete Order"
        action={deleteOrderById}
        nameAction="Yes, delete it."
      >
        <div>
          <p>Do you want to delete this order?</p>
        </div>
      </Modal>
    </>
  );
}

DeleteOrder.propTypes = {
  id: number.isRequired,
  token: string.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
};
