import React from "react";
import { User } from "../../../../models/user.model";
import UserItem from "./UserItem";

interface UserListProps {
  data: User[];
}

const UserList = ({ data }: UserListProps) => {
  return (
    <tr>
      {data?.map((item: User) => (
        <UserItem item={item} key={item.id} />
      ))}
    </tr>
  );
};

export default UserList;
