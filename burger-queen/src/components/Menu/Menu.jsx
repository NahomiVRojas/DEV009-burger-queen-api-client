import { useState, useEffect } from "react";
import style from "../Menu/Menu.module.css";
import { products } from "../../Services/Request";
import { func } from "prop-types";

export default function Menu({ handleAddToSelectedItems }) {
  const token = localStorage.getItem("token");
  const [allProducts, setAllProducts] = useState([]);
  const [menuType, setMenuType] = useState("Breakfast");

  useEffect(() => {
    products(token)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No existe productos");
        }
        return response.json();
      })
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleMenuClick = (menu) => {
    setMenuType(menu);
  };

  return (
    <>
      <div>
        <button
          className={
            menuType === "Breakfast"
              ? `${style.button} ${style.active}`
              : style.button
          }
          onClick={() => handleMenuClick("Breakfast")}
        >
          Breakfast
        </button>
        <button
          className={
            menuType === "Lunch/Dinner"
              ? `${style.button} ${style.active}`
              : style.button
          }
          onClick={() => handleMenuClick("Lunch/Dinner")}
        >
          Lunch/Dinner
        </button>
      </div>
      <div className={style.table}>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
            {allProducts
              .filter((product) =>
                menuType === "Breakfast"
                  ? product.type === "Breakfast"
                  : product.type === "Lunch/Dinner"
              )
              .map((val, key) => (
                <tr key={key} className={style.items} onClick={() => handleAddToSelectedItems(val)}>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                </tr>
              ))}
          </thead>
        </table>
      </div>
    </>
  );
}

Menu.propTypes = {
  handleAddToSelectedItems: func.isRequired,
};
