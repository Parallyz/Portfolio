import React from "react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

function Modal({ children, title, onClose }: ModalProps) {
   
  const dontCloseHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__body" onClick={dontCloseHandler}>
        <h2 className="modal__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
