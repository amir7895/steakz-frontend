import React from "react";
import "./Toast.css"; // Ensure you create a corresponding CSS file for styling

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
