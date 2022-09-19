import React from "react";

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return <div>{error}</div>;
}

export default ErrorMessage;
