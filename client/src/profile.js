// import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Friends from "./friends";
import FavouriteRecords from "./favouriteRecords";

// import Container from "@material-ui/core/Container";

export default function Profile({
    first,
    last,
    url,
    bio,
    setUser,
    toggle,
    theme,
}) {
    const classes = useStyles();

    return (
        <div>
            <Paper
                className={classes.paper}
                style={{ minHeight: 200, backgroundColor: "#E4DFDA" }}
                elevation={2}
            >
                <div>
                    <Avatar
                        elevation={2}
                        alt={first}
                        onClick={toggle}
                        className={classes.avatar}
                        component="div"
                        src={url || "./missing.jpg"}
                    ></Avatar>
                    <BioEditor
                        className={classes.editor}
                        theme={theme}
                        bio={bio}
                        setUser={({ bio: arg }) => setUser({ bio: arg })}
                    />
                </div>
                <Typography
                    variant="h1"
                    style={{ color: "#8F95D3", fontFamily: "Quicksand" }}
                >
                    {first} {last}
                </Typography>
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
        width: 500,
        height: "min(300px)",
        margin: 10,
        borderRadius: 15,
    },
    paper: {
        flexWrap: "wrap-reverse",
        padding: 20,
        display: "flex",
        justifyContent: "space-around",
        marginBottom: 10,
    },
}));
