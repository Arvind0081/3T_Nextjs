import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {  departments, settingsEmployeeList } from '@/utils/publicApi';
import {  DepartmentModel, SettingEmpReqParams } from '@/utils/types';
import getUser from '@/utils/getUserServerSide';
import Footer from '@/components/common/Footer/footer';
import AssignBadgeComponenet from '@/components/assignBadge/assignBadge';


const AssignBadge = async ({searchParams}:any) => {

  let user: any;
  
    user = getUser();
    let departmentData: DepartmentModel[] = [];
  let teamAdminId: string = searchParams.teamAdminId ?? '';
  let departmentID: string = searchParams.departmentId==='null' || searchParams.departmentId==='' || searchParams.departmentId===undefined ||searchParams.departmentId==='undefined' ? '':searchParams.departmentId;


  let reqParams: SettingEmpReqParams = {
    departmentID: user.role==='Admin'? departmentID : user.departmentId,
    teamAdminId: teamAdminId
  };
  try {
     await settingsEmployeeList(reqParams)
  } catch (error) {
    
  }

  try {
    departmentData = await departments();
  } catch (error) {}



  return (
    <div className='app sidebar-mini ltr light-mode'>
      <div className='page'>
        <div className='page-main'>
        <Header  departmentData={departmentData} />
          <SideNav />
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              <div className='main-container container-fluid'>
              
           <AssignBadgeComponenet param={reqParams}  />

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssignBadge;