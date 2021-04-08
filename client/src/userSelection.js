import { useSelector } from "react-redux";
import { Paper, makeStyles, Button, TextField } from "@material-ui/core";
import { useState } from "react";
import axios from "./axios";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: 20,
        marginTop: 20,
    },
    image: {
        width: "100%",
        height: 400,
        objectFit: "contain",
    },
}));

export default function UserSelection() {
    const classes = useStyles();
    const [favourite, setFavourite] = useState(false);
    const [comment, setComment] = useState();
    const result = useSelector(
        (state) => state.selectedRecord && state.selectedRecord
    );
    const coverImage = useSelector(
        (state) => state.cover_image && state.cover_image
    );

    const handleClick = () => {
        console.log(comment);
        axios
            .post("/favouriteAddition", {
                comment: comment,
                recordId: result.id,
                image: coverImage,
                type: result.type,
            })
            .then((res) => console.log(res))
            .catch((err) => {
                console.log("error in posting comment", err);
            });
    };

    return (
        <div>
            {result && (
                <div>
                    <Paper className={classes.paper} elevation={1}>
                        {coverImage && (
                            <img
                                className={classes.image}
                                src={coverImage}
                            ></img>
                        )}
                    </Paper>
                    <Paper className={classes.paper} elevation={1}>
                        {result.name && <h1>{result.name}</h1>}
                        {result.profile && <p>{result.profile}</p>}
                        {result.title && <h1>{result.title}</h1>}
                        {result.year && <p>{result.year}</p>}
                        {result.artists && <p>{result.artists[0].name}</p>}
                    </Paper>
                    <div>
                        {!favourite && (
                            <Button
                                onClick={() => setFavourite(!favourite)}
                                variant="text"
                                color="default"
                            >
                                Favourite
                            </Button>
                        )}
                        {favourite && (
                            <TextField
                                label="add a comment"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        )}
                        {favourite && (
                            <Button
                                onClick={() => handleClick()}
                                variant="text"
                                color="default"
                            >
                                Add favourite
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
