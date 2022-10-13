import Alert from "react-bootstrap/Alert";
import React from "react";

const ErrorBox = (props) => {
  return <Alert variant={props.variant || "info"}>{props.children}</Alert>;
};

export default ErrorBox;
