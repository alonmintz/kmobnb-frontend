import { useState } from "react"
import { Modal } from "../general/Modal"

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
                        <button className="login-button">Login as guest</button>
                    </div>
                </Modal>}
            <div className="buttons-container">
                <div className="menu-button">Wishlist</div>
                <div className="menu-button" onClick={toggleLoginModal}>Login</div>
            </div>
        </div>
    )
}