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
        width: 300
    }
}));

export default function Registration() {
    const classes = useStyles();

    const [form, setForm] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
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
                window.location.replace("/");
                console.log(res);
            })
            .catch((err) => {
                console.log("error in axios registration", err), setError(true);
            });
    };

    return (
        <div>
            {error && <p>something broke</p>}
            <h1>Registration</h1>
            <div className={classes.form}>
                <TextField
                    id="standard-basic"
                    label="first"
                    name="first"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="standard-basic"
                    label="last"
                    name="last"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="standard-basic"
                    label="password"
                    name="password"
                    type="password"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    id="standard-basic"
                    label="email"
                    name="email"
                    type="email"
                    onChange={(e) => handleChange(e)}
                />
                <Button variant="contained" onClick={(e) => handleClick(e)}>
                    submit
                </Button>
            </div>
            <Link to="/login">Click here to log in!</Link>
        </div>
    );
}
