import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    rotate: {
        transition: "ease 3s",
        outline: "1px solid transparent",
    },
}));

export default function Header({ width, src }) {
    const classes = useStyles();
    const [rotation, setRotation] = useState(0);

    return (
        <div>
            <img
                onClick={() => setRotation(rotation + 360)}
                className={classes.rotate}
                style={{ transform: `rotate(${rotation}deg)` }}
                width={width}
                src={src}
            ></img>
        </div>
    );
}
