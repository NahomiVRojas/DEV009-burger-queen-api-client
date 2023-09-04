import { useState } from "react";
import iconOptions from "../../assets/icon-options.svg";
import style from "../DropDownButton/DropDownButton.module.css";

export default function DropdownButton () {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={style.dropdown}>
        <button onClick={toggleDropdown}><img src={iconOptions} className={style.options} /></button>
        {isOpen && (
          <div className={style.content}>
            <span>Edit</span>
            <span>Delete</span>
          </div>
        )}
      </div>
    );
  }
