import style from "../ManageProductsTable/ManageProductsTable.module.css";
import returnButton from '../../assets/return-button.svg';
import iconAddProduct from '../../assets/icon-add-product.svg';
import NavigateTo from "../Navigate/Navigate";
import { products } from "../../Services/Request";
import { useEffect, useState } from 'react';
import DropdownButton from "../DropDownButton/DropDownButton";
import AddProduct from "../AddProduct/AddProduct";

export default function ManageProductsTable() {
    const token = localStorage.getItem('token');
    const [allProducts, setAllProducts] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);

    const handleOpenModal = () => {
        setShowModalAdd(true);
    };

    const handleCloseModal = () => {
        setShowModalAdd(false);
    };

    const addNewProduct = (newProductData) => {
        setAllProducts((prevProducts) => [...prevProducts, newProductData]);
        setShowModalAdd(false); 
    };    

    const updateProduct = (updatedProductData) => {
        console.log("Actualizando producto:", updatedProductData);
        setAllProducts((data) =>
          data.map((product) =>
            product.id === updatedProductData.id ? updatedProductData : product
          )
        );
    };

    const handleDeleteSuccess = (productId) => {
        setAllProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    };

    useEffect(() => {
        products(token)
            .then((response) => {
                console.log('Response getProducts:', response)
                if (!response.ok) {
                    throw new Error('No existe productos')
                }
                return response.json();
            })
            .then((data) => {
                console.log('Data getProducts:', data);
                setAllProducts(data)
                return data
            })
            .catch((error) => {
                console.log(error)
            });
    }, [token]);

    const handleClick = NavigateTo("/main/dashboard");

    return (
        <>
            <div className={style.title_section}>
                <div className={style.title}>
                    <img src={returnButton} onClick={handleClick} />
                    <h2>Manage Products</h2>
                </div>
                <img src={iconAddProduct} onClick={handleOpenModal}></img>
                {showModalAdd && <AddProduct onClose={handleCloseModal} token={token} onAdd={addNewProduct} />}
            </div>
            <div className={`table-responsive ${style.responsive}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Menu</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((val, key) => (
                            <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.type}</td>
                                <td>{val.name}</td>
                                <td>{Number(val.price)}</td>
                                <td>
                                    <DropdownButton
                                        id={val.id}
                                        type={val.type}
                                        name={val.name}
                                        price={Number(val.price)}
                                        token={token}
                                        onEditSuccess={updateProduct}
                                        onDeleteSuccess={handleDeleteSuccess}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
