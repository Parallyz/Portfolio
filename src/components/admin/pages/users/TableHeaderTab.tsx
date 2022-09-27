import React from "react";

interface TableHeaderTabProps {
  img?: string;
  name: string;
  isActive?: boolean;
  onClick?: React.MouseEvent<HTMLButtonElement>;
}

const TableHeaderTab = ({
  img,
  name,
  isActive,
  onClick,
}: TableHeaderTabProps) => {
  return (
    <div className="header__block">
      <button className={isActive ? "active" : ""} onClick={() => onClick}>
        {img && <img src={img} className="img-svg" />}
        {name}
      </button>
    </div>
  );
};

export default TableHeaderTab;
