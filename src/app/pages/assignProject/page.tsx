import AssignProjectMember from '@/components/assignProjectMember/assignProjectMember';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {
  SettingGetTeamLeadAndBDMList,
  projectDetail,
} from '@/utils/publicApi';
import getUser from '@/utils/getUserServerSide';
import {  SettingGetTeamLeadAndBDMListParams } from '@/utils/types';
import Footer from '@/components/common/Footer/footer';
const AssignProject = async ({searchParams}:any) => {
  
  let user: any;
  let teamAdminId: string = searchParams.teamAdminId ?? '';
 
    user = getUser();


  let reqParams: SettingGetTeamLeadAndBDMListParams = {
    departmentID: user.departmentId,
    teamAdminId: teamAdminId
  };

  const teamLeadAndBDMList = await SettingGetTeamLeadAndBDMList(reqParams);

  const projectDetails = await projectDetail();
  return (
    <>
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          <div className='page-main'>
            <Header />
            <SideNav />
            <div className='main-content app-content mt-0'>
              <AssignProjectMember
                projectDetails={projectDetails}
                teamLeadAndBDMList={teamLeadAndBDMList}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AssignProject;