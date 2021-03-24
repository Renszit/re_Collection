import { useState, useEffect } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
// import Card from "@material-ui/core/Card";

export default function BioEditor({ bio, setUser }) {
    const [textAreaVisible, setTextArea] = useState(false);
    const [buttonValue, setButtonValue] = useState("Edit bio");
    const [temp, setTemp] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!bio) {
            setButtonValue("Add bio");
        } else {
            setButtonValue("Edit bio");
        }
    }, [bio]);

    const handleClick = () => {
        axios.post("/updateBio", temp).then(({ data }) => {
            if (data.success) {
                setUser({ bio: data.bio });
                setTextArea(false);
            } else {
                setError(true);
                setTextArea(false);
            }
        });
    };

    const handleChange = (e) => {
        setTemp({ bio: e.target.value });
        console.log(temp);
    };

    return (
        <div>
            {error && <p>something broke</p>}
            <Typography variant="h5" color="initial">
                {bio}
            </Typography>
            {textAreaVisible && (
                <TextField
                    id="textfield"
                    label="bio"
                    size="large"
                    fullWidth
                    onChange={(e) => handleChange(e)}
                />
            )}
            {!textAreaVisible && (
                <Button
                    onClick={() => {
                        setTextArea(!textAreaVisible);
                    }}
                    variant="contained"
                    color="default"
                >
                    {buttonValue}
                </Button>
            )}
            {textAreaVisible && (
                <Button
                    onClick={() => {
                        handleClick();
                    }}
                    variant="contained"
                    color="default"
                >
                    send this to the cloud
                </Button>
            )}
        </div>
    );
}
