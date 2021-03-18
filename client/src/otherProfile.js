import axios from "./axios";
import { useEffect, useState } from "react";
import ProfilePic from "./profilePic";
import FriendButton from "./friendButton";
import Typography from "@material-ui/core/Typography";

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
            <Typography variant="h3" color="initial">
                {otherUser.first} {otherUser.last}
            </Typography>
            <ProfilePic width={200} height={200} url={otherUser.url} />

            <p>{otherUser.bio}</p>
            <FriendButton id={match.params.id} />
        </div>
    );
}
