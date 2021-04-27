import axios from "./axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function FindPeople() {
    const classes = useStyles();
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!search) {
            axios
                .get("/recentUsers")
                .then(({ data }) => setResults(data))
                .catch((err) =>
                    console.error("error in getting recent users", err)
                );
        } else {
            axios
                .get("/searchUsers/" + search)
                .then(({ data }) => setResults(data))
                .catch((err) =>
                    console.error("error in getting searched users", err)
                );
        }
    }, [search]);

    return (
        <div>
            <Paper elevation={1}>
                <Typography variant="h4" color="initial">
                    Find friends here
                </Typography>
                <Typography variant="h5" color="initial">
                    search for users:
                </Typography>
            </Paper>
            <TextField
                id="textfield"
                label="search"
                onChange={(e) => setSearch(e.target.value)}
            />

            {!search && (
                <Typography variant="h5" color="initial">
                    recent joiners:
                </Typography>
            )}
            {search && (
                <Typography variant="h5" color="initial">
                    search results:
                </Typography>
            )}

            {results.map((user, index) => (
                <div key={index}>
                    <Link to={`/users/${user.id}`}>{user.first}</Link>
                </div>
            ))}
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});
