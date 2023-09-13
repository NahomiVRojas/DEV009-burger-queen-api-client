import { useState } from "react";
import { string, func } from "prop-types";
import { addUsers } from "../../Services/Request";
import Modal from "../Modal/Modal.jsx";

export default function AddUser({ onClose, token, onAdd }) {
  const [addId, setAddId] = useState("");
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addRole, setAddRole] = useState("");

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
        if (response.ok) {
          console.log("Usuario agregado con éxito", data);
        }
        return response.json();
      })
      .then((newUserData) => {
        console.log("New user data:", newUserData.user);
        onAdd(newUserData.user);
        onClose();
        return newUserData.user;
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud de edición", error);
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
            onChange={(e) => setAddId(e.target.value)}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={addEmail}
            onChange={(e) => setAddEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={addPassword}
            onChange={(e) => setAddPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Role</label>
        <select value={addRole} onChange={(e) => setAddRole(e.target.value)}>
          <option>--</option>
          <option value="Admin">Admin</option>
          <option value="Chef">Chef</option>
          <option value="Waiter/Waitress">Waiter/Waitress</option>
        </select>
      </div>
    </Modal>
  );
}

AddUser.propTypes = {
  onClose: func.isRequired,
  token: string.isRequired,
  onAdd: func.isRequired,
};
