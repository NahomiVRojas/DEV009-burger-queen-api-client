import style from "./AllOrdersTable.module.css";
export default function AllOrders() {
    return (
        <>
            <div className={style.title_section}>
                <div className={style.title}>
                    <h2>All Orders</h2>
                </div>
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
                    </tbody>
                </table>
            </div>
        </>
    )
}