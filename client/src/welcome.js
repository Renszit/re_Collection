import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./resetPassword";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Header from "./header";

export default function Welcome() {
    const classes = useStyles();

    return (
        <div className={classes.flexColumn}>
            <Header width={80} src={"/vinyl_black.png"} />
            <h1>recollection.</h1>
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
    form: {
        margin: 20,
    },
    title: {
        margin: 10,
        color: "#403D58",
    },
}));
