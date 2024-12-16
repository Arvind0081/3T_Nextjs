import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {  managerList, settingsEmployeeList,departments } from '@/utils/publicApi';
import {  DepartmentModel, SettingEmpReqParams } from '@/utils/types';
import getUser from '@/utils/getUserServerSide';
import AssignTeamMember from '@/components/assignTeam/assignTeamMember';
import Footer from '@/components/common/Footer/footer';

const AssignTeam = async ({searchParams}:any) => {
  let employeeList :any;

  let user: any;
 
    user = getUser();
 
  // let teamAdminId: string = searchParams.teamAdminId ?? '';

  let departmentID: string = searchParams.departmentId==='null' || searchParams.departmentId==='' || searchParams.departmentId===undefined ||searchParams.departmentId==='undefined' ? '':searchParams.departmentId;
  let teamAdminId: string = searchParams.teamAdminId==='null' || searchParams.teamAdminId==='' || searchParams.teamAdminId===undefined ||searchParams.teamAdminId==='undefined' ? '':searchParams.teamAdminId;

  let reqParams: SettingEmpReqParams = {
    departmentID: user.role === 'Admin' ? departmentID :  user.departmentId,
    teamAdminId: teamAdminId
  };
  try {
     employeeList= await settingsEmployeeList(reqParams)
  } catch (error) {
    
  }

  let getManagerList: any;

  let departmentData: DepartmentModel[] = [];


  try {
    departmentData = await departments();
  } catch (error) {}

  try {
    getManagerList = await managerList(Number(departmentID));
  } catch (error: any) {}


  return (
    <div className='app sidebar-mini ltr light-mode'>
      <div className='page'>
        <div className='page-main'>
        <Header
            getManagerList={getManagerList}
            departmentData={departmentData}
           
          />
          <SideNav />
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              <div className='main-container container-fluid'>
              
               <AssignTeamMember employees={employeeList}   />

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssignTeam;