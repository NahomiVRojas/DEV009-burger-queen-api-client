import { string, func } from "prop-types";
import style from "../Alert/Alert.module.css";
import burgerError from "../../assets/burger-error.svg";

export default function Alert({ title, message, option, onClose }) {
  return (
    <>
      <div className={`modal ${style.alert}`} tabIndex="-1">
        <div
          className={`modal-dialog modal-dialog-centered ${style.alert_body}`}
        >
          <div className="modal-content">
            <div className={`modal-header ${style.header}`}>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <h3 className={style.title}>{title}</h3>
              <img src={burgerError} className={style.error} />
              <br />
              <span>{message}</span>
            </div>
            <div className={`${style.footer} modal-footer`}>
              <button
                type="button"
                className={`close ${style.close}`}
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">{option}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Alert.propTypes = {
  title: string.isRequired,
  message: string.isRequired,
  option: string.isRequired,
  onClose: func.isRequired,
};
