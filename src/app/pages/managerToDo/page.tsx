import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import ToDoManager from '@/components/managerToDo/todoManager';
import { DepartmentModel } from '@/utils/types';
import { managerList, departments, } from '@/utils/publicApi';

const ManagerTeamToDo =async ({searchParams}:any) => {
  let departmentID: string = searchParams.departmentId==='null' || searchParams.departmentId==='' || searchParams.departmentId===undefined ||searchParams.departmentId==='undefined' ? '':searchParams.departmentId;
  let teamAdminId: string = searchParams.teamAdminId==='null' || searchParams.teamAdminId==='' || searchParams.teamAdminId===undefined ||searchParams.teamAdminId==='undefined' ? '':searchParams.teamAdminId;

  let departmentData: DepartmentModel[] = [];
  let getManagerList: any;

  try {
    departmentData = await departments();
  } catch (error) {}

  try {
    getManagerList = await managerList(Number(departmentID));
  } catch (error: any) {}

  return (
    <>
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          {/* <!-- app-Header --> */}
          <Header
            getManagerList={getManagerList}
            departmentData={departmentData}
           
          />
          {/* <!--APP-SIDEBAR--> */}
          <SideNav />
          {/* <!--app-content open--> */}
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              <ToDoManager 
               teamAdminIdParam={teamAdminId}
               departmentIDParam={departmentID}
              />
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
