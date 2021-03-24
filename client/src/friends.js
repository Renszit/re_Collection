import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWannabes, declineFriend, acceptFriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const wannabe = useSelector(
        (state) =>
            state.wannabes &&
            state.wannabes.filter((wannabe) => wannabe.accepted == false)
    );

    const friends = useSelector(
        (state) =>
            state.wannabes &&
            state.wannabes.filter((wannabe) => wannabe.accepted == true)
    );

    useEffect(() => {
        dispatch(getWannabes());
    }, []);

    if (!friends && !wannabe) {
        return null;
    }

    return (
        <div>
            <h1>friends</h1>
            {friends.map((friend, index) => (
                <div key={index}>
                    <h1>
                        {friend.first} {friend.last}
                    </h1>
                    <button onClick={() => dispatch(declineFriend(friend.id))}>
                        unfriend
                    </button>
                </div>
            ))}

            <h1>wannabes</h1>
            {wannabe.map((friend, index) => (
                <div key={index}>
                    <h1>
                        {friend.first} {friend.last}
                    </h1>
                    <button onClick={() => dispatch(acceptFriend(friend.id))}>
                        accept
                    </button>
                </div>
            ))}
        </div>
    );
}
