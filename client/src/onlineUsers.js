import { Paper, Avatar, makeStyles, Badge} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
    const online = useSelector(
        (state) => state.onlineUsers && state.onlineUsers
    );
    
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
                                <Link to={`/users/${user.id}`}>
                                    <Avatar
                                        alt={user.first}
                                        component="div"
                                        src={user.url}
                                    ></Avatar>
                                </Link>
                            </Badge>
                        </div>
                    ))}
            </Paper>
        </div>
    );
}
