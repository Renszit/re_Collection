import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Paper, Typography, makeStyles, TextField } from "@material-ui/core";
import OnlineUsers from "./onlineUsers";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    paper: {
        overflowY: "auto",
        height: 300,
        padding: 10,
    },
    textField: {
        marginTop: 10,
    }
}));

export default function Chat() {
    const classes = useStyles();
    const elemRef = useRef();
    const messages = useSelector((state) => state.messages && state.messages);

    useEffect(() => {
        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, [messages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("my amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <Typography  variant="h2" color="initial">
                Chat Room
            </Typography>
            <OnlineUsers />
            <Paper className={classes.paper} ref={elemRef} elevation={1}>
                {messages &&
                    messages.map((message, index) => (
                        <div key={index}>
                            <Typography variant="body2" color="initial">
                                {message.first} {message.last} says:
                            </Typography>
                            <Typography variant="caption" color="initial">
                                {message.message}
                            </Typography>
                        </div>
                    ))}
            </Paper>
            <TextField
                className={classes.textField}
                fullWidth
                label="discuss"
                onKeyDown={keyCheck}
            />
        </>
    );
}
