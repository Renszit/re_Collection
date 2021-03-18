import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWannabes } from "./actions";

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
                    <h1>{friend.first}</h1>
                </div>
            ))}

            <h1>wannabes</h1>
            {wannabe.map((friend, index) => (
                <div key={index}>
                    <h1>{friend.first}</h1>
                </div>
            ))}
        </div>
    );
}
