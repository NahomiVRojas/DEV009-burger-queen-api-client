import { patchOrder } from "../../Services/Request";
import Modal from "../Modal/Modal";
import { func, number } from "prop-types";

export default function CheckOut({ onClose, id }) {
    const token = localStorage.getItem("token");

    function checkOutOrder() {

        const updatedOrderData = {
            status: "Closed",
        };

        patchOrder(id, updatedOrderData, token)
            .then((response) => {
                if (response.ok) {
                    console.log("orden cerrada")
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

CheckOut.propTypes ={
    onClose: func.isRequired,
    id: number.isRequired,
}