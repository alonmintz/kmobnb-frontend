import { Modal } from "../../cmps/general/Modal";
import { userActions } from "../../store/actions/user.actions";

export function LoginSignupModal({ onClose }) {

  async function handleDemoUserLoginClick() {
    await userActions.login({ username: "muki" })
    onClose()
  }

  return (
    <Modal isBackdrop onClose={() => onClose()}>
      <div className="login-modal-container">
        <header className="modal-header">
          <h1>Log in or sign up</h1>
        </header>
        <div className="login-modal-content">
          <h2>Welcome to Kmobnb</h2>
          <button className="modal-button" onClick={() => handleDemoUserLoginClick()}>Login as demo guest</button>
          <div className="divider">or</div>
          <div className="auth-buttons">
            <button className="email">Continue with email</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
