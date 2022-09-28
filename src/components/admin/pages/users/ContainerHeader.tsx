import React from "react";

import Filter from "../../../../assets/img/admin/svg/filter.svg";
import Plus from "../../../../assets/img/admin/svg/plus.svg";

interface ContainerHeaderProps {
  nameClass: string;
  title: string;
}
const ContainerHeader = ({ nameClass, title }: ContainerHeaderProps) => {
  return (
    <div className={`${nameClass}__header`}>
      <h1>All {title}</h1>
      <div className={`${nameClass}__sort`}>
        <button>
          <img src={Plus} className="img__svg " />
          Add
        </button>
        <button>
          <img src={Filter} className="img__svg" />
          Filter
        </button>
      </div>
    </div>
  );
};

export default ContainerHeader;
