import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import ProfilePic from "./profilePic";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useState } from "react";

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
                        <MenuItem onClick={() => setAnchorEl(false)}>
                            <Link className={classes.link} to="/">
                                {" "}
                                Profile{" "}
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={() => setAnchorEl(false)}>
                            <Link className={classes.link} to="/findpeople">
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
