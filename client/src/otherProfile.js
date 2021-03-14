import axios from "./axios";
import { useEffect, useState } from "react";

export default function OtherProfile({ match }) {
    const [otherUser, setOtherUser] = useState({});

    useEffect(() => {
        axios
            .post("/getOtherProfileInfo", { id: match.params.id })
            .then(({ data }) => {
                setOtherUser(data);
            })
            .catch((err) =>
                console.log(
                    "something went wrong in axios request get other profule",
                    err
                )
            );
    }, [null]);

    return (
        <div>
            <h1>otherProfile</h1>
            <img src={otherUser.url}></img>
            <p>
                {otherUser.first} {otherUser.last}
            </p>
            <p>{otherUser.bio}</p>
        </div>
    );
}
