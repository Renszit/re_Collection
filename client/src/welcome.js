import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./resetPassword";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Header from "./header";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    button: {
        margin: 20,
    },
    title: {
        margin: 10,
        color: "#403D58",
    },
}));

function GridItem({ classes }) {
    return (
        <HashRouter>
            <Grid item xs={12} sm={8} md={6}>
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
            </Grid>
        </HashRouter>
    );
}

export default function Welcome() {
    const classes = useStyles();

    return (
        <div>
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
            >
                <Header width={80} src={"/vinyl_black.png"} />
                <Typography variant="h6" color="initial">
                    recollection.
                </Typography>
                <GridItem classes={classes} />
            </Grid>
        </div>
    );
}
