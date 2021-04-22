import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// import { useState } from "react";
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
        <div className={(classes.flex, classes.header)}>
            <div className={classes.menu}>
                <div
                    className={classes.flex}
                    style={{ alignSelf: "flex-start" }}
                >
                    <Header width={50} src={"/vinyl_blue.png"} />
                    <Link to="/" className={classes.text}>
                        Hi {first}, welcome to recollection
                    </Link>
                </div>
                <div className={classes.flex} style={{ alignSelf: "flex-end" }}>
                    <Link className={classes.text} to="/recordsearch">
                        Explore
                    </Link>
                    <Link className={classes.text} to="/findpeople">
                        Community
                    </Link>
                    <Link className={classes.text} to="/chatters">
                        Chat
                    </Link>
                    <Link
                        to={"/welcome"}
                        className={classes.text}
                        onClick={() => logout()}
                    >
                        Logout
                    </Link>
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
        height: "3em",
        width: "100%",
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#353238",
    },
    menu: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
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
