import React, { ReactElement } from "react";
import { AdminSideMenuList } from "./AdminSideMenuList";
import Logo from "../../../assets/img/admin/logo.png";

type AdminSideMenuProps = {
  children: ReactElement;
};

export function AdminSideMenu(props: AdminSideMenuProps) {
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
        <div className="sidemenu__list">
          <AdminSideMenuList />
        </div>
      </div>
    </div>
  );
}
