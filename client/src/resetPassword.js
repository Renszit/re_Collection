import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "./axios";

export default function ResetPassword() {
    const [state, setState] = useState(1);
    const [form, setForm] = useState({
        email: "",
        code: "",
        password: "",
        userId: ""
    });
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    const handleClick = () => {
        if (state == 1) {
            axios
                .post("/password/reset/start", form)
                .then((res) => {
                    setState(2);
                    console.log(res);
                })
                .catch((err) => {
                    setError(true);
                    console.log("error in password reset start", err);
                });
        } else {
            axios
                .post("/password/reset/verify", form)
                .then((res) => {
                    setState(3);
                    console.log(res);
                })
                .catch((err) => {
                    setError(true);
                    console.log("error in password reset verify", err);
                });
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {error && <p>something broke</p>}
            {state == 1 && (
                <div>
                    <input
                        onChange={(e) => handleChange(e)}
                        name="email"
                        placeholder="email"
                        type="text"
                        autoComplete="email"
                    />
                    <button onClick={(e) => handleClick(e)}>
                        send reset email
                    </button>
                    <Link to="/login">go to login</Link>
                </div>
            )}
            {state == 2 && (
                <div>
                    <input
                        onChange={(e) => handleChange(e)}
                        name="code"
                        placeholder="code"
                        type="text"
                    />
                    <input
                        onChange={(e) => handleChange(e)}
                        name="password"
                        placeholder="new password"
                        type="text"
                    />
                    <button onClick={(e) => handleClick(e)}>
                        change password
                    </button>
                </div>
            )}
            {state == 3 && (
                <div>
                    <h1>success!</h1>
                    <Link to="/login">Go back to login</Link>
                </div>
            )}
        </div>
    );
}
