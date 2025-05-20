import { useState } from "react"
import { LoginSignupModal } from "../../pages/loginSignup/LoginSignupModal"
import { useSelector } from "react-redux"

export function NavMenu() {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)

    return (
        <div className="nav-menu">
            {!isLoginModalVisible ? "" : <LoginSignupModal onClose={() => setIsLoginModalVisible(false)} />}
            <ul className="buttons-container">
                {!user ? "" :
                    <>
                        <li>Wishlist</li>
                        <li>My Trips</li>
                        <li className="menu-divider" />
                    </>
                }
                <li onClick={() => setIsLoginModalVisible(true)}>Log in or sign up</li>
            </ul>
        </div>
    )
}