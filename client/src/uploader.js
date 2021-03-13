import { useState } from "react";
import axios from "./axios";

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
        <div>
            <h1>upload your picture here</h1>
            <input
                onChange={(e) => handleChange(e)}
                name="image"
                type="file"
                accept="image/*"
            ></input>
            <button onClick={() => handleClick()}>upload</button>
        </div>
    );
}
