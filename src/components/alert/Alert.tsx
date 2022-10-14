import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

import { AlertType } from "../../models/utils.model";
import { useAppActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";

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
    onClose(props) {
      setStateAlert({ ...alert, isShow: false });
    },
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
    }
  }, [alert.isShow]);

  return <ToastContainer />;
};

export default React.memo(Alert);
