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
  const handleClick = NavigateTo("/admin/dashboard");

  const [allUsers, setAllUsers] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModals, setShowModals] = useState({});
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  function getAllUsers(token) {
    users(token)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      setAllUsers(data);
      return data;
    });
  }

  useEffect(() => {
    getAllUsers(token)
  }, [token]);


  const handleOpenModal = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
  };

  const handleOpenDelete = (id) => {
    setUserIdToDelete(id);
    setShowModalDelete(true);
  };

  const handleCloseDelete = () => {
    setUserIdToDelete(null);
    setShowModalDelete(false);
  };

  const handleDeleteUser = () => {
    getAllUsers(token);
  };

  const handleOpenEdit = (userId) => {
    setShowModals((prevModals) => ({ ...prevModals, [userId]: true }));
  };

  const handleCloseEdit = (userId) => {
    setShowModals((prevModals) => ({ ...prevModals, [userId]: false }));
  };

  const handleUpdateUser = () => {
    getAllUsers(token);
  };

  const handleAddNewUser = () => {
    getAllUsers(token);
    setShowModalAdd(false);
  };

  return (
    <>
      <div className={style.title_section}>
        <div className={style.title}>
          <img src={returnButton} onClick={handleClick} className={style.icons} alt="Return" />
          <h1>Manage Users</h1>
        </div>
        <img src={iconAddUser} onClick={handleOpenModal} className={style.icons} alt="Icon add user" />
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
              id={userIdToDelete}
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
