import { Backdrop } from "./Backdrop";

export function Modal({ isBackdrop = false, onClose, children }) {
    return (
        <Backdrop isBackdrop={isBackdrop} onClick={onClose}>
            <section className="modal" onClick={(ev) => ev.stopPropagation()}>
                {children}
            </section>
        </Backdrop>
    );
}