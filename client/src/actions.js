import axios from "./axios";

const ACTIONS = {
    GET_LIST: "get list",
    ACCEPT: "accept",
    DECLINE: "decline",
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
