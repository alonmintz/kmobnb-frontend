import { useState } from "react"
import { Modal } from "../general/Modal"
import { userActions } from "../../store/actions/user.actions"
import { useSelector } from "react-redux"

export function NavMenu() {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)

    function toggleLoginModal() {
        if (isLoginModalVisible) {
            setIsLoginModalVisible(false)
        }
        else {
            setIsLoginModalVisible(true)
        }
    }

    return (
        <div className="nav-menu">
            {!isLoginModalVisible ? "" :
                <Modal isBackdrop onClose={toggleLoginModal}>
                    <div className="login-modal">
                        <button className="modal-button" onClick={() => userActions.login({ username: "muki"})}>Login as demo guest</button>
                    </div>
                </Modal>}
            <div className="buttons-container">
                <div className="menu-button">Wishlist</div>
                <div className="menu-button" onClick={toggleLoginModal}>Login</div>
            </div>
        </div>
    )
}