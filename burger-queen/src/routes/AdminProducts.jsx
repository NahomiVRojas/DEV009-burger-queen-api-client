import ManageProductsTable from "../components/ManageProductsTable/ManageProductsTable"
import CurrentDate from "../components/CurrentDate/CurrentDate"

export default function AdminProducts(){
    return (
        <>
        <CurrentDate />
        <h2 className="title">Manage Products</h2>
        <ManageProductsTable />
        </>
    )
}
