import { useEffect, useRef, useState } from "react"
import { LoginSignupModal } from "../../pages/loginSignup/LoginSignupModal"
import { useSelector } from "react-redux"
import { userActions } from "../../store/actions/user.actions"

export function NavMenu({ onClose, triggeringButtonRef }) {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)
    const navMenuRef = useRef(true)

    useEffect(() => {
        function handleClickOutside(event) {
            if (navMenuRef.current && !navMenuRef.current.contains(event.target) &&
                triggeringButtonRef.current && !triggeringButtonRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function onModalClose() {
        setIsLoginModalVisible(false)
        onClose()
    }

    function onLogout() {
        onClose()
        userActions.logout()
    }

    return (
        <div className="nav-menu" ref={navMenuRef}>
            {!isLoginModalVisible ? "" : <LoginSignupModal onClose={() => onModalClose()} />}
            <ul className="buttons-container">
                {user ?
                    <>
                        <li onClick={() => onClose()}>Wishlist</li>
                        <li onClick={() => onClose()}>My Trips</li>
                        <li className="menu-divider" />
                        <li onClick={() => onLogout()}>Log out</li>
                    </>
                    :
                    <li onClick={() => { setIsLoginModalVisible(true) }}>Log in or sign up</li>
                }
            </ul>
        </div>
    )
}