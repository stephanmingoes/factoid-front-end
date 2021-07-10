import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
  card: {
    backgroundColor: "rgb(57, 62, 70)",
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "300px",
    position: "relative",
    overflowY: "scroll",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "5px",
    right: "-15px",
    color: "white",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  like: {
    color: "white",
    marginRight: "5px",
  },
  title: {
    color: "white",
    padding: "0 16px",
  },
  white: {
    color: "white",
  },
  delete: {
    color: "#db0037",
  },
  dull: {
    color: "#00c9b8",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
});
