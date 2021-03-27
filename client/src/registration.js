import axios from "./axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    link: {
        fontSize: 10,
        textDecoration: "none",
    },
}));

export default function Registration({ theme }) {
    const classes = useStyles();

    const [form, setForm] = useState({});
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // console.log(form);
    };

    const handleClick = () => {
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
            <Typography className={theme.title} variant="h4">
                Registration
            </Typography>
            <div className={classes.form}>
                <TextField
                    className={classes.input}
                    label="first"
                    name="first"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    className={classes.input}
                    label="last"
                    name="last"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    className={classes.input}
                    label="email"
                    name="email"
                    type="email"
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    className={classes.input}
                    label="password"
                    name="password"
                    type="password"
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
                    submit
                </Button>
            </div>
            <Link to="/login" className={classes.link}>
                Click here to log in!
            </Link>
        </div>
    );
}
