import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const messages = useSelector((state) => state.messages && state.messages);

    useEffect(() => {
        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, [messages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("my amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <h1>Chat room</h1>
            <div className="chat-container" ref={elemRef}>
                {messages &&
                    messages.map((message, index) => (
                        <div key={index}>
                            <p>
                                {message.first} {message.last} says:
                            </p>
                            <p>{message.message}</p>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="add your message here!"
                onKeyDown={keyCheck}
            ></textarea>
        </>
    );
}
