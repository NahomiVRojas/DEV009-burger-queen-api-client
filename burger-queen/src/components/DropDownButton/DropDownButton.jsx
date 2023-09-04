import { useState } from "react";
import { number, string } from "prop-types";
import iconOptions from "../../assets/icon-options.svg";
import style from "../DropDownButton/DropDownButton.module.css";
import ModalDelete from "../ModalDelete/modalDelete";

export default function DropdownButton ({ productId, token }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(true);
    };

    const handleDelete = () => {
      setShowModal(true);
    }

    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <div className={style.dropdown}>
        <img src={iconOptions} className={style.options} onClick={toggleDropdown} />
        {isOpen && (
          <div className={style.content}>
            <span>Edit</span>
            <span onClick={handleDelete}>Delete</span>
          </div>
        )}
        {showModal && <ModalDelete productId={productId} token={token} onClose={handleCloseModal} />}
      </div>
    );
  }

DropdownButton.propTypes = {
  productId: number.isRequired,
  token: string.isRequired
}