import { Paper, Avatar, makeStyles, Badge } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserChat from "./userChat";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    paper: {
        display: "flex",
        marginBottom: 10,
        padding: 10,
    },
    avatar: {
        margin: 10,
    },
}));

export default function OnlineUsers() {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const online = useSelector(
        (state) => state.onlineUsers && state.onlineUsers
    );
    //filter online users here so only one appears on screen

    return (
        <div>
            <Paper className={classes.paper} elevation={1}>
                {online &&
                    online.map((user, index) => (
                        <div key={index}>
                            <Badge
                                className={classes.avatar}
                                color="primary"
                                overlap="circle"
                                badgeContent={user.first}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                            >
                                <Avatar
                                    onClick={() => {
                                        if (modal == false) {
                                            setModal(user.id);
                                        } else {
                                            setModal(false);
                                        }
                                    }}
                                    alt={user.first || "anon"}
                                    component="div"
                                    src={user.url || "./missing.jpg"}
                                ></Avatar>
                            </Badge>
                            {modal == user.id && <UserChat id={user.id} />}
                        </div>
                    ))}
            </Paper>
        </div>
    );
}
