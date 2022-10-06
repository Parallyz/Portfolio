import React, { useEffect } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAppActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { AlertType } from "../../models/models";

interface AlertProps {
  delayToClose?: number;
}

const Alert = ({ delayToClose = 5000 }: AlertProps) => {
  const { alert } = useAppSelector((state) => state.app);
  const { setStateAlert } = useAppActions();
  const toastParams: ToastOptions = {
    autoClose: delayToClose,
    theme: "colored",
    pauseOnHover: false,
  };
  useEffect(() => {
    if (alert.isShow) {
      switch (alert.type) {
        case AlertType.Error:
          toast.error(alert.text, toastParams);
          break;
        case AlertType.Info:
          toast.info(alert.text, toastParams);
          break;
        case AlertType.Success:
          toast.success(alert.text, toastParams);
          break;
        case AlertType.Warning:
          toast.warning(alert.text, toastParams);
          break;
        default:
          toast.error(alert.text, toastParams);
      }
      const time = setTimeout(() => {
        setStateAlert({ ...alert, isShow: false });
      }, delayToClose);
      return () => {
        clearTimeout(time);
      };
    }
  }, [alert.isShow]);

  return <ToastContainer />;
};

export default React.memo(Alert);
