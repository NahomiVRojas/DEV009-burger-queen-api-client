import style from "../ManageProductsTable/ManageProductsTable.module.css";
import iconOptions from "../../assets/icon-options.svg";
import { users } from "../../Services/Request";
import { useEffect, useState } from "react";
import NavigateTo from "../Navigate/Navigate";
import returnButton from '../../assets/return-button.svg';

export default function ManageProductsTable() {

    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        users(token)
            .then((response) => {
                console.log('Response Users:', response)
                if (!response.ok) {
                    throw new Error('Usuarios no existen');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setDataUsers(data)
            })
    }, []);

    const handleClick = NavigateTo("/main/dashboard");

    return (
        <>
            <div className={style.title_section}>
                <img src={returnButton} onClick={handleClick} />
                <h2>Manage Users</h2>
            </div>
            <div className={`table-responsive ${style.responsive}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Position</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataUsers.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>{val.role}</td>
                                    <td>{val.email}</td>
                                    <td>{val.password}</td>
                                    <td><img src={iconOptions} className={style.options} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
