import axios from "./axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: 300,
        margin: 20,
    },
    input: {
        margin: 10,
    },
    button: {
        margin: 20,
    },
    linkContainer: {
        display: "flex",
        flexDirection: "column",
    },
    link: {
        fontSize: 10,
        textDecoration: "none"
    }
}));

export default function Login() {
    const classes = useStyles();

    const [form, setForm] = useState({
        // email: "",
        // password: "",
    });
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    const handleClick = () => {
        console.log(form);
        axios
            .post("/login", form)
            .then((res) => {
                if (!res.data.error) {
                    location.replace("/");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in axios registration", err), setError(true);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p>something broke</p>}
            <div className={classes.form}>
                <TextField
                    className={classes.input}
                    id="standard-basic"
                    label="email"
                    name="email"
                    type="email"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    className={classes.input}
                    id="standard-basic"
                    label="password"
                    name="password"
                    type="password"
                    onChange={(e) => handleChange(e)}
                />
                <Button
                    size="small"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleClick(e)}
                >
                    submit
                </Button>
            </div>
            <div className={classes.linkContainer}>
                <Link className={classes.link} to="/">
                    Click here to register
                </Link>
                <Link className={classes.link} to="/reset-password">
                    Forgot your password?
                </Link>
            </div>
        </div>
    );
}
