import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import ToDoManager from '@/components/managerToDo/todoManager';

const ManagerTeamToDo = () => {
  return (
    <>
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          {/* <!-- app-Header --> */}
          <Header />
          {/* <!--APP-SIDEBAR--> */}
          <SideNav />
          {/* <!--app-content open--> */}
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              <ToDoManager />
            </div>
            {/* <!-- CONTAINER END --> */}
          </div>
        </div>

        {/* FOOTER  */}
        <Footer />
      </div>
    </>
  );
};

export default ManagerTeamToDo;
