import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {  settingsEmployeeList } from '@/utils/publicApi';
import {  SettingEmpReqParams } from '@/utils/types';
import getUser from '@/utils/getUserServerSide';
import AssignTeamMember from '@/components/assignTeam/assignTeamMember';
import Footer from '@/components/common/Footer/footer';

const AssignTeam = async ({searchParams}:any) => {
  let employeeList :any;

  let user: any;
 
    user = getUser();
 
  let teamAdminId: string = searchParams.teamAdminId ?? '';


  let reqParams: SettingEmpReqParams = {
    departmentID: user.departmentId,
    teamAdminId: teamAdminId
  };
  try {
     employeeList= await settingsEmployeeList(reqParams)
  } catch (error) {
    
  }


  return (
    <div className='app sidebar-mini ltr light-mode'>
      <div className='page'>
        <div className='page-main'>
          <Header />
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