import axios from "./axios";

const ACTIONS = {
    GET_LIST: "get list",
    ACCEPT: "accept",
    DECLINE: "decline",
    RECENT_MESSAGES: "recent",
    NEW_MESSAGE: "new",
    ONLINE_USERS: "online",
    NEW_USER: "new user",
    USER_LEFT: "user left",
    RECORD_SEARCH: "search records",
    SELECTED_RECORD: "record selected",
    NEW_PRIVATE_MESSAGE: "private message",
    RECENT_PRIVATES: "recent privates",
};

export async function getWannabes() {
    const { data } = await axios.get("/getwannabes");
    return {
        type: ACTIONS.GET_LIST,
        users: data,
    };
}

export async function acceptFriend(id) {
    await axios.post(`/acceptfriend`, { otherId: id });
    return {
        type: ACTIONS.ACCEPT,
        id: id,
    };
}

export async function declineFriend(id) {
    await axios.post(`/unfriend`, { otherId: id });
    return {
        type: ACTIONS.DECLINE,
        id: id,
    };
}

export async function recentMessagesRedux(messages) {
    return {
        type: ACTIONS.RECENT_MESSAGES,
        messages: messages,
    };
}

export async function newMessageIncoming(message) {
    return {
        type: ACTIONS.NEW_MESSAGE,
        newMessage: message,
    };
}

export async function currentOnlineUsers(users) {
    console.log("users!!", users);
    return {
        type: ACTIONS.ONLINE_USERS,
        onlineUsers: users,
    };
}

export async function userJustJoined(user) {
    console.log("user joined:", user);
    return {
        type: ACTIONS.NEW_USER,
        newUser: user,
    };
}

export async function userLeft(user) {
    console.log("user Id left:", user);
    return {
        type: ACTIONS.USER_LEFT,
        leftUser: user,
    };
}

export async function getRecord(record, type) {
    const { data } = await axios.get(`/searchrecord/${record}/${type}`);
    console.log(data);
    return {
        type: ACTIONS.RECORD_SEARCH,
        searchResults: data.results,
    };
}

export async function getSelection(resource_url) {
    const { data } = await axios.get(resource_url);
    console.log("get selection", data);
    return {
        type: ACTIONS.SELECTED_RECORD,
        recordSelection: data,
    };
}

export async function newPrivateMessage(message) {
    return {
        type: ACTIONS.NEW_PRIVATE_MESSAGE,
        message: message,
    };
}
