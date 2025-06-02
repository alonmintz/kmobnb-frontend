// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faX } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../cmps/general/Modal";
import { userActions } from "../../store/actions/user.actions";

export function LoginSignupModal({ onClose }) {
  const demoGuestCreds = {
    username: "dan",
    password: "dan1"
  }
  const demoHostCreds = {
    username: "patty",
    password: "patty1"
  }

  async function handleDemoUserLoginClick(creds) {
    onClose();
    await userActions.login(creds);
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
              onClick={() => handleDemoUserLoginClick(demoGuestCreds)}
            >
              Login as demo GUEST
            </button>
            <button
              className="modal-button"
              onClick={() => handleDemoUserLoginClick(demoHostCreds)}
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
