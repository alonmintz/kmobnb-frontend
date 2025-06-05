import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {
  eventBus,
  showErrorMsg,
  showSuccessMsg,
} from "../../services/event-bus.service";
import { useState, useEffect, useRef } from "react";
import {
  socketService,
  SOCKET_EVENT_ORDER_STATUS_UPDATE,
} from "../../services/socket.service";

export function UserMsg() {
  const [msg, setMsg] = useState(null);
  const timeoutIdRef = useRef();

  useEffect(() => {
    const unsubscribe = eventBus.on("show-msg", (msg) => {
      setMsg(msg);
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null;
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(closeMsg, 5000);
    });

    socketService.on(SOCKET_EVENT_ORDER_STATUS_UPDATE, showOrderStatusMsg);

    return () => {
      unsubscribe();
      socketService.off(SOCKET_EVENT_ORDER_STATUS_UPDATE);
    };
  }, []);

  function showOrderStatusMsg({ status, stayName }) {
    if (status === "approved") {
      showSuccessMsg(
        `Your reservation to ${stayName} was approved by the host`
      );
    } else if (status === "canceled") {
      showErrorMsg(`Your reservation to ${stayName} was canceled by the host`);
    }
  }

  function closeMsg() {
    setMsg(null);
  }

  function msgClass() {
    return msg ? "visible" : "";
  }
  return (
    <section className={`user-msg ${msg?.type} ${msgClass()}`}>
      <button type="button" className="reset-btn" onClick={closeMsg}>
        <FontAwesomeIcon icon={faX} />
      </button>
      <span className="msg-txt">{msg?.txt}</span>
    </section>
  );
}
