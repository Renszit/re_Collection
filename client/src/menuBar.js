import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import ProfilePic from "./profilePic";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, ListItemText } from "@material-ui/core";
import axios from "./axios";

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
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(false)}
                    >
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(false)}
                        >
                            <List>
                                <ListItem
                                    button
                                    onClick={() => setAnchorEl(false)}
                                >
                                    <Link className={classes.link} to="/">
                                        <ListItemText primary="Profile"></ListItemText>
                                    </Link>
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setAnchorEl(false);
                                    }}
                                >
                                    <Link
                                        className={classes.link}
                                        to="/findpeople"
                                    >
                                        <ListItemText primary="Search users"></ListItemText>
                                    </Link>
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setAnchorEl(false);
                                        logout();
                                    }}
                                >
                                    <ListItemText primary="Logout"></ListItemText>
                                </ListItem>
                            </List>
                        </Drawer>
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
                        Hi {first}! Welcome to recollection.
                    </Typography>
                    <ProfilePic
                        width={70}
                        height={70}
                        url={url}
                        toggle={toggle}
                    />
                </Toolbar>
            </AppBar>
        </div>
    );
}
