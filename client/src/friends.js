import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWannabes, declineFriend, acceptFriend } from "./actions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    image: {
        width: 300,
    },
    title: {
        textAlign: "right",
    },
}));

export default function Friends({ theme }) {
    const classes = useStyles();
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
            {friends[0] && <h1 className={classes.title}>friends</h1>}
            {friends.map((friend, index) => (
                <div key={index}>
                    <h1>{friend.first}</h1>
                    <img className={classes.image} src={friend.url}></img>
                    <Button
                        className={theme.button}
                        variant="outlined"
                        color="default"
                        onClick={() => dispatch(declineFriend(friend.id))}
                    >
                        unfriend
                    </Button>
                </div>
            ))}

            {wannabe[0] && <h1 className={classes.title}>Requests</h1>}
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
