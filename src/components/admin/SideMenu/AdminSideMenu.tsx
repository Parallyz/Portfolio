import  React from "react";
import { AdminSideMenuList } from "./AdminSideMenuList";

export function AdminSideMenu() {
  return (
    <div className="admin__sidemenu sidemenu">
      <div className="sidemenu__header header">
        <div className="header__container">
          <div className="header__img">
            <img src="../../../img/admin/logo.png" />
            <img src="../../../img/admin/svg/agent.svg" />
          </div>
          <div className="header__title">Admin Dashboard</div>
        </div>
      </div>
      <div className="sidemenu__list">
        <AdminSideMenuList />
      </div>
    </div>
  );
}
