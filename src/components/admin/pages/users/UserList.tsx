import React from "react";
import { User } from "../../../../models/models";
import UserItem from "./UserItem";

interface UserListProps {
  data: User[];
}

const UserList = ({ data }: UserListProps) => {
  return (
    <>
      {data?.map((item: User) => (
        <UserItem item={item} key={item.id} />
      ))}
    </>
  );
};

export default UserList;
