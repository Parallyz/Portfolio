import React, { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const dontCloseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={isOpen ? "modal" : "modal--hide"} onClick={onClose}>
      <div className="modal__body" onClick={dontCloseHandler}>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Modal);
