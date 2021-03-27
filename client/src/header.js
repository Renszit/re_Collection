import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    rotate: {
        width: 100,
        transition: "ease 3s",
    },
}));

export default function Header() {
    const classes = useStyles();
    const [rotation, setRotation] = useState(0);

    return (
        <div>
            <img
                onClick={() => setRotation(rotation + 360)}
                className={classes.rotate}
                style={{ transform: `rotate(${rotation}deg)` }}
                width={80}
                src="/img_474399.png"
            ></img>
        </div>
    );
}
