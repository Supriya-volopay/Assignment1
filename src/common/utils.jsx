import { Slide, toast } from "react-toastify";
import Notification from "../Components/core/NotificationModal";

export const getNotification = ({ message, duration, bgColor, textColor }) => {
  const config = {
    transition: Slide,
    hideProgressBar: true,
    icon: false,
    closeButton: false,
    autoClose: duration,
  };
  return toast(
    <Notification
      message={message}
      bgColor={bgColor}
      textColor={textColor}
      duration={duration}
    />,
    config
  );
};
