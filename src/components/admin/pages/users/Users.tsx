import React from "react";
import Alert from "../../../alert/Alert";
import AdminHeader from "../../AdminHeader";
import UserTable from "./UserTable";

const Users = () => {
  return (
    <>
      <AdminHeader title="Users" />
      <UserTable />
      <Alert />
    </>
  );
};

export default Users;
