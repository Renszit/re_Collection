import { useState, useEffect } from "react";
import axios from "./axios";

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
            <h1>Bio:</h1>
            {error && <p>something broke</p>}
            <p>{bio}</p>
            {textAreaVisible && (
                <textarea
                    name="bio"
                    onChange={(e) => handleChange(e)}
                    placeholder={bio}
                />
            )}

            {!textAreaVisible && (
                <button
                    onClick={() => {
                        setTextArea(!textAreaVisible);
                    }}
                >
                    {buttonValue}
                </button>
            )}
            {textAreaVisible && (
                <button
                    onClick={() => {
                        handleClick();
                    }}
                >
                    send this to the cloud
                </button>
            )}
        </div>
    );
}
