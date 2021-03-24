// import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import { Avatar, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    avatar: {
        width: 150,
        height: 150,
        alignSelf: "flex-end",
        position: "absolute"
    },
    paper: {
        padding: 20,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
}));

export default function Profile({ first, last, url, bio, setUser, toggle }) {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper} elevation={1}>
                <Typography variant="h4" component="h1">
                    Profile of {first} {last}
                </Typography>
                <Avatar
                    alt={first}
                    onClick={toggle}
                    className={classes.avatar}
                    component="div"
                    // sizes=""
                    src={url || "./missing.jpg"}
                ></Avatar>
                <BioEditor
                    bio={bio}
                    setUser={({ bio: arg }) => setUser({ bio: arg })}
                />
            </Paper>
        </div>
    );
}
