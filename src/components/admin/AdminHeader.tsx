import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import Search from "../../assets/img/admin/svg/search.svg";
import Notification from "../../assets/img/admin/svg/notification.svg";
import Avatar from "../../assets/img/admin/avatar.png";
import { useDebounce } from "../../hooks/debounce";
import { useAppActions } from "../../hooks/actions";

interface AdminHeaderProps {
  title: string;
  children?: ReactElement;
  isNotification?: boolean;
}

const AdminHeader = ({ title, children, isNotification }: AdminHeaderProps) => {
  const [searchClick, setIsSearchClick] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 1000);

  const { setSearchField } = useAppActions();

  useEffect(() => {
    setSearchField(debounceSearch.toString());
  }, [debounceSearch]);

  return (
    <header className="header">
      <div className="header__title">{title}</div>
      <div className="header__content">
        <div className="header__input">
          <input
            className=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="header__btns ">
          <div className="header__btns-search">
            <button
            //onClick={() => {
            //  searchHandler;
            //}}
            >
              <img src={Search} className="img__svg img__svg--green" />
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
