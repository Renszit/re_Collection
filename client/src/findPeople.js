import axios from "./axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
    Paper,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    card: {
        maxWidth: 330,
        margin: 20,
    }
});

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
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={user.url || "./missing.jpg"}
                                title={user.first}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {user.first} {user.last}
                                </Typography>
                                <Typography component="Lizard">
                                    {user.bio}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to={`/users/${user.id}`}>
                                <Button size="small" color="primary">
                                    see user
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>

                    {/* <Link to={`/users/${user.id}`}>
                        <ProfilePic width={60} height={60} url={user.url} />
                        <Typography variant="body1" color="initial">
                            {user.first} {user.last}
                        </Typography>
                    </Link> */}
                </div>
            ))}
        </div>
    );
}
