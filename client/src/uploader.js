import { useState } from "react";
import axios from "./axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    paper: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        width: 400,
        position: "absolute",
        zIndex: 1,
    },
}));

export default function Uploader({ setUser, toggle }) {
    const classes = useStyles();
    const [image, setImage] = useState();

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleClick = () => {
        const formData = new FormData();
        formData.append("image", image);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                setUser(data);
                toggle();
            })
            .catch((err) => {
                console.error("something went wrong with uploading image", err);
            });
    };

    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper} elevation={1}>
                <Typography variant="headline" component="h1" color="initial">
                    upload your picture here
                </Typography>
                <input
                    onChange={(e) => handleChange(e)}
                    name="image"
                    type="file"
                    accept="image/*"
                ></input>
                <Button
                    onClick={() => handleClick()}
                    variant="contained"
                    color="default"
                >
                    upload
                </Button>
            </Paper>
        </Container>
    );
}
