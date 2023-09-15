import { patchOrder } from "../../Services/Request";
import style from "../../components/Delivered/Delivered.module.css";
import { func, object } from "prop-types";

export default function Delivered({ order, onEditSuccess }) {
  const token = localStorage.getItem("token");
  const currentDateTime = new Date().toLocaleTimeString([], { hour12: false });

  function markOrderAsDelivered(order) {

    function calculateDuration() {
        const timeString1 = order.dataEntry;
        const timeString2 = currentDateTime;
        const receivedTime = new Date(`1970-01-01T${timeString1}`);
        const deliveredTime = new Date(`1970-01-01T${timeString2}`);
        const differenceInMinutes = (deliveredTime - receivedTime) / (1000 * 60);
      
        return `${Math.floor(differenceInMinutes)} minutes`;
      }
      

    const updatedOrderData = {
      id: order.id,
      dataEntry: order.dataEntry,
      status: "Delivered",
      dateProcessed: currentDateTime,
      duration: calculateDuration(),
    };

    patchOrder(order.id, updatedOrderData, token)
      .then((response) => {
        if (response.ok) {
          onEditSuccess(updatedOrderData);
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
    <button
      className={style.button}
      onClick={() => markOrderAsDelivered(order)}
    >
      Done
    </button>
  );
}

Delivered.propTypes = {
  order: object.isRequired,
  onEditSuccess: func.isRequired,
};
