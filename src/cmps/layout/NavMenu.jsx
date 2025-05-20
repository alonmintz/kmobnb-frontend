import { useEffect, useRef, useState } from "react"
import { LoginSignupModal } from "../../pages/loginSignup/LoginSignupModal"
import { useSelector } from "react-redux"
import { userActions } from "../../store/actions/user.actions"

export function NavMenu({ onClose }) {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)
    const navMenuRef = useRef(true)

    useEffect(() => {
        function handleClickOutside(event) {
            if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            onClose()
        };
    }, []);

    return (
        <div className="nav-menu" ref={navMenuRef}>
            {!isLoginModalVisible ? "" : <LoginSignupModal onClose={() => setIsLoginModalVisible(false)} />}
            <ul className="buttons-container">
                {!user ?
                    <li onClick={() => setIsLoginModalVisible(true)}>Log in or sign up</li>
                    :
                    <>
                        <li>Wishlist</li>
                        <li>My Trips</li>
                        <li className="menu-divider" />
                        <li onClick={() => userActions.logout()}>Logout</li>
                    </>
                }
            </ul>
        </div>
    )
}