import Header from "./header";
import axios from "./axios";
import { useEffect, useState } from "react";
import ProfilePic from "./profilePic";
import { makeStyles } from "@material-ui/core/styles";
import Uploader from "./uploader";
import Profile from "./profile";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
    },
}));

export default function App() {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [uploader, setUploader] = useState(false);

    const toggleUploader = () => {
        setUploader(!uploader);
    };

    useEffect(() => {
        axios
            .get("/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) =>
                console.error("something went wrong on mount/useEffect", err)
            );
    }, [null]);

    return (
        <div>
            <div className={classes.header}>
                <Header />
                <h1>
                    Hi {user.first} {user.last}! Welcome to recollection.
                </h1>
                <ProfilePic
                    width={80}
                    height={80}
                    url={user.url}
                    toggle={() => toggleUploader()}
                />
            </div>
            {uploader && (
                <Uploader
                    toggle={() => toggleUploader()}
                    setUser={({ url: arg }) => setUser({ url: arg })}
                />
            )}
            <Profile
                toggle={() => toggleUploader()}
                first={user.first}
                last={user.last}
                url={user.url}
                bio={user.bio}
                setUser={({ bio: bio }) => setUser({ ...user, bio: bio })}
            />
        </div>
    );
}
