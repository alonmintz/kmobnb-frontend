import { Modal } from "../../cmps/general/Modal";
import { userActions } from "../../store/actions/user.actions";

export function LoginSignupModal({ onClose }) {

  return (
    <Modal isBackdrop onClose={() => onClose()}>
      <div className="login-modal">
        <button className="modal-button" onClick={() => userActions.login({ username: "muki" })}>Login as demo guest</button>
      </div>
    </Modal>
  );
}
