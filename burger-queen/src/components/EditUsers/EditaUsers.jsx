import { useState } from "react";
import Modal from "../Modal/Modal";
import style from "../EditProduct/EditProduct.module.css";
import { editUser } from "../../Services/Request";
import { string, func } from "prop-types";

export default function EditUser({ name, email, password, role, id, token, onEdit, onClose}) {

    const [editedName, setEditedName] = useState(name);
    const [editedEmail, setEditedEmail] = useState(email);
    const [editedPassword, setEditedPassword] = useState(password);
    const [editedRole, setEditedRole] = useState(role);

    const data = {
        email: editedEmail,
        password: editedPassword,
        name: editedName,
        role: editedRole,
        id,
    };

    function editUserById() {
        editUser(id, data, token)
            .then((response) => {
                if (response.ok) {
                    console.log("Usuario editado con éxito");
                } else {
                    console.error("Error al editar el usuario");
                }
                return response.json();
            })
            .then((newData) => {
                onClose();
                onEdit(newData);
                return newData;
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud de edición", error);
            });
    }

    return (
        <>
            <Modal
                onClose={onClose}
                title="Edit User"
                action={editUserById}
                nameAction="Save Changes"
            >
                <label>ID</label>
                <br />
                <input className={style.inputs} value={id} type="number" readOnly />
                <br />
                <label>Name</label>
                <br />
                <input
                    className={style.inputs}
                    value={editedName}
                    type="text"
                    onChange={(e) => setEditedName(e.target.value)}
                />
                <br />
                <label>Email</label>
                <br />
                <input
                    className={style.inputs}
                    value={editedEmail}
                    type="text"
                    onChange={(e) => setEditedEmail(e.target.value)}
                />
                <br />
                <label>Password</label>
                <br />
                <input
                    className={style.inputs}
                    value={editedPassword}
                    type="text"
                    onChange={(e) => setEditedPassword(e.target.value)}
                />
                <br />
                <label>Role</label>
                <br />
                <select
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                >
                    <option>--</option>
                    <option value="Admin">Admin</option>
                    <option value="Chef">Chef</option>
                    <option value="Waiter/Waitress">Waiter/Waitress</option>
                </select>
                <br />
            </Modal>
        </>
    );
}

EditUser.propTypes = {
    name: string.isRequired,
    email: string.isRequired,
    password: string.isRequired,
    role: string.isRequired,
    id: string.isRequired,
    onClose: func.isRequired,
    token: string.isRequired,
    onEdit: func.isRequired,
  };
