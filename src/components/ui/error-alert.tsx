import classes from "./error-alert.module.css";

function ErrorAlert(props: { children: JSX.Element }) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
