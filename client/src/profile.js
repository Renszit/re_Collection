import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile({ first, last, url, bio, setUser, toggle }) {
    return (
        <div>
            <ProfilePic toggle={toggle} width={220} height={220} url={url} />
            <h1>
                Profile of {first} {last}
            </h1>
            <BioEditor bio={bio} setUser={({bio:arg}) => setUser({bio: arg})} />
        </div>
    );
}
