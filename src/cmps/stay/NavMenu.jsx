import { eventBus } from "../../services/event-bus.service";

export function NavMenu() {

    

    return (
        <div className="nav-menu">
            <div className="buttons-container">
                <div className="menu-button">Wishlist</div>
                <div className="menu-button" onClick={() => eventBus.emit("nav-login-clicked")}>Login</div>
            </div>
        </div>
    )
}