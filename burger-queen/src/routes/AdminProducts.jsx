import ManageProductsTable from "../components/ManageProductsTable"
import CurrentDate from "../components/CurrentDate"

export default function AdminProducts(){
    return (
        <>
        <CurrentDate />
        <h2 className="title">Manage Products</h2>
        <ManageProductsTable />
        </>
    )
}
