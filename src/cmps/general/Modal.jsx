import { Backdrop } from "./Backdrop";

export function Modal({ isBackdrop = false, onClose, children }) {
    return (
        <Backdrop isBackdrop={isBackdrop} onClick={onClose}>
            <div className="modal" onClick={(ev) => ev.stopPropagation()}>
                {children}
            </div>
        </Backdrop>
    );
}