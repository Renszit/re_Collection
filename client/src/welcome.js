import Registration from "./authentication/registration";
import Login from "./authentication/login";
import ResetPassword from "./authentication/resetPassword";
import Header from "./logo";

import { HashRouter, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export default function Welcome() {
    const classes = useStyles();

    return (
        <div className={classes.grid}>
            <div className={classes.itemTwo}>
                <div className={classes.flex}>
                    <img
                        className={classes.image}
                        src="./placeholder.jpeg"
                    ></img>
                </div>
            </div>
            <div className={classes.itemOne}>
                <HashRouter>
                    <div style={{ margin: 20 }} className={classes.flex}>
                        <Header width={90} src={"/vinyl_black.png"} />
                        <h1 style={{ marginLeft: 20 }}>recollection.</h1>
                    </div>
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
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: "center",
        height: "auto%",
        maxWidth: "100%",
        color: theme.palette.text.secondary,
    },
    grid: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: "wrap-reverse",
        margin: 20,
        padding: 20,
    },
    itemOne: {
        justifySelf: "center",
        alignSelf: "center",
    },
    itemTwo: {
        justifySelf: "center",
        maxWidth: 700,
        alignSelf: "center",
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
        maxWidth: "100%",
        borderRadius: "51% 49% 65% 35% / 53% 45% 55% 47% ",
        height: "auto",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },

    form: {
        margin: 20,
    },
    title: {
        margin: 10,
        color: "#403D58",
    },
}));
