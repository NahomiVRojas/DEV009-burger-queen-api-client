import style from "../ManageProductsTable/ManageProductsTable.module.css";
import { users } from "../../Services/Request";
import { useEffect, useState } from "react";
import { func, string } from "prop-types";
import NavigateTo from "../Navigate/Navigate";
import returnButton from '../../assets/return-button.svg';
import iconAddUser from "../../assets/icon-add-user.svg";
import iconDelete from "../../assets/icon-delete.svg";
import iconEdit from "../../assets/icon-edit.svg";
import AddUser from "../AddUser/AddUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import EditUser from "../EditUsers/EditaUsers";

export default function ManageUsersTable() {
    const token = localStorage.getItem('token');
    const [allUsers, setAllUsers] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const handleOpenModal = () => {
        setShowModalAdd(true);
    };

    const handleCloseModal = () => {
        setShowModalAdd(false);
    };

    const handleOpenDelete = () => {
        setShowModalDelete(true);
    }

    const handleCloseDelete = () => {
        setShowModalDelete(false);
    }

    const handleOpenEdit = () => {
        setShowModalEdit(true);
    }

    const handleCloseEdit = () => {
        setShowModalEdit(false);
    }

    const handleAddNewUser = (newUserData) => {
        setAllUsers((currentUsers) => [...currentUsers, newUserData]);
        setShowModalAdd(false);
    };

    const handleUpdateUser = (newUserData) => {
        console.log("Actualizando producto:", newUserData);
        setAllUsers((data) =>
            data.map((user) =>
                user.id === newUserData.id ? newUserData : user
            )
        );
    };

    const handleDeleteUser = (userId) => {
        setAllUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
    };

    useEffect(() => {
        users(token)
            .then((response) => {
                console.log('Response Users:', response)
                if (!response.ok) {
                    throw new Error('Usuarios no existen');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setAllUsers(data)
                return data
            })
    }, [token]);

    const handleClick = NavigateTo("/main/dashboard");

    return (
        <>
            <div className={style.title_section}>
                <div className={style.title}>
                    <img src={returnButton} onClick={handleClick} />
                    <h2>Manage Users</h2>
                </div>
                <img src={iconAddUser} onClick={handleOpenModal}></img>
                {showModalAdd && <AddUser onClose={handleCloseModal} token={token} onAdd={handleAddNewUser} />}
            </div>
            <div className={`table-responsive ${style.responsive}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.password}</td>
                                    <td>{val.role}</td>
                                    <td>
                                        <img src={iconEdit} className={style.options} onClick={handleOpenEdit} />
                                        {showModalEdit && (
                                            <EditUser
                                                id={val.id}
                                                name={val.name}
                                                email={val.email}
                                                password={val.password}
                                                role={val.role}
                                                token={token}
                                                onClose={handleCloseEdit}
                                                onEdit={handleUpdateUser}
                                            />
                                        )}
                                        <img src={iconDelete} className={style.options} onClick={handleOpenDelete} />
                                        {showModalDelete && (
                                            <DeleteUser
                                                id={val.id}
                                                token={token}
                                                onClose={handleCloseDelete}
                                                onDelete={handleDeleteUser}
                                            />
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

ManageUsersTable.propTypes = {
    id: string.isRequired,
    token: string.isRequired,
    onDeleteSuccess: func.isRequired,
};