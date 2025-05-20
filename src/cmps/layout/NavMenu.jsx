import { useState } from "react"
import { LoginSignupModal } from "../../pages/loginSignup/LoginSignupModal"

export function NavMenu() {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)

    return (
        <div className="nav-menu">
            {!isLoginModalVisible ? "" : <LoginSignupModal onClose={() => setIsLoginModalVisible(false)} />}
            <div className="buttons-container">
                <div className="menu-button">Wishlist</div>
                <div className="menu-button" onClick={() => setIsLoginModalVisible(true)}>Login</div>
            </div>
        </div>
    )
}