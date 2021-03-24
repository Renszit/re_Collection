import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./resetPassword";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Header from "./header";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

function GridItem({ classes }) {
    return (
        <HashRouter>
            <Grid item xs={12} sm={8} md={6}>
                <Paper className={classes.paper}>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
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
                <Header />
                <GridItem classes={classes} />
            </Grid>
        </div>
    );
}
