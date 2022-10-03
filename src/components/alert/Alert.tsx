import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAppActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { AlertType } from "../../models/models";

const Alert = () => {
  const { isError, alert, alertType } = useAppSelector((state) => state.app);
  const { hideError } = useAppActions();

  useEffect(() => {
    if (isError) {
      switch (alertType) {
        case AlertType.Error:
          toast.error(alert, {
            autoClose: 5000,
            theme: "colored",
          });
          break;
        case AlertType.Info:
          toast.info(alert, {
            autoClose: 5000,
            theme: "colored",
          });
          break;
        case AlertType.Success:
          toast.success(alert, {
            autoClose: 5000,
            theme: "colored",
          });
          break;
        case AlertType.Warning:
          toast.warning(alert, {
            autoClose: 5000,
            theme: "colored",
          });
          break;
        default:
          toast.error(alert, {
            theme: "colored",
            autoClose: 5000,
          });
      }
      const time = setTimeout(() => {
        hideError();
      }, 5000);
      return () => {
        clearTimeout(time);
      };
    }
  }, [isError]);
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default React.memo(Alert);
