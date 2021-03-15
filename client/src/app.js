import axios from "./axios";
import { useEffect, useState } from "react";
import ProfilePic from "./profilePic";
import { makeStyles } from "@material-ui/core/styles";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FindPeople from "./findPeople";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
    },
}));

export default function App() {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [uploader, setUploader] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

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
            <div>
                <div className={classes.header}>
                    <AppBar position="static">
                        <Toolbar>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(false)}
                            >
                                <MenuItem onClick={() => setAnchorEl(false)}>
                                    <Link className={classes.link} to="/">
                                        {" "}
                                        Profile{" "}
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => setAnchorEl(false)}>
                                    <Link
                                        className={classes.link}
                                        to="/findpeople"
                                    >
                                        Search users
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => setAnchorEl(false)}>
                                    Logout
                                </MenuItem>
                            </Menu>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                aria-haspopup="true"
                                aria-controls="simple-menu"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Typography variant="h6" className={classes.title}>
                                Hi {user.first} {user.last}! Welcome to
                                recollection.
                            </Typography>
                            <ProfilePic
                                width={70}
                                height={70}
                                url={user.url}
                                toggle={() => toggleUploader()}
                            />
                        </Toolbar>
                    </AppBar>
                </div>

                {uploader && (
                    <Uploader
                        toggle={() => toggleUploader()}
                        setUser={({ url: arg }) =>
                            setUser({ ...user, url: arg })
                        }
                    />
                )}

                <Route
                    exact
                    path="/"
                    render={() => (
                        <Profile
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

                <Route path="/findpeople" render={() => <FindPeople />} />
            </div>
        </BrowserRouter>
    );
}
