import axios from "axios";
import { useState } from "react";

export default function Registration() {
    const [form, setForm] = useState({
        first: "",
        last: "",
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
            .post("/register", form)
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
            <h1>registration component</h1>

            <input
                onChange={(e) => handleChange(e)}
                name="first"
                placeholder="first name"
                type="text"
            />
            <input
                onChange={(e) => handleChange(e)}
                name="last"
                placeholder="last name"
                type="text"
            />
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
        </div>
    );
}
