import React, { useState, useEffect } from "react";

const Notification = ({ message, duration, bgColor, textColor }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    isVisible && (
      <div
        className={`${bgColor} ${textColor} p-4 rounded-lg relative shadow-lg transition-opacity  opacity-100`}
      >
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
