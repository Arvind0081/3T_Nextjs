
// 'use client'
import React from 'react';
import Image from 'next/image';
import Logo from '/public/assets/images/brand/logo-white.png';
import Link from 'next/link';
import getUser from '@/utils/getUserServerSide';
// import SideBarSettings from './sideBarSetting';
import SideBarMenu from './sideBarMenu';
const Sidebar = () => {
  const user:any = getUser();

  return (
    <>
      <div className="sticky z-index-9">
        <div className="app-sidebar__overlay" data-bs-toggle="sidebar"></div>
        <div className="app-sidebar">
          <div className="side-header">
            <Link className="header-brand1" href="/dashBoard">
              <Image src={Logo} className="header-brand-img desktop-logo" alt="logo" />
              <Image src={Logo} className="header-brand-img toggle-logo" alt="logo" />
              <Image src={Logo} className="header-brand-img light-logo" alt="logo" />
              <Image src={Logo} className="header-brand-img light-logo1" alt="logo" />
            </Link>
          </div>
          <SideBarMenu user ={user}/>
     
        </div>
      </div>
      <div className="jumps-prevent" style={{ paddingTop: '58px' }}></div>
    </>
  );
};

export default Sidebar;
