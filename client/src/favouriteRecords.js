import { useEffect } from "react";
import { getFavouriteRecords } from "./actions";
import { useDispatch } from "react-redux";

export default function FavouriteRecords() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavouriteRecords());
    });

    return <h1>your favourite records:</h1>;
}
