import { Slide, toast } from "react-toastify";
import { info } from "../../constants/notification";
import Notification from "../../Components/core/NotificationModal";

export const getNotification = ({ message, duration, bgColor, textColor }) => {
  const config = {
    transition: Slide,
    hideProgressBar: false,
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

export const errorMessage = {
  message: info.ERROR.MESSAGE,
  duration: 3000,
  bgColor: info.ERROR.BG_COLOR,
  textColor: info.ERROR.TEXT_COLOR,
};

export const updateMessage = {
  message: info.UPDATE.MESSAGE,
  duration: 3000,
  bgColor: info.UPDATE.BG_COLOR,
  textColor: info.UPDATE.TEXT_COLOR,
};

export const addMessage = {
  message: info.ADD.MESSAGE,
  duration: 3000,
  bgColor: info.ADD.BG_COLOR,
  textColor: info.ADD.TEXT_COLOR,
};
