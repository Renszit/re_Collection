import { socket } from "./socket";
import { Paper, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect } from "react";
import { useSelector } from "react-redux";

//2
const useStyles = makeStyles(() => ({
    paper: {
        height: 300,
        width: "100%",
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
}));

export default function UserChat({ id }) {
    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("private message", {
                message: e.target.value,
                id: id,
            });
            e.target.value = "";
        }
    };

    const classes = useStyles();
    // const elemRef = useRef();
    const privateMessage = useSelector(
        (state) => state.private && state.private
    );

    return (
        <div>
            <Paper className={classes.paper} elevation={1}>
                {privateMessage &&
                    privateMessage.map((message, index) => (
                        <div key={index}>
                            <h1>{message.message}</h1>
                            <p>{message.first}</p>
                        </div>
                    ))}
                <TextField onKeyDown={keyCheck} />
            </Paper>
        </div>
    );
}
