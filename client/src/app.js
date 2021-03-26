import axios from "./axios";
import { useEffect, useState } from "react";
import MenuBar from "./menuBar";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import { BrowserRouter, Route } from "react-router-dom";
import FindPeople from "./findPeople";
import Container from "@material-ui/core/Container";
// import Friends from "./friends";
import Chat from "./chat";


export default function App() {
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
        <BrowserRouter>
            <MenuBar
                first={user.first}
                url={user.url}
                toggle={() => toggleUploader()}
            />
            {uploader && (
                <Uploader
                    toggle={() => toggleUploader()}
                    setUser={({ url: arg }) => setUser({ ...user, url: arg })}
                />
            )}
            <Container maxWidth="md">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Profile
                            toggle={() => toggleUploader()}
                            first={user.first}
                            last={user.last}
                            url={user.url}
                            bio={user.bio}
                            setUser={({ bio: bio }) =>
                                setUser({ ...user, bio: bio })
                            }
                        />
                    )}
                />
                <Route path="/chatters" component={Chat} />

                <Route
                    path="/users/:id"
                    render={(props) => (
                        <OtherProfile
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />

                <Route path="/findpeople" render={() => <FindPeople />} />
            </Container>
        </BrowserRouter>
    );
}
