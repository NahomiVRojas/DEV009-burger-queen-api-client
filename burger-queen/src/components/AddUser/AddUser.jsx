import { useState } from "react";
import { string, func } from "prop-types";
import { addUsers } from "../../Services/Request";
import Modal from "../Modal/Modal.jsx";
import style from "../AddUser/AddUser.module.css";
import exclamationIcon from "../../assets/exclamation-icon.svg";

export default function AddUser({ onClose, token, onAdd }) {
  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addRole, setAddRole] = useState("");
  const [error, setError] = useState(null);

  const data = {
    email: addEmail,
    password: addPassword,
    name: addName,
    role: addRole,
    id: addId,
  };

  function handleAddNewUser() {
    addUsers(data, token)
      .then((response) => {
        if (response.status === 500) {
          setError("ID already in use.");
        } else if (response.status === 400) {
          setError("This email is already in use, or it's invalid.");
        } else {
          return response.json().then((newUserData) => {
            if (newUserData.user) {
              onAdd(newUserData.user);
            }
            onClose();
          });
        }
      })
      .catch((error) => {
        console.error("Error in handleAddNewUser:", error);
        setError("An error occurred while adding the user.");
      });
  }

  return (
    <Modal
      onClose={onClose}
      title="Add User"
      action={handleAddNewUser}
      nameAction="Add"
    >
      <div>
        <div>
          <label>ID</label>
          <input
            type="text"
            value={addId}
            data-testid="id_user"
            onChange={(e) => setAddId(e.target.value)}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={addName}
            data-testid="name_user"
            onChange={(e) => setAddName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={addEmail}
            data-testid="email_user"
            onChange={(e) => setAddEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={addPassword}
            data-testid="password_user"
            onChange={(e) => setAddPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Role</label>
        <select
          value={addRole}
          data-testid="role_user"
          onChange={(e) => setAddRole(e.target.value)}
        >
          <option>--</option>
          <option value="Admin">Admin</option>
          <option value="Chef">Chef</option>
          <option value="Waiter/Waitress">Waiter/Waitress</option>
        </select>
      </div>
      {error && (
        <div className={style.error_message}>
          <img src={exclamationIcon} className={style.icon} />
          <span className={style.error} data-testid="error_message">
            {error}
          </span>
        </div>
      )}
    </Modal>
  );
}

AddUser.propTypes = {
  onClose: func.isRequired,
  token: string.isRequired,
  onAdd: func.isRequired,
};
