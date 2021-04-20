import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./header";
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

    return (
        <div className={classes.header}>
            <Header width={50} />
            <Link to="/" className={classes.text}>
                Hi {first}
            </Link>
            <Link className={classes.text} to="/recordsearch">
                Explore
            </Link>
            <Link className={classes.text} to="/findpeople">
                Community
            </Link>
            <Link className={classes.text} to="/chatters">
                Chat
            </Link>
            {/* <Link className={classes.text} onClick={logout()}>Logout</Link> */}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        top: 0,
        left: 0,
        height: "4em",
        width: "100%",
        marginBottom: 10,
        backgroundColor: "#353238",
    },
    text: {
        margin: 10,
        color: "#F2F4F3",
        textDecoration: "none",
    },
    link: {
        textDecoration: "none",
        color: "secondary",
    },
}));
