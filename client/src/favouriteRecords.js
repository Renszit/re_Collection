import { useEffect } from "react";
import { getFavouriteRecords } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
export default function FavouriteRecords() {
    const dispatch = useDispatch();
    const favRecords = useSelector(
        (state) => state.favouriteRecords && state.favouriteRecords
    );

    useEffect(() => {
        dispatch(getFavouriteRecords());
    }, []);

    return (
        <div>
            <h1>your favourites:</h1>
            {favRecords &&
                favRecords.map((fav, index) => (
                    <div key={index}>
                        <Avatar src={fav.image}></Avatar>
                        <p>{fav.comment}</p>
                    </div>
                ))}
        </div>
    );
}
