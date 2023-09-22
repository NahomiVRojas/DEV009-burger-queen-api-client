import style from "../DropDownButton/DropDownButton.module.css";
import iconOptions from "../../assets/icon-options.svg";
import { useState, useEffect, useRef } from "react";
import { func } from "prop-types";

export default function DropdownButton({ optionEdit, optionDelete }) {

  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleModalEdit = () => {
    optionEdit();
    setIsOpen(false);
  };

  const toggleModalDelete = () => {
    optionDelete();
    setIsOpen(false);
  };

  // Agregar un efecto para detectar clics en cualquier lugar de la página
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Agregar el controlador de eventos al documento cuando el menú está abierto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Limpiar el controlador de eventos cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropDownRef} className={style.dropdown}>
      <img
        src={iconOptions}
        className={style.options}
        onClick={toggleDropdown}
        alt="Options menu"
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
