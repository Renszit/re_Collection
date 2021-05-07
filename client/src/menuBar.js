import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
// import { useState } from "react";
import Header from "./logo";
import axios from "./axios";

export default function MenuBar({ first }) {
    const classes = useStyles();
    // const [anchorEl, setAnchorEl] = useState(false);

    const logout = () => {
        axios
            .get("/logout")
            .then(() => location.replace("/welcome"))
            .catch((err) => console.log("err", err));
    };

    let activeLink = { color: "#A7B0CA" };

    return (
        <div className={(classes.flex, classes.header)}>
            <div className={classes.menu}>
                <div
                    className={classes.flex}
                    style={{ alignSelf: "flex-start" }}
                >
                    <Header width={50} src={"/vinyl_blue.png"} />
                    <NavLink
                        to="/"
                        exact
                        className={classes.text}
                        activeStyle={activeLink}
                    >
                        Hi {first}, welcome to recollection
                    </NavLink>
                </div>
                <div className={classes.flex} style={{ alignSelf: "flex-end" }}>
                    <NavLink
                        activeStyle={activeLink}
                        className={classes.text}
                        to="/recordsearch"
                    >
                        Explore
                    </NavLink>
                    <NavLink
                        activeStyle={activeLink}
                        className={classes.text}
                        to="/findpeople"
                    >
                        Community
                    </NavLink>
                    <NavLink
                        activeStyle={activeLink}
                        className={classes.text}
                        to="/chatters"
                    >
                        Chat
                    </NavLink>
                    <NavLink
                        // activeStyle={{ color: "#B0D0D3" }}
                        to={"/welcome"}
                        className={classes.text}
                        style={{ marginLeft: "2em" }}
                        onClick={() => logout()}
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    flex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "3em",
        width: "100%",
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#353238",
    },
    menu: {
        display: "flex",
        alignItems: "center",
        margin: 10,
        padding: 10,
        justifyContent: "space-between",
        width: "max(1240px)",
    },
    text: {
        margin: 10,
        color: "#F2F4F3",
        textDecoration: "none",
    },
    activeText: {
        color: "red",
    },
    link: {
        textDecoration: "none",
        color: "secondary",
    },
}));
