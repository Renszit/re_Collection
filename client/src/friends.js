import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWannabes, declineFriend, acceptFriend } from "./actions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
            {friends.map((friend, index) => (
                <div className={classes.friendContainer} key={index}>
                    <Typography
                        className={classes.firstName}
                        variant="h4"
                        color="initial"
                    >
                        {friend.first}
                    </Typography>
                    <img className={classes.image} src={friend.url}></img>
                    <Button
                        size="small"
                        className={classes.button}
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
                    <img className={classes.image} src={friend.url}></img>
                    <h4 className={classes.firstName}>
                        {friend.first} {friend.last}
                    </h4>
                    <button onClick={() => dispatch(acceptFriend(friend.id))}>
                        accept
                    </button>
                </div>
            ))}
        </div>
    );
}

const useStyles = makeStyles(() => ({
    image: {
        width: 100,
        height: 100,
        borderRadius: "50%",
        objectFit: "cover",
    },
    firstName: {
        color: "#8F95D3",
        transform: "translate(100px, 50px)",
        fontFamily: "Quicksand",
    },
}));
