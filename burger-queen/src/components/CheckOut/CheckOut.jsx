import { patchOrder } from "../../Services/Request";
import Modal from "../Modal/Modal";
import { func, number } from "prop-types";
import NavigateTo from "../Navigate/Navigate";

export default function CheckOut({ onClose, id }) {
    const token = localStorage.getItem("token");

    const navigateToOrders = NavigateTo("/waiter/orders");

    function checkOutOrder() {

        const updatedOrderData = {
            status: "Closed",
        };

        patchOrder(id, updatedOrderData, token)
            .then((response) => {
                if (response.ok) {
                    console.log("orden cerrada");
                    navigateToOrders();
                } else {
                    console.error("Error al cerrar la orden");
                }
                return response.json();
            })
            .then((newData) => {
                console.log(newData.status)
                onClose()
                return newData;
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud de cierre", error);
            });
    }

    return (
        <>
            <Modal
                onClose={onClose}
                title="CheckOut"
                action={checkOutOrder}
                nameAction="Yes"
            >
                <span>Would you like to check out this order?</span>
            </Modal>
        </>
    )
}

CheckOut.propTypes = {
    onClose: func.isRequired,
    id: number.isRequired,
}