// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faX } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../cmps/general/Modal";
import { userActions } from "../../store/actions/user.actions";

export function LoginSignupModal({ onClose }) {
  const demoGuest = "dan"
  const demoHost = "patty"

  async function handleDemoUserLoginClick(username) {
    onClose();
    await userActions.login({ username });
  }

  return (
    <Modal isBackdrop onClose={() => onClose()}>
      <div className="login-modal-container">
        <header className="modal-header">
          <h1>Log in or sign up</h1>
        </header>
        <div className="login-modal-content">
          <h2>Welcome to Kmobnb</h2>
          <div className="demo-buttons">
            <button
              className="modal-button"
              onClick={() => handleDemoUserLoginClick(demoGuest)}
            >
              Login as demo GUEST
            </button>
            <button
              className="modal-button"
              onClick={() => handleDemoUserLoginClick(demoHost)}
            >
              Login as demo HOST
            </button>
          </div>
          <div className="divider">or</div>
          <div className="auth-buttons">
            <button className="email">Continue with email</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
