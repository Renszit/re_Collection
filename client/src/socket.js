import io from "socket.io-client";
import {
    newMessageIncoming,
    recentMessagesRedux,
    // renewLoggedInUsers,
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("newMessages", (recentMessages) => {
        console.log("socket incoming!:", recentMessages);
        store.dispatch(recentMessagesRedux(recentMessages));
    });

    socket.on("new message incoming", (message) => {
        store.dispatch(newMessageIncoming(message));
    });

    // socket.on("10 most recent messages", (recent) => {
    //     store.dispatch(addTenMostRecentMessagesToRedux(recent));
    // });

    // socket.on("update online users", (users) => {
    //     store.dispatch(renewLoggedInUsers(users));
    // });

    // socket.on("userJoined", (users) => {
    //     store.dispatch(renewLoggedInUsers(users));
    // });
};
