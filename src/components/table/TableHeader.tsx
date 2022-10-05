import React from "react";
import { useAppActions } from "../../hooks/actions";

interface ContainerHeaderProps {
  title: string;
}
const TableHeader = ({ title }: ContainerHeaderProps) => {
  const { setStateModal: setStateModalModal } = useAppActions();

  return (
    <div className="table__header">
      <h1>All {title}</h1>
      <div className="table__manage">
        <button onClick={() => setStateModalModal(true)}>
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
