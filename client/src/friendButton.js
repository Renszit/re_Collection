import { useEffect, useState } from "react";
import axios from "./axios";

const BUTTON_TEXT = {
    ACCEPT: "accept request",
    REQUEST: "request friendship",
    CANCEL: "cancel request",
    UNFRIEND: "unfriend",
};

function buttonTextAdapt(status) {
    let text = BUTTON_TEXT.REQUEST;
    console.log("status:", status);
    if (status.rows) {
        const { sender_id, accepted } = status.rows;
        const userId = status.userId;

        if (accepted) {
            text = BUTTON_TEXT.UNFRIEND;
            return text;
        } else if (sender_id == userId) {
            text = BUTTON_TEXT.CANCEL;
            return text;
        } else {
            text = BUTTON_TEXT.ACCEPT;
            return text;
        }
    }
    return text;
}

export default function FriendButton({ id }) {
    const [button, setButton] = useState();

    const handleClick = () => {
        console.log("eh?");
        axios
            .post("/addfriend/", { otherId: id, action: button })
            .then(({ data }) => {
                console.log(data);
                setButton(buttonTextAdapt(data));
            })
            .catch((err) =>
                console.log("something went wrong in handleclcik", err)
            );
    };

    useEffect(() => {
        axios
            .get(`/friendships/${id}`)
            .then(({ data }) => {
                setButton(buttonTextAdapt(data));
            })
            .catch((err) => {
                console.log("error in useEffect", err);
            });
    }, [id]);

    return (
        <div>
            <button onClick={() => handleClick()}>{button}</button>
        </div>
    );
}
