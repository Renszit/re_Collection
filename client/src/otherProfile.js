import axios from "./axios";
import { useEffect, useState } from "react";
import ProfilePic from "./profilePic";
import FriendButton from "./friendButton";
import Typography from "@material-ui/core/Typography";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    paper: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
    },
}));

export default function OtherProfile({ match, history }) {
    const classes = useStyles();
    const [otherUser, setOtherUser] = useState({});

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
                <ProfilePic
                    width={200}
                    height={200}
                    url={otherUser.url}
                    className={classes.profilepic}
                />
                <p>{otherUser.bio}</p>
                <FriendButton id={match.params.id} />
            </Paper>
        </div>
    );
}
