import { patchOrder } from "../../Services/Request";
import { useState } from "react";
import style from "../../components/Delivered/Delivered.module.css";
import { func, object} from "prop-types";

export default function Delivered({order, onEditSuccess }) {
    const token = localStorage.getItem("token");
    const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });
    const [dateProcessed] = useState(currentDateTime);

    function markOrderAsDelivered(order) {
        const updatedOrderData = {
            id:order.id,
            status: "Delivered",
            dateProcessed:dateProcessed,
        };

        patchOrder(order.id, updatedOrderData, token)
            .then((response) => {
                if (response.ok) {
                    onEditSuccess(updatedOrderData)
                    console.log("Orden marcada como entregada");
                } else {
                    console.error("Error al marcar la orden como entregada");
                }
                return response.json();
            })
            .catch((error) => {
                console.error(
                    "Error al realizar la solicitud para marcar como entregada",
                    error
                );
            });
    }

    return (
        <button className={style.button} onClick={() => markOrderAsDelivered(order)}>Done</button>
    );
}

Delivered.propTypes = {
 order: object.isRequired,
 onEditSuccess:func.isRequired
}
