import React from "react";

interface TableHeaderTabProps {
  img?: string;
  name: string;
  isActive?: boolean;
  isIncrise?: boolean;

  clickEvent?: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  index: number;
}

const TableHeaderTab = ({
  img,
  name,
  isActive,
  clickEvent,
  isIncrise,
  index,
}: TableHeaderTabProps) => {
  return (
    <div className="header__block">
      <button
        className={isActive ? "header__active" : ""}
        onClick={(e) => clickEvent(e, index)}
      >
        <img
          src={img}
          className="img-svg"
          style={{
            transform:
              isIncrise && isActive ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
        {name}
      </button>
    </div>
  );
};

export default TableHeaderTab;
