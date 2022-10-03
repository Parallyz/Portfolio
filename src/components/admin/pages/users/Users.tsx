import React from "react";
import AdminHeader from "../../AdminHeader";
import UserTable from "./UserTable";

const Users = () => {
  return (
    <>
      <AdminHeader title="Users" />
      <UserTable />
    </>
  );
};

export default Users;
