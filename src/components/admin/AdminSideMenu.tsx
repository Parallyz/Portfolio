import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/admin/logo.png";
import { adminRoutes } from "../router/Router";
import SideMenuItem from "./SideMenuItem";

type AdminSideMenuProps = {
  children: ReactElement;
};

export function AdminSideMenu({ children }: AdminSideMenuProps) {


  const subNames = ["/settings"];

  const list = adminRoutes.filter((x) => subNames.some((v) => v !== x.path));
  const sublist = adminRoutes.filter((x) => subNames.some((v) => v === x.path));



  return (
    <div className="admin">
      <div className="admin__sidemenu sidemenu">
        <div className="sidemenu__header header">
          <div className="header__container">
            <div className="header__img">
              <img src={Logo} />
            </div>
            <div className="header__title">Admin Dashboard</div>
          </div>
        </div>
        <div className="sidemenu__list ">
          {list?.map(
            (route) =>
              route.path !== "*" && (
                <SideMenuItem item={route} key={route.path} />
              )
          )}
        </div>
        <div className="sidemenu__sub-list">
          {sublist?.map((route) => (
            <SideMenuItem item={route} key={route.path} />
          ))}
        </div>
      </div>
      <div className="admin__page">
        <div className="admin__container">{children}</div>
      </div>
    </div>
  );
}
