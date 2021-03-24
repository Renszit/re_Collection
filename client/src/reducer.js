const ACTIONS = {
    GET_LIST: "get list",
    ACCEPT: "accept",
    DECLINE: "decline",
    RECENT_MESSAGES: "recent",
    NEW_MESSAGE: "new",
    ONLINE_USERS: "online",
    //
    NEW_USER: "new user",
    USER_LEFT: "user left",
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
    } else if (action.type == ACTIONS.RECENT_MESSAGES) {
        state = {
            ...state,
            messages: action.messages,
        };
    } else if (action.type == ACTIONS.NEW_MESSAGE) {
        state = {
            ...state,
            messages: [...state.messages, action.newMessage],
        };
    } else if (action.type == ACTIONS.ONLINE_USERS) {
        state = {
            ...state,
            onlineUsers: action.onlineUsers,
        };
    } else if (action.type == ACTIONS.NEW_USER) {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.newUser],
        };
    } else if (action.type == ACTIONS.USER_LEFT) {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                (userId) => userId.id != action.leftUser.user
            ),
        };
    }

    return state;
}
