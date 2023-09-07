import style from "../DropDownButton/DropDownButton.module.css";
import iconOptions from "../../assets/icon-options.svg";
import { useState } from "react";
import { func } from "prop-types";

export default function DropdownButton({ optionEdit, optionDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModalEdit = () =>{
    optionEdit();
    setIsOpen(!isOpen);
  }
  const toggleModalDelete = () =>{
    optionDelete();
    setIsOpen(!isOpen);
  }

  return (
    <div className={style.dropdown}>
      <img
        src={iconOptions}
        className={style.options}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className={style.content}>
          <span className={style.btn_options} onClick={toggleModalEdit}>
            Edit
          </span>
          <span className={style.btn_options} onClick={toggleModalDelete}>
            Delete
          </span>
        </div>
      )}
    </div>
  );
}

DropdownButton.propTypes = {
  optionEdit: func.isRequired,
  optionDelete: func.isRequired,
};
