import axios from "./axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function FindPeople() {
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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h2" color="initial">
                        FindPeople
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color="initial">
                        search for users:
                    </Typography>
                </Grid>
                <div>
                    <Grid item xs={12}>
                        <TextField
                            id="textfield"
                            label="search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                                <Link to={`/users/${user.id}`}>
                                    <ProfilePic
                                        width={60}
                                        height={60}
                                        url={user.url}
                                    />
                                    <Typography variant="body1" color="initial">
                                        {user.first} {user.last}
                                    </Typography>
                                </Link>
                            </div>
                        ))}
                    </Grid>
                </div>
            </Grid>
        </div>
    );
}
