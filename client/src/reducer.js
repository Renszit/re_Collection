const ACTIONS = {
    GET_LIST: "get list",
    ACCEPT: "accept",
    DECLINE: "decline",
};

export function Reducer(state = {}, action) {
    if (action.type == ACTIONS.GET_LIST) {
        state = {
            ...state,
            wannabes: action.users,
        };
    } else if (action.type == ACTIONS.ACCEPT) {
        state = {
            ...state,
            accepted: true,
            wannabes: state.wannabes.map((userCheck) => {
                userCheck.id == action.id &&
                    (userCheck = {
                        ...userCheck,
                        accepted: true,
                    });
                return userCheck;
            }),
        };
    } else if (action.type == ACTIONS.DECLINE) {
        state = {
            ...state,
            accepted: false,
            wannabes: state.wannabes.filter(
                (declineCheck) => declineCheck.id != action.id
            ),
        };
    }

    return state;
}
