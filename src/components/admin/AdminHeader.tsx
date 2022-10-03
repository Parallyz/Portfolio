import React, { ReactElement, useEffect, useState } from "react";
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
        {/*<div className="header__input">
          <input
            className=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>*/}

        <div className="header__btns ">
          <div>
            <button
            //onClick={() => {
            //  searchHandler;
            //}}
            >
              <img
                src="./assets/img/admin/svg/search.svg"
                className="img--svg img--svg--green"
              />
            </button>
          </div>
          <div className=" notification">
            <button>
              <img
                src="assets/img/admin/svg/notification.svg"
                className="img--svg"
              />
              {isNotification && <div className="notification__count"></div>}
            </button>
          </div>
        </div>
        <div className="header__user">
          <div className="user__name">Vladyslav Verus</div>

          <button className="user__img">
            <img src="./assets/img/admin/avatar.png" alt="avatar" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
