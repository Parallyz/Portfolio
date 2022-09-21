import React, { useState } from "react";
import { Link } from "react-router-dom";

import { adminPath } from "../../models/models";

type SideMenuItemProps = {
   item: adminPath;
  
};
const SideMenuItem = ({ item }: SideMenuItemProps) => {
 

  function clickHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    document.querySelectorAll(".sidemenu__link").forEach((e) => {
      e.classList.remove("sidemenu__link--active");
    });

    event.currentTarget.classList.add("sidemenu__link--active");
  }
  return (
    <>
      <div className="sidemenu__item " key={item.path}>
        <Link to={item.path} className="sidemenu__link " onClick={clickHandler}>
          <div className="sidemenu__img">
            <img src={item.icon} />
          </div>
          <div className="sidemenu__text">{item.name}</div>
        </Link>
      </div>
    </>
  );
};

export default SideMenuItem;
