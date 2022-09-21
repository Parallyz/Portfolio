import  React from 'react';
 import { adminRoutes } from "../../router/Router";

export function AdminSideMenuList() {
  

   return (<>
      {adminRoutes?.map(route =>
         <img src={ route.icon} key={route.path} />)}
   </>);
}



