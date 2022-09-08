import React from "react";

interface ModalProps{
   children:React.ReactNode
}


function Modal({children}: ModalProps) {
   return <>
     
      {children}
  </>;
}

export default Modal;
