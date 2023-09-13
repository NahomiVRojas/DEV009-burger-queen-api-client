import style from "../Modal/Modal.module.css";
import { func, node, string } from "prop-types";

export default function Modal({
  title,
  onClose,
  children,
  action,
  nameAction,
}) {
  return (
    <div className={`modal ${style.modal}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div
            className={
              title === "New Product" || title === "Edit Product"
                ? style.modal_product
                : title === "Add User" || title === "Edit User"
                ? style.modal_user
                : "modal-body"
            }
          >
            {children}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className={`btn btn-secondary ${style.btn_cancel}`}
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-primary ${style.btn_add}`}
              onClick={action}
            >
              {nameAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: func.isRequired,
  title: string.isRequired,
  children: node.isRequired,
  action: func.isRequired,
  nameAction: string.isRequired,
};
