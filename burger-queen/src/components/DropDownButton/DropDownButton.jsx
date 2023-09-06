import style from "../DropDownButton/DropDownButton.module.css";
import iconOptions from "../../assets/icon-options.svg";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import ModalEdit from "../EditProduct/EditProduct";
import { useState } from "react";
import { number, string, func } from "prop-types";

export default function DropdownButton({ id, name, type, price, token, onEditSuccess, onDeleteSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleDelete = () => {
        setShowModalDelete(true);
        setIsOpen(false); // Cierra el menú desplegable
    };

    const handleEdit = () => {
        setShowModalEdit(true);
        setIsOpen(false); // Cierra el menú desplegable
    };

    const handleCloseModal = () => {
        setShowModalDelete(false);
        setShowModalEdit(false);
    };

    return (
        <div className={style.dropdown}>
            <img src={iconOptions} className={style.options} onClick={toggleDropdown} />
            {isOpen && (
                <div className={style.content}>
                    <span className={style.btn_options} onClick={handleEdit}>Edit</span>
                    <span className={style.btn_options} onClick={handleDelete}>Delete</span>
                </div>
            )}
            {showModalDelete && (
                <DeleteProduct
                    id= {id} 
                    token={token} 
                    onClose={handleCloseModal}
                    onDeleteSuccess={onDeleteSuccess}
                />
              )}
            {showModalEdit && (
                <ModalEdit
                    id={id}
                    name={name}
                    type={type}
                    price={price}
                    token={token}
                    onClose={handleCloseModal}
                    onEditSuccess={onEditSuccess} 
                />
            )}
        </div>
    );
}

DropdownButton.propTypes = {
    id: string.isRequired,
    type: string.isRequired,
    name: string.isRequired,
    price: number.isRequired,
    token: string.isRequired,
    onEditSuccess: func.isRequired,
    onDeleteSuccess: func.isRequired,
};
