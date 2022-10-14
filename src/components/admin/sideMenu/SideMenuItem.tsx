import { NavLink } from "react-router-dom";
import React from "react";
import { adminPath } from "../../../models/utils.model";

type SideMenuItemProps = {
  item: adminPath;
};
const SideMenuItem = ({ item }: SideMenuItemProps) => {
  return (
    <>
      <div className="sidemenu__item " key={item.path}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "sidemenu__link  sidemenu__link--active"
              : "sidemenu__link "
          }
        >
          <>
            <div className="sidemenu__img">
              <img src={item.icon} />
            </div>
            <div className="sidemenu__text">{item.name}</div>
          </>
        </NavLink>
      </div>
    </>
  );
};

export default SideMenuItem;
