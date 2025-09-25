import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    padding: theme.spacing(3),
    textAlign: "center",
  },
  icon: {
    fontSize: 48,
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
    color: theme.palette.error.main,
  },
  message: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ onRetry, error }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <ErrorOutlineIcon className={classes.icon} />
      <Typography variant="h6" className={classes.title}>
        Something went wrong
      </Typography>
      <Typography variant="body2" className={classes.message}>
        We encountered an unexpected error. Please try refreshing the page.
      </Typography>
      {process.env.NODE_ENV === "development" && error && (
        <Paper 
          style={{ 
            marginBottom: 16, 
            textAlign: "left", 
            padding: 16, 
            backgroundColor: "#ffebee",
            border: "1px solid #f44336"
          }}
        >
          <Typography variant="caption" style={{ color: "#d32f2f" }}>
            {error.toString()}
          </Typography>
        </Paper>
      )}
      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={onRetry}
        className={classes.button}
      >
        Try Again
      </Button>
    </Paper>
  );
};

export default ErrorBoundary;

