import Registration from "./authentication/registration";
import Login from "./authentication/login";
import ResetPassword from "./authentication/resetPassword";
import Header from "./header";

import { HashRouter, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export default function Welcome() {
    const classes = useStyles();

    return (
        <div className={classes.flex}>
            <div className={classes.flexColumn}>
                <HashRouter>
                    <Paper className={classes.paper}>
                        <Route
                            exact
                            path="/"
                            render={() => <Registration theme={classes} />}
                        />
                        <Route
                            path="/login"
                            render={() => <Login theme={classes} />}
                        />
                        <Route
                            path="/reset-password"
                            render={() => <ResetPassword theme={classes} />}
                        />
                    </Paper>
                </HashRouter>
            </div>
            <div className={classes.flexColumn}>
                <div className={classes.flex}>
                    <h1 style={{ marginRight: 20 }}>recollection.</h1>
                    <Header width={80} src={"/vinyl_black.png"} />
                </div>
                <img className={classes.image} src="./placeholder.jpeg"></img>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        margin: 20,
        height: "100%",
        color: theme.palette.text.secondary,
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    flexColumn: {
        margin: 20,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        margin: 20,
    },
    image: {
        margin: 20,
        borderRadius: "51% 49% 65% 35% / 53% 45% 55% 47% ",
        height: "50vh",
    },
    form: {
        margin: 20,
    },
    title: {
        margin: 10,
        color: "#403D58",
    },
}));
