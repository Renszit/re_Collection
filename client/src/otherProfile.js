import axios from "./axios";
import { useEffect, useState } from "react";

import FriendButton from "./friendButton";
import Typography from "@material-ui/core/Typography";
import { Paper, makeStyles, Button } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import UserChat from "./userChat";

const useStyles = makeStyles(() => ({
    paper: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
    },
}));
//1
export default function OtherProfile({ match, history }) {
    const classes = useStyles();
    const [otherUser, setOtherUser] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios
            .post("/getOtherProfileInfo", { id: match.params.id })
            .then(({ data }) => {
                if (!data.error) {
                    setOtherUser(data);
                } else {
                    history.push("/");
                }
            })
            .catch((err) =>
                console.log(
                    "something went wrong in axios request get other profule",
                    err
                )
            );
    }, [null]);

    return (
        <div>
            <Paper className={classes.paper} elevation={1}>
                <Typography variant="h2" color="initial">
                    {otherUser.first} {otherUser.last}
                </Typography>
                <Avatar
                    alt={otherUser.first}
                    className={classes.profilepic}
                    component="div"
                    src={otherUser.url || "./missing.jpg"}
                ></Avatar>
                <p>{otherUser.bio}</p>
                <div>
                    <FriendButton id={match.params.id} />
                    <Button
                        onClick={() => setModal(!modal)}
                        variant="outlined"
                        color="default"
                    >
                        chat
                    </Button>
                </div>
            </Paper>
            
            {modal && <UserChat id={match.params.id} />}
        </div>
    );
}
