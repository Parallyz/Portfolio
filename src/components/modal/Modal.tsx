import React, { useEffect } from "react";
import { useAppActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { isModal } = useAppSelector((state) => state.app);
  const { setStateModal: setStateModalModal } = useAppActions();

  const dontCloseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (isModal) document.body.classList.add("lock");
    else {
      document.body.classList.remove("lock");
    }
  }, [isModal]);

  return (
    <div
      className={isModal ? "modal" : "modal--hide"}
      onClick={() => {
        setStateModalModal(false);
      }}
    >
      <div className="modal__body" onClick={dontCloseHandler}>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Modal);
