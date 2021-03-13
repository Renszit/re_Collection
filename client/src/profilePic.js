import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    image: {
        objectFit: "cover",
        borderRadius: "50%",
    },
}));

export default function ProfilePic({ url, toggle, width, height }) {
    const classes = useStyles();

    // console.log("props in ProfilePic: ", url);
    url = url || "missing.jpg";

    return (
        <div>
            <img
                width={width}
                height={height}
                onClick={toggle}
                className={classes.image}
                src={url}
                alt="profilepicture"
            ></img>
        </div>
    );
}
