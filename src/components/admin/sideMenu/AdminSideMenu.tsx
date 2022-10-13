import React, { ReactElement, useState } from "react";
import { adminRoutes } from "../../router/Router";
import SideMenuItem from "./SideMenuItem";

type AdminSideMenuProps = {
  children: ReactElement;
};

export function AdminSideMenu({ children }: AdminSideMenuProps) {
  const subNames = ["/settings"];

  const list = adminRoutes.filter((x) => subNames.some((v) => v !== x.path));

  const subList = adminRoutes.filter((x) => subNames.some((v) => v === x.path));

  return (
    <div className="admin">
      <div className="admin__sidemenu sidemenu">
        <div className="sidemenu__header ">
          <div className="header__img">
            <img src="./assets/img/admin/logo.png" />
          </div>
          <div className="header__title">Admin Dashboard</div>
        </div>
        <div className="sidemenu__list ">
          {list?.map((route) => (
            <SideMenuItem item={route} key={route.path} />
          ))}
        </div>
        <div className="sidemenu__sub-list">
          {subList?.map((route) => (
            <SideMenuItem item={route} key={route.path} />
          ))}
        </div>
      </div>
      <div className="admin__page">
        <div className="page__container">{children}</div>
      </div>
    </div>
  );
}
