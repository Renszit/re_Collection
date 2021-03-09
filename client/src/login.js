import axios from "./axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log(form);
    };

    const handleClick = () => {
        console.log(form);
        axios
            .post("/login", form)
            .then((res) => {
                location.replace("/");
                console.log(res);
            })
            .catch((err) => {
                console.log("error in axios registration", err), setError(true);
            });
    };

    return (
        <div>
            {error && <p>something broke</p>}
            <h1>Login component</h1>
            <input
                onChange={(e) => handleChange(e)}
                name="email"
                placeholder="email"
                type="text"
                autoComplete="email"
            />
            <input
                onChange={(e) => handleChange(e)}
                name="password"
                placeholder="password"
                type="password"
                autoComplete="current-password"
            />
            <button onClick={(e) => handleClick(e)}>submit</button>
            <Link to="/">Click here to register</Link>
            <Link to="/reset-password">Forgot your password?</Link>
        </div>
    );
}
