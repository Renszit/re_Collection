import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "./axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
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
    link: {
        fontSize: 10,
        textDecoration: "none",
    },
}));

export default function ResetPassword({ theme }) {
    const classes = useStyles();
    const [state, setState] = useState(1);
    const [form, setForm] = useState({});
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    const handleClick = () => {
        if (state == 1) {
            axios
                .post("/password/reset/start", form)
                .then((res) => {
                    if (!res.data.error) {
                        setState(2);
                        console.log(res);
                    } else {
                        setError(true);
                    }
                })
                .catch((err) => {
                    setError(true);
                    console.log("error in password reset start", err);
                });
        } else {
            axios
                .post("/password/reset/verify", form)
                .then((res) => {
                    if (!res.data.error) {
                        setState(3);
                        console.log(res);
                    } else {
                        setError(true);
                    }
                })
                .catch((err) => {
                    setError(true);
                    console.log("error in password reset verify", err);
                });
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>

            {state == 1 && (
                <div className={classes.form}>
                    <TextField
                        className={classes.input}
                        id="standard-basic"
                        label="email"
                        name="email"
                        type="email"
                        onChange={(e) => handleChange(e)}
                    />
                    {error && (
                        <Typography variant="caption" color="secondary">
                            something went wrong
                        </Typography>
                    )}
                    <Button
                        size="small"
                        className={theme.button}
                        variant="outlined"
                        color="primary"
                        onClick={(e) => handleClick(e)}
                    >
                        Send Reset Email
                    </Button>
                    <Link to="/login" className={classes.link}>
                        go to login
                    </Link>
                </div>
            )}
            {state == 2 && (
                <div className={classes.form}>
                    <TextField
                        className={classes.input}
                        id="standard-basic"
                        label="code"
                        name="code"
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
                        Change password
                    </Button>
                </div>
            )}
            {state == 3 && (
                <div>
                    <h2>success!</h2>
                    <Link to="/login" className={classes.link}>
                        Go back to login
                    </Link>
                </div>
            )}
        </div>
    );
}
