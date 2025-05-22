import { Backdrop } from "./Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export function Modal({
  lockScroll = false,
  isBackdrop = false,
  onClose,
  children,
}) {
  const modalRef = useRef();

  useEffect(() => {
    const el = modalRef.current;

    if (lockScroll && el) {
      disableBodyScroll(el);
    }

    return () => {
      if (el) enableBodyScroll(el);
      clearAllBodyScrollLocks(); // just in case
    };
  }, [lockScroll]);

  return (
    <Backdrop isBackdrop={isBackdrop} onClick={onClose}>
      <div
        ref={modalRef}
        className="modal"
        onClick={(ev) => ev.stopPropagation()}
      >
        <FontAwesomeIcon
          className="close-btn"
          icon={faX}
          onClick={() => onClose()}
        />
        {children}
      </div>
    </Backdrop>
  );
}
