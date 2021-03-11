import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    image: {
        width: 80,
        borderRadius: "50%",
    },
}));

export default function ProfilePic({ url, toggle }) {
    const classes = useStyles();

    console.log("props in ProfilePic: ", url);
    url = url || "missing.jpg";

    return (
        <div>
            <img onClick={toggle} className={classes.image} src={url} alt="profilepicture"></img>
        </div>
    );
}
