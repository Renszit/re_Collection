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
            <div className={classes.topContainer}>
                <Paper
                    className={classes.paper}
                    style={{ backgroundColor: "#E4DFDA" }}
                    elevation={2}
                >
                    <Typography
                        variant="h1"
                        style={{ color: "#8F95D3", fontFamily: "Quicksand" }}
                    >
                        {first} {last}
                    </Typography>
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
                </Paper>
                <Paper
                    className={classes.paper}
                    style={{ overflow: "scroll", backgroundColor: "#E4DFDA" }}
                    elevation={2}
                >
                    <Typography
                        variant="h4"
                        style={{ color: "#8F95D3", fontFamily: "Quicksand" }}
                    >
                        friends
                    </Typography>

                    <Friends theme={theme} />
                </Paper>
            </div>
            <Paper className={classes.paper}>
                <FavouriteRecords />
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
        borderRadius: 10,
        cursor: "pointer",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    },
    paper: {
        flexWrap: "wrap",
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
        margin: 10,
    },
    topContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
}));
