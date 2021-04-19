import { useEffect } from "react";
import { getFavouriteRecords } from "./actions";
import { useDispatch, useSelector } from "react-redux";

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
                        <img src={fav.image}></img>
                        <p>Your comment: {fav.comment}</p>
                    </div>
                ))}
        </div>
    );
}
