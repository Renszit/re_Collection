import axios from "./axios";
import { useEffect, useState } from "react";
import MenuBar from "./menuBar";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./findPeople";
import Container from "@material-ui/core/Container";
// import Friends from "./friends";
import Chat from "./chat";
import { makeStyles } from "@material-ui/core/styles";
import RecordSearch from "./recordsearch";
import UserSelection from "./userSelection";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    button: {
        margin: 10,
    },
    title: {
        margin: 10,
        color: "#403D58",
    },
    headText: {
        color: "#403D58",
    },
}));

export default function App() {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [uploader, setUploader] = useState(false);

    const toggleUploader = () => {
        setUploader(!uploader);
    };

    useEffect(() => {
        axios
            .get("/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) =>
                console.error("something went wrong on mount/useEffect", err)
            );
    }, [null]);

    return (
        <BrowserRouter>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Profile
                </Link>
                <Link
                    color="inherit"
                    href="/findPeople"
                    className={classes.link}
                >
                    <WhatshotIcon className={classes.icon} />
                    Find friends
                </Link>
                <Link
                    color="inherit"
                    href="/recordsearch"
                    className={classes.link}
                >
                    <Typography color="textPrimary" className={classes.link}>
                        <GrainIcon className={classes.icon} />
                        Find records
                    </Typography>
                </Link>
            </Breadcrumbs>
            <MenuBar first={user.first} url={user.url} />
            {uploader && (
                <Uploader
                    toggle={() => toggleUploader()}
                    setUser={({ url: arg }) => setUser({ ...user, url: arg })}
                />
            )}
            <Container maxWidth="md">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Profile
                            theme={classes}
                            toggle={() => toggleUploader()}
                            first={user.first}
                            last={user.last}
                            url={user.url}
                            bio={user.bio}
                            setUser={({ bio: bio }) =>
                                setUser({ ...user, bio: bio })
                            }
                        />
                    )}
                />
                <Route path="/chatters" component={Chat} />

                <Route
                    path="/users/:id"
                    render={(props) => (
                        <OtherProfile
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/userselection"
                    render={() => <UserSelection theme={classes} />}
                />
                <Route
                    path="/recordsearch"
                    render={() => <RecordSearch theme={classes} />}
                />
                <Route
                    path="/findpeople"
                    render={() => <FindPeople theme={classes} />}
                />
            </Container>
        </BrowserRouter>
    );
}
