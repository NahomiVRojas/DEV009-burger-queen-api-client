import style from "../ManageProductsTable/ManageProductsTable.module.css";
import iconOptions from "../../assets/icon-options.svg";

const fakeData = [
    { user: "Mafe", position: "Waitress", email: "mafe@bq.com", password: "123456" },
    { user: "Nahomi", position: "Chef", email: "naho@bq.com", password: "123456" },
    { user: "Andressa", position: "Admin", email: "andre@bq.com", password: "123456" },
]

export default function ManageProductsTable(){
    return (
        <>
        <h2 className={style.title}>Manage Users</h2>
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
                {fakeData.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.user}</td>
                            <td>{val.position}</td>
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