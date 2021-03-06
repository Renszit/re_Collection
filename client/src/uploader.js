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
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: 300,
        position: "absolute",
        zIndex: 1,
    },
    button: {
        margin: 10,
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
        // console.log("formData", formData, image);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                // console.log(formData);
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
                <Typography variant="h5" color="initial">
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
                    className={classes.button}
                >
                    upload
                </Button>
            </Paper>
        </Container>
    );
}
