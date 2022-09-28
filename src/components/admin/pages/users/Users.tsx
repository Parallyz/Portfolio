import React from 'react';
import AdminHeader from '../../AdminHeader';
import UserList from './UserList';



const Users = () => {
   return (
      <>
      <AdminHeader title='Users'/>
      <UserList/>
      </>
   );
};

export default Users;