import io from "socket.io-client";
import {
    newMessageIncoming,
    recentMessagesRedux,
    currentOnlineUsers,
    userJustJoined,
    userLeft,
    newPrivateMessage,
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("newMessages", (recentMessages) => {
        store.dispatch(recentMessagesRedux(recentMessages));
    });

    socket.on("new message incoming", (message) => {
        store.dispatch(newMessageIncoming(message));
    });

    socket.on("online users", (users) => {
        store.dispatch(currentOnlineUsers(users));
    });

    socket.on("new user just joined", (user) => {
        store.dispatch(userJustJoined(user));
    });

    socket.on("user left", (user) => {
        store.dispatch(userLeft(user));
        console.log("userId left:", user.user);
    });

    socket.on("private message incoming", (message) => {
        store.dispatch(newPrivateMessage(message));
    });

    socket.on("sent message", (message) => {
        store.dispatch(newPrivateMessage(message));
    });

    socket.on("recent messages incoming", (message) => {
        store.dispatch(newPrivateMessage(message));
    });
};
