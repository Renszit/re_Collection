import axios from "./axios";

const ACTIONS = {
    GET_LIST: "get list",
};

export async function getWannabes() {
    const { data } = await axios.get("/getwannabes");
    return {
        type: ACTIONS.GET_LIST,
        users: data,
    };
}
