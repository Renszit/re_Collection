import { socket } from "./socket";
import { Paper, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

//2
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    paper: {
        position: "absolute",
        height: 200,
        width: 200,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "auto",
    },
}));

export default function UserChat({ id }) {
    // const pastPrivates = useSelector((state) => state.private && state.private);
    const elemRef = useRef();
    const privateMessage = useSelector(
        (state) => state.private && state.private
    );

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

    useEffect(() => {
        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, [privateMessage]);

    const classes = useStyles();
    // const elemRef = useRef();

    return (
        <div>
            <Paper ref={elemRef} className={classes.paper} elevation={1}>
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
