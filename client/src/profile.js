// import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import { Avatar, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Friends from "./friends";
import FavouriteRecords from "./favouriteRecords";
import Container from "@material-ui/core/Container";
export default function Profile({ first, url, bio, setUser, toggle, theme }) {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper} elevation={1}>
                <Avatar elevation={2}
                    alt={first}
                    onClick={toggle}
                    className={classes.avatar}
                    component="div"
                    src={url || "./missing.jpg"}
                ></Avatar>
                <BioEditor
                    theme={theme}
                    bio={bio}
                    setUser={({ bio: arg }) => setUser({ bio: arg })}
                />
            </Paper>
            <Paper className={classes.paper}>
                <FavouriteRecords />
            </Paper>
            <Paper className={classes.paper}>
                <Friends theme={theme} />
            </Paper>
        </div>
    );
}

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
        borderRadius: 10,
        filter: "grayscale(90%)",
        alignSelf: "flex-end",
        position: "absolute",
    },
    paper: {
        padding: 20,
        display: "flex",
        // position: "relative",
        flexDirection: "column",
        marginBottom: 10,
    },
}));
