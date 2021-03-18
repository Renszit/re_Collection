const ACTIONS = {
    GET_LIST: "get list",
};

export function Reducer(state = {}, action) {
    if (action.type == ACTIONS.GET_LIST) {
        state = {
            ...state,
            wannabes: action.users,
        };
    }

    return state;
}
