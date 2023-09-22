import style from "../ManageProductsTable/ManageProductsTable.module.css";
import returnButton from "../../assets/return-button.svg";
import iconAddProduct from "../../assets/icon-add-product.svg";
import NavigateTo from "../Navigate/Navigate";
import { products } from "../../Services/Request";
import { useEffect, useState } from "react";
import DropdownButton from "../DropDownButton/DropDownButton";
import AddProduct from "../AddProduct/AddProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import EditProduct from "../EditProduct/EditProduct";
import Table from "../Table/Table";

export default function ManageProductsTable() {

  const token = localStorage.getItem("token");
  const handleClick = NavigateTo("/admin/dashboard");
  const [allProducts, setAllProducts] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModals, setShowModals] = useState({});
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  function getAllProducts(token) {
    products(token)
      .then((response) => {
        console.log("Response getProducts:", response);
        if (!response.ok) {
          throw new Error("No existe productos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data getProducts:", data);
        setAllProducts(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllProducts(token);
  }, [token]);

  const handleOpenModal = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
  };

  const handleOpenDelete = (id) => {
    setProductIdToDelete(id);
    setShowModalDelete(true);
  };

  const handleCloseDelete = () => {
    setProductIdToDelete(null);
    setShowModalDelete(false);
  };

  const handleDelete = () => {
    getAllProducts(token);
  };

  const handleOpenEdit = (id) => {
    setShowModals((prevModals) => ({ ...prevModals, [id]: true }));
  };

  const handleCloseEdit = (id) => {
    setShowModals((prevModals) => ({ ...prevModals, [id]: false }));
  };

  const addNewProduct = () => {
    setShowModalAdd(false);
    getAllProducts(token);
  };

  const updateProduct = () => {
    getAllProducts(token);
  };

  return (
    <>
      <div className={style.title_section}>
        <div className={style.title}>
          <img src={returnButton} onClick={handleClick} className={style.icons} alt="Return to dashboard" />
          <h1>Manage Products</h1>
        </div>
        <img src={iconAddProduct} onClick={handleOpenModal} className={style.icons} alt="Add new product" />
        {showModalAdd && (
          <AddProduct
            onClose={handleCloseModal}
            token={token}
            onAdd={addNewProduct}
          />
        )}
      </div>
      <Table
        data={allProducts}
        columns={["id", "type", "name", "price"]}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        DropdownButton={DropdownButton}
      />
      {allProducts.map((val, key) => (
        <div key={key}>
          {showModals[val.id] && (
            <EditProduct
              id={val.id}
              name={val.name}
              type={val.type}
              price={Number(val.price)}
              token={token}
              onClose={() => handleCloseEdit(val.id)}
              onEditSuccess={updateProduct}
            />
          )}
          {showModalDelete && (
            <DeleteProduct
              id={productIdToDelete}
              token={token}
              onClose={handleCloseDelete}
              onDelete={handleDelete}
            />
          )}
        </div>
      ))}
    </>
  );
}
