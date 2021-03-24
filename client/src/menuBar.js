import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, ListItemText } from "@material-ui/core";
import axios from "./axios";
import { Avatar } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

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
        color: "secondary",
    },
    list: {
        width: 300,
    },
}));

export default function MenuBar({ first, url, toggle }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(false);

    const logout = () => {
        axios
            .get("/logout")
            .then(() => location.replace("/welcome"))
            .catch((err) => console.log("err", err));
    };

    return (
        <div className={classes.header}>
            <AppBar position="static">
                <Toolbar>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(false)}
                    >
                        <List className={classes.list}>
                            <Link className={classes.link} to="/">
                                <ListItem
                                    button
                                    onClick={() => setAnchorEl(false)}
                                >
                                    <ListItemIcon>
                                        <AccountCircleIcon></AccountCircleIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Profile"></ListItemText>
                                </ListItem>
                            </Link>
                            <Link className={classes.link} to="/findpeople">
                                <ListItem
                                    button
                                    onClick={() => {
                                        setAnchorEl(false);
                                    }}
                                >
                                    <ListItemIcon>
                                        <SearchIcon></SearchIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Search users"></ListItemText>
                                </ListItem>
                            </Link>
                            <Link className={classes.link} to="/chatters">
                                <ListItem
                                    button
                                    onClick={() => {
                                        setAnchorEl(false);
                                    }}
                                >
                                    <ListItemIcon>
                                        <ChatIcon></ChatIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="Chatters"></ListItemText>
                                </ListItem>
                            </Link>
                            <ListItem
                                button
                                onClick={() => {
                                    setAnchorEl(false);
                                    logout();
                                }}
                            >
                                <ListItemIcon>
                                    <MeetingRoomIcon></MeetingRoomIcon>
                                </ListItemIcon>
                                <ListItemText primary="Logout"></ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>

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
                        Hi {first}! Welcome to recollection.
                    </Typography>
                    <Avatar
                        alt={first}
                        component="div"
                        onClick={toggle}
                        src={url || "./missing.jpg"}
                    ></Avatar>
                </Toolbar>
            </AppBar>
        </div>
    );
}
