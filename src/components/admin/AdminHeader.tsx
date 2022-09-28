import React, { ReactElement, useState } from "react";
import Search from "../../assets/img/admin/svg/search.svg";
import Notification from "../../assets/img/admin/svg/notification.svg";
import Avatar from "../../assets/img/admin/avatar.png";

interface AdminHeaderProps {
  title: string;
  children?: ReactElement;
}

const AdminHeader = ({ title, children }: AdminHeaderProps) => {
  const [isNotification, SetisNotification] = useState(true);

  return (
    <header className="header">
      <div className="header__title">{title}</div>
      <div className="header__content">
        <div className="header__btns ">
          <div className="header__btns-search">
            <button>
              <img src={Search} className="img__svg" />
            </button>
          </div>
          <div className="header__btns-notifications notification">
            <button>
              <img src={Notification} className="img__svg" />
              {isNotification && <div className="notification__count"></div>}
            </button>
          </div>
        </div>
        <div className="header__user">
          <div className="header__user-name">Jones Ferdinand</div>

          <button className="header__user-img">
            <img src={Avatar} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
