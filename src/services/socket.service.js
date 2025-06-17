import io from "socket.io-client";
import { userService } from "./user";
const { VITE_NODE_ENV } = import.meta.env;

const SOCKET_EMIT_LOGIN = "set-user-socket";
const SOCKET_EMIT_LOGOUT = "unset-user-socket";

export const SOCKET_EVENT_ORDER_STATUS_UPDATE = "order-status-update";
export const SOCKET_EVENT_ORDER_ADDED = "order-added";
export const SOCKET_EVENT_REVIEW_ADDED = "review-added";

const baseUrl = VITE_NODE_ENV === "development" ? "//localhost:3030" : "";

export const socketService = createSocketService();

// for debugging from console
window.socketService = socketService;

socketService.setup();

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl);
      const user = userService.getLoggedinUser();

      if (user) this.login(user._id);
    },
    on(eventName, cb) {
      socket.on(eventName, cb);
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },
    emit(eventName, data) {
      socket.emit(eventName, data);
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId);
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT);
    },
    terminate() {
      socket = null;
    },
  };
  return socketService;
}
