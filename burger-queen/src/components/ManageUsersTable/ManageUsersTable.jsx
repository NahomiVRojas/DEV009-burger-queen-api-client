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
import Table from "../Table/Table";

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
      [userId]: true,
    }));
  };

  const handleCloseEdit = (userId) => {
    setShowModals((prevModals) => ({
      ...prevModals,
      [userId]: false,
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
      <Table
        data={allUsers}
        columns={["id", "name", "email", "role"]}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        DropdownButton={DropdownButton}
      />
      {allUsers.map((val, key) => (
        <div key={key}>
          {showModals[val.id] && (
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
        </div>
      ))}
    </>
  );
}
