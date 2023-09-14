import { patchOrder } from "../../Services/Request";
import { useState } from "react";
import style from "../../components/Delivered/Delivered.module.css"

export default function Delivered({id}) {
    const token = localStorage.getItem("token");
    const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });
    const [dateProcessed] = useState(currentDateTime);

    function markOrderAsDelivered(orderId) {
        const updatedOrderData = {
            status: "Delivered",
            dateProcessed:dateProcessed,
        };

        patchOrder(orderId, updatedOrderData, token)
            .then((response) => {
                if (response.ok) {
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
        <button className={style.button} onClick={() => markOrderAsDelivered(id)}>Done</button>
    );
}
