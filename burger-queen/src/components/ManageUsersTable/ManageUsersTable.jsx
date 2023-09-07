import style from "../ManageProductsTable/ManageProductsTable.module.css";
import { users } from "../../Services/Request";
import { useEffect, useState } from "react";
import NavigateTo from "../Navigate/Navigate";
import returnButton from "../../assets/return-button.svg";
import iconAddUser from "../../assets/icon-add-user.svg";
import DropdownButton from "../DropDownButton/DropDownButton";
import AddUser from "../AddUser/AddUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import EditUser from "../EditUsers/EditaUsers";

export default function ManageUsersTable() {
    const token = localStorage.getItem("token");
    const [allUsers, setAllUsers] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModals, setShowModals] = useState({});

    const handleOpenModal = () => {
        setShowModalAdd(true);
    };

    const handleCloseModal = () => {
        setShowModalAdd(false);
    };

    const handleOpenDelete = () => {
        setShowModalDelete(true);
    };

    const handleCloseDelete = () => {
        setShowModalDelete(false);
    };

    const handleOpenEdit = (userId) => {
        setShowModals((prevModals) => ({
            ...prevModals,
            [userId]: true, // Set the modal for the specified user to true
        }));
    };

    const handleCloseEdit = (userId) => {
        setShowModals((prevModals) => ({
            ...prevModals,
            [userId]: false, // Set the modal for the specified user to false
        }));
    };

    const handleAddNewUser = (newUserData) => {
        setAllUsers((currentUsers) => [...currentUsers, newUserData]);
        setShowModalAdd(false);
    };

    const handleUpdateUser = (newUserData) => {
        console.log("Actualizando usuario:", newUserData);
        setAllUsers((data) =>
            data.map((user) => (user.id === newUserData.id ? newUserData : user))
        );
    };

    const handleDeleteUser = (userId) => {
        setAllUsers((currentUsers) =>
            currentUsers.filter((user) => user.id !== userId)
        );
    };

    useEffect(() => {
        users(token)
            .then((response) => {
                console.log("Response Users:", response);
                if (!response.ok) {
                    throw new Error("Usuarios no existen");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setAllUsers(data);
                return data;
            });
    }, [token]);

    const handleClick = NavigateTo("/admin/dashboard");

    return (
        <>
            <div className={style.title_section}>
                <div className={style.title}>
                    <img src={returnButton} onClick={handleClick} />
                    <h2>Manage Users</h2>
                </div>
                <img src={iconAddUser} onClick={handleOpenModal}></img>
                {showModalAdd && (
                    <AddUser
                        onClose={handleCloseModal}
                        token={token}
                        onAdd={handleAddNewUser}
                    />
                )}
            </div>
            <div className={`table-responsive ${style.responsive}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
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
                                    <td>{val.role}</td>
                                    <td>
                                        <DropdownButton
                                            optionEdit={() => handleOpenEdit(val.id)} // Pass the user ID
                                            optionDelete={handleOpenDelete}
                                        />
                                        {showModals[val.id] && ( // Use showModals[val.id] to determine visibility
                                            <EditUser
                                                id={val.id}
                                                name={val.name}
                                                email={val.email}
                                                password={val.password}
                                                role={val.role}
                                                token={token}
                                                onClose={() => handleCloseEdit(val.id)} // Pass the user ID
                                                onEdit={handleUpdateUser}
                                            />
                                        )}
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
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
