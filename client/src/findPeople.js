import axios from "./axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!search) {
            axios
                .get("/recentUsers")
                .then(({ data }) => setResults(data))
                .catch((err) => console.log(err));
        } else {
            axios
                .post("/searchUsers", { val: search })
                .then(({ data }) => setResults(data));
        }
    }, [search]);   

    return (
        <div>
            <h1>FindPeople</h1>
            <h3>search for users:</h3>
            <div>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="search"
                ></input>
                {!search && <h3>recent joiners:</h3>}
                {search && <h3> search results: </h3>}
                {results.map((user, index) => (
                    <div key={index}>
                        <Link to={`/users/${user.id}`}>
                            <p>
                                {user.first} {user.last}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
