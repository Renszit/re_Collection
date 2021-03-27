import { useDispatch, useSelector } from "react-redux";
import { getRecord, getSelection } from "./actions";
import { Avatar, makeStyles, Paper } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    avatar: {
        width: 150,
        height: 150,
    },
    paper: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    singleResult: {
        margin: 30,
        width: 150,
        height: 200,
        overflow: "hidden",
    },
}));

export default function RecordSearch() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectState, setSelectState] = useState("artist");
    const results = useSelector(
        (state) => state.searchResults && state.searchResults
    );

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch(getRecord(e.target.value, selectState));
        }
    };

    const handleClick = (artist, master) => {
        if (selectState == "release") {
            dispatch(getSelection(master));
        } else {
            dispatch(getSelection(artist));
            console.log("state", selectState);
        }
    };

    return (
        <div>
            <h1>Record Search</h1>
            <input onKeyDown={keyCheck}></input>
            <select
                onChange={(e) => setSelectState(e.target.value)}
                name="type"
            >
                <option value="artist">Artist</option>
                <option value="release">Release</option>
                <option value="label">Label</option>
            </select>
            <Paper className={classes.paper}>
                {results &&
                    results.map((record, index) => (
                        <div className={classes.singleResult} key={index}>
                            <Link
                                to="/userselection"
                                onClick={() => {
                                    handleClick(
                                        record.resource_url,
                                        record.master_url
                                    );
                                }}
                            >
                                <Avatar
                                    className={classes.avatar}
                                    src={
                                        record.cover_image || "./img_474399.png"
                                    }
                                ></Avatar>
                                <p>{record.title}</p>
                            </Link>
                        </div>
                    ))}
            </Paper>
        </div>
    );
}
