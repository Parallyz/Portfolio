import React from "react";

interface ModalProps {
  children: React.ReactNode;

  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const modalClassList = ["modal"];

  const dontCloseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__body" onClick={dontCloseHandler}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
