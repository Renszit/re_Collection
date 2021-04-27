import { useEffect } from "react";
import { getFavouriteRecords } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

export default function FavouriteRecords() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const favRecords = useSelector(
        (state) => state.favouriteRecords && state.favouriteRecords
    );

    useEffect(() => {
        dispatch(getFavouriteRecords());
    }, []);

    const handleClick = (id) => {
        console.log("hi", id);
    };

    return (
        <div>
            <h1>your favourites:</h1>
            <div className={classes.favouriteContainer}>
                {favRecords &&
                    favRecords.map((fav, index) => (
                        <div className={classes.singleFavourite} key={index}>
                            <img
                                onClick={() => handleClick(fav.record_id)}
                                className={classes.image}
                                src={fav.image}
                            ></img>
                            <p className={classes.comment}>{fav.comment}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    favouriteContainer: {
        display: "flex",
        flexWrap: "wrap",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        // margin: 0,
        // border: 10,
    },
    singleFavourite: {
        width: 200,
        height: 200,
        margin: 20,
        padding: 10,
    },
    image: {
        width: 200,
        borderRadius: "50% 50% 50% 50% / 73% 48% 52% 27% ",
        height: 200,
        objectFit: "cover",
        boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    },
    comment: {
        fontFamily: "Quicksand",
        textAlign: "center",
    },
});
