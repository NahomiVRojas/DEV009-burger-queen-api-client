import { string, func } from "prop-types";
import style from "../Alert/Alert.module.css";
import successIcon from "../../assets/check-circle.svg";
import errorIcon from "../../assets/exclamation-icon.svg";

export default function Alert({ type, message, option, onClose }) {

  const alertStyle = type === "success" ? style.success : style.error;

  return (
    <>
      <div className={`modal ${style.alert}`} tabIndex="-1" data-testid="alert">
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
            <div className={`modal-body ${alertStyle}`}>
              {alertStyle === style.success ?
              <img src={successIcon} className={style.success_icon} alt="Success icon" /> :
              <img src={errorIcon} className={style.error_icon} alt="Error icon" />
              }
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
  type: string.isRequired,
  message: string.isRequired,
  option: string.isRequired,
  onClose: func.isRequired,
};
