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
    link: {
        fontSize: 10,
        textDecoration: "none",
    },
}));

export default function Registration() {
    const classes = useStyles();

    const [form, setForm] = useState({
        // first: "",
        // last: "",
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
            .post("/register", form)
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
            <h1>Registration</h1>
            {error && <p>something broke</p>}
            <div className={classes.form}>
                <TextField
                    className={classes.input}
                    id="standard-basic"
                    label="first"
                    name="first"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    className={classes.input}
                    id="standard-basic"
                    label="last"
                    name="last"
                    onChange={(e) => handleChange(e)}
                />
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
            <Link to="/login" className={classes.link}>
                Click here to log in!
            </Link>
        </div>
    );
}
