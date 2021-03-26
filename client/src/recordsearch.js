import { useDispatch, useSelector } from "react-redux";
import { getRecord } from "./actions";
import { Avatar } from "@material-ui/core";
export default function RecordSearch() {
    const dispatch = useDispatch();

    const results = useSelector(
        (state) => state.searchResults && state.searchResults
    );

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch(getRecord(e.target.value));
        }
    };

    return (
        <div>
            <h1>REcord Search</h1>
            <input onKeyDown={keyCheck}></input>
            {results &&
                results.map((record, index) => (
                    <div key={index}>
                        <Avatar src={record.cover_image}></Avatar>
                        <p>{record.title}</p>
                    </div>
                ))}
        </div>
    );
}
