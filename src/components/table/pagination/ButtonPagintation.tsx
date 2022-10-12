import React from "react";

interface ButtonPaginationProps {
  disabled: boolean;
  onClick: () => void;
  img?: string;
  isMirroredImg?: boolean;
}

const ButtonPagination = (props: ButtonPaginationProps) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.img && !props.isMirroredImg && (
        <img src={props.img} alt="pagination img" />
      )}
      {props.img && props.isMirroredImg && (
        <img
          src={props.img}
          alt="pagination img"
          style={{ transform: "rotate(180deg)" }}
        />
      )}
    </button>
  );
};

export default ButtonPagination;
