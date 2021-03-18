import { useState } from "react";
import axios from "./axios";
import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
export default function Uploader({ setUser, toggle }) {
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
        <Container fixed>
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
            >
                upload
            </Button>
        </Container>
    );
}
