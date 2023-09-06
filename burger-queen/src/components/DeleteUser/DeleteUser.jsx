import { deleteUser } from "../../Services/Request";
import { func, number, string } from "prop-types";
import Modal from "../Modal/Modal";

export default function DeleteUser({ id, token, onClose, onDelete }) {
  function deleteUserById() {
    deleteUser(id, token).then((response) => {
      if (response.ok) {
        console.log("Deleted");
        onClose();
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
        title="Delete User"
        action={deleteUserById}
        nameAction="Yes, delete it."
      >
        <div>
          <p>Do you want to delete this user?</p>
        </div>
      </Modal>
    </>
  );
}

DeleteUser.propTypes = {
  id: number.isRequired,
  token: string.isRequired,
  onClose: func.isRequired,
  onDelete: func.isRequired,
};
