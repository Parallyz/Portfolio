import React from "react";

interface ButtonPagintationProps {
  disabled: boolean;
  onClick: () => void;
  img?: string;
  isMirroredImg?: boolean;
}

const ButtonPagintation = (props: ButtonPagintationProps) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.img && !props.isMirroredImg && (
        <img src={props.img} alt="pagintation img" />
      )}
      {props.img && props.isMirroredImg && (
        <img
          src={props.img}
          alt="pagintation img"
          style={{ transform: "rotate(180deg)" }}
        />
      )}
    </button>
  );
};

export default ButtonPagintation;
