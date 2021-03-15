import axios from "./axios";
import { useEffect, useState } from "react";
import ProfilePic from "./profilePic";

export default function OtherProfile({ match, history }) {
    const [otherUser, setOtherUser] = useState({});

    useEffect(() => {
        axios
            .post("/getOtherProfileInfo", { id: match.params.id })
            .then(({ data }) => {
                if (!data.error) {
                    setOtherUser(data);
                } else {
                    history.push("/");
                }
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
            <ProfilePic width={200} height={200} url={otherUser.url} />
            <p>
                {otherUser.first} {otherUser.last}
            </p>
            <p>{otherUser.bio}</p>
        </div>
    );
}
