import React from 'react'
import '../styles/LayoutStyles.css';
import { adminMenu, sidebarMenu, userMenu } from '../Data/data';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = (children) => {
  const {user} = useSelector(state => state.user)
    const location = useLocation();

    //redering menu list
    const sidebarMenu = user?.isAdmin ? adminMenu :userMenu;
  return (
    <>
    <div className="main">
    <div className="layout">
        <div className="sidebar">
               <div className="logo">
                <h6>E-CARE</h6>
                <hr />
                </div>
               <div className="menu">
                {userMenu.map(menu => {
                    const isActive= location.pathname === menu.path
                    return (
                        <>
                        <div className={`menu-item ${isActive && "active"}`}>
                           <i className={menu.icon}></i>
                           <Link to={menu.path}>{menu.name}</Link>
                            </div> 
                            </>
                    );
                })}
                </div>
            </div> 
            <div className="content">
                <div className="header">
                  < div className="header-content">
                <i class="fa-duotone fa-solid fa-bell"></i>
                <Link> to="./profile{user?.name}</Link>
                  </div>
                 </div> 
                <div className="body">{children}</div>
            </div>
       </div>
     </div>
     </>
  );
};

export default Layout;