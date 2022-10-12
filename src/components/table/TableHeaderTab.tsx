import React from "react";

interface TableHeaderTabProps {
  img?: string;
  name: string;
  isActive?: boolean;
  isIncrease?: boolean;

  clickEvent?: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  index: number;
}

const TableHeaderTab = ({
  img,
  name,
  isActive,
  clickEvent,
  isIncrease,
  index,
}: TableHeaderTabProps) => {
  return (
    <th className="header__block">
      <button
        className={isActive ? "header--active" : ""}
        onClick={(e) => clickEvent(e, index)}
      >
        <img
          src={img}
          className="img--svg"
          style={{
            transform:
              isIncrease && isActive ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
        {name}
      </button>
    </th>
  );
};

export default TableHeaderTab;
