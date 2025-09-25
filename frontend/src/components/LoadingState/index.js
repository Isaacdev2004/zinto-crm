import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  Typography,
  Fade,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    minHeight: "100px",
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
  message: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
}));

const LoadingState = ({ message = "Loading...", size = 40 }) => {
  const classes = useStyles();

  return (
    <Fade in={true}>
      <Box className={classes.container}>
        <CircularProgress size={size} className={classes.progress} />
        <Typography variant="body2" className={classes.message}>
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default LoadingState;

