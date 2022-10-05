import React from "react";
import Alert from "../../../alert/Alert";
import AdminHeader from "../../AdminHeader";
import UserTable from "./UserTable";

const UsersPage = () => {
  return (
    <>
      <AdminHeader title="Users" />
      <UserTable />
      <Alert />
    </>
  );
};

export default UsersPage;
