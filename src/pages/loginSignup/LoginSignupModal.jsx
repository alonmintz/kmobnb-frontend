import { useState } from "react";
import { Modal } from "../../cmps/general/Modal";
import { userActions } from "../../store/actions/user.actions";

export function LoginSignupModal({ onClose }) {
  const demoGuestCreds = {
    username: "eyal",
    password: "eyalTheBigK"
  }
  const demoHostCreds = {
    username: "alon",
    password: "alonTheBigM"
  }
  const [creds, setCreds] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  function handleChange(ev) {
    const { name, value } = ev.target
    setCreds(prevCreds => ({
      ...prevCreds,
      [name]: value
    }))
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      setError('')
      const user = await userActions.login(creds);
      if (user) {
        onClose()
      }
    } catch (err) {
      console.error('Failed to log in:', err)
      setError('Invalid username or password')
    }
  }

  return (
    <Modal isBackdrop onClose={() => onClose()}>
      <div className="login-modal-container">
        <header className="modal-header">
          <h1>Log in or sign up</h1>
        </header>
        <div className="login-modal-content">
          <h2>Welcome to Kmobnb</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-form">
              <input
                type="username"
                name="username"
                placeholder="Username"
                value={creds.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={creds.password}
                onChange={handleChange}
                required
              />
              <button className="modal-button" type="submit">
                Log in
              </button>
              {error && <div className="error-message">{error}</div>}
            </div>
          </form>
          <div className="demo-buttons">
            <button
              className="modal-button"
              onClick={() => setCreds(demoGuestCreds)}
            >
              Use demo GUEST creds
            </button>
            <button
              className="modal-button"
              onClick={() => setCreds(demoHostCreds)}
            >
              Use demo HOST creds
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
