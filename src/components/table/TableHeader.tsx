import React from "react";

interface ContainerHeaderProps {
  title: string;
}
const TableHeader = ({ title }: ContainerHeaderProps) => {
  return (
    <div className="table__header">
      <h1>All {title}</h1>
      <div className="table__manage">
        <button>
          <img src="./assets/img/admin/svg/plus.svg" className="img--svg " />
          Add
        </button>
        <button>
          <img src="./assets/img/admin/svg/filter.svg" className="img--svg " />
          Filter
        </button>
      </div>
    </div>
  );
};

export default React.memo(TableHeader);
