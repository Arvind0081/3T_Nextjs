import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import { AttendanceListModel, EmployeeProfileDetailsResponse, EmpProfileReqParams, ScrumPayLoadModel, ScrumTeamPerFormanceResponseModel, ScrumTeamStatusResponseModel, TeamProductivityResponseModel } from '@/utils/types';
import { attendanceListFromDB, EmpProfileDetailsById, performanceBadges, scrumTeamAttendance, scrumTeamBioMetric, scrumTeamPerformance,  scrumTeamStatus, teamProductivitySummaryByManager } from '@/utils/publicApi';
import ScrumTeamStatus from '@/components/scrum/teamStatus';
import { format } from 'date-fns';
import ProjectInProgress from '@/components/scrum/projectInProgressTable';


// import Link from 'next/link';
 import getUser from '@/utils/getUserServerSide';
import ScrumTeamDetails from '@/components/scrum/teamDetails';


import ScrumAttendance from '@/components/scrum/scrumAttendance';


const Projects = async({params,searchParams}:any) => {
     const user: any = getUser();
let employeeData:EmployeeProfileDetailsResponse={
    name: undefined,
    userTools: undefined,
    userBadges: undefined,
    employeeID: '',
    firstName: undefined,
    lastName: undefined,
    designation: null,
    profileImage: '',
    departmentId: '',
    department: '',
    email: 0,
    phoneNumber: null,
    empStatus: 0,
    joiningDate: null,
    experience: null,
    teamAdminId: '',
    manager: '',
    address: '',
    skills: '',
    employeeNumber: '',
    canEditStatus: false,
    projects: [],
    awardList: [],
    feedbackDetails: []
};
 let today = new Date();

let startDate = searchParams.startDate ?? new Date(today.getFullYear(), today.getMonth(), 1);
let endDate = searchParams.endDate ?? new Date(today.getFullYear(), today.getMonth() + 1, 0);

startDate = format(startDate, 'yyyy-MM-dd');
endDate = format(endDate, 'yyyy-MM-dd');


const date = new Date();
let year = date.getFullYear();
let month = String(date.getMonth() + 1).padStart(2, '0');
const selectedMonth = searchParams.month ?? `${year}-${month}`;
[year, month] = selectedMonth.split('-');


 const selectedDate = searchParams.date ?? format(new Date(), 'yyyy-MM-dd');
 let teamPerformance:ScrumTeamPerFormanceResponseModel[]=[];
 let teamStatus:ScrumTeamStatusResponseModel[]=[];
 let attendanceList:AttendanceListModel[]=[];
 let teamMonthlyAttendance:any[]=[];
 let bioMetricAttendance:any[]=[];
 let performanceBadgesList:any[]=[];
 let teamProductivity: TeamProductivityResponseModel[] = [];
 
let payLoad:ScrumPayLoadModel={
    startDate:startDate,
    endDate:endDate,
    teamLeadId:params.scrum,
    filterByDate:selectedDate,
    month: Number(month),
    year: Number(year),
    selectedMonth:selectedMonth,
    departmentId:user.role === 'Admin'?Number(searchParams.departmentId):Number(user.departmentId),
    teamAdminId:'',
    empID:''
}

    try {
        teamPerformance= await scrumTeamPerformance(payLoad);
    } catch (error) {}
    try {
        performanceBadgesList= await performanceBadges();
    } catch (error) {}

   

    try {
        teamStatus= await scrumTeamStatus(payLoad);
    } catch (error) {}

    try {
        attendanceList= await attendanceListFromDB();

    } catch (error) {}

    try {
        teamMonthlyAttendance = await scrumTeamAttendance(payLoad);
      } catch (error) {}
  
      try {
        bioMetricAttendance= await scrumTeamBioMetric(payLoad);
    } catch (error) {}

    try {
        let reqParams: EmpProfileReqParams = {
            departmentID: user.departmentId,
            employeeId: params.scrum,
          };
        
          employeeData = await EmpProfileDetailsById(reqParams);
    } catch (error) {}
   
    try {
        teamProductivity = await teamProductivitySummaryByManager(payLoad);
      } catch (error) {}

    return (
        <>
            {/* <!-- PAGE --> */}
            <div className='app sidebar-mini ltr light-mode'>
                <div className='page'>
                    {/* <!-- app-Header --> */}
                    <Header />
                    {/* <!--APP-SIDEBAR--> */}
                    <SideNav />
                    {/* <!--app-content open--> */}
                    <div className='main-content app-content mt-0'>
                        <div className='side-app'>
                            {/* <!-- CONTAINER --> */}
                            <div className="main-container container-fluid profile-page">

                        <div className="row">
                            <ProjectInProgress payLoad={payLoad}  />
                            <div className="col-xl-3">
                        <div className="card custom-card card_sm">
                           <div className="card-header justify-content-between items-center">
                              <div className="card-title">Open Assigned Projects</div>
                           </div>
                           <div className="card-body ">
                              <div className="project_issued">
                                 <div className="project_list">
                                    <a className="project-item" target="_blank" href="#">
                                       <span className="icon"><i className="bx bx-chevrons-right"></i>
                                       </span>Attom Data Solutions</a>
                                 </div>
                                 <div className="project_list"><a className="project-item" target="_blank"
                                       href="#"><span className="icon">
                                          <i className="bx bx-chevrons-right"></i></span>ERI</a>
                                 </div>
                                 <div className="project_list"><a className="project-item" target="_blank"
                                       href="#"><span className="icon">
                                          <i className="bx bx-chevrons-right"></i></span>My Outdoor Agent</a>
                                 </div>
                                 <div className="project_list"><a className="project-item" target="_blank"
                                       href="#"><span className="icon">
                                          <i className="bx bx-chevrons-right"></i></span>Hunt Lease</a>
                                 </div>
                                 <div className="project_list"><a className="project-item" target="_blank"
                                       href="#"><span className="icon">
                                          <i className="bx bx-chevrons-right"></i></span>FIP</a>
                                 </div>
                                 <div className="project_list"><a className="project-item" target="_blank"
                                       href="#"><span className="icon">
                                          <i className="bx bx-chevrons-right"></i></span>LWS</a>
                                 </div>
                                 <div className="project_list"><a className="project-item" target="_blank"
                                       href="#"><span className="icon">
                                          <i className="bx bx-chevrons-right"></i></span>Heller Doc</a>
                                 </div>
                                 <div className="project_list"><a className="project-item" target="_blank"
                                       href="#"><span className="icon">
                                          <i className="bx bx-chevrons-right"></i></span>Property Tax adjuster</a>
                                 </div>
                                 <div className="list_show">
                                    <div className="project_list"><a className="project-item" target="_blank"
                                          href="#"><span className="icon">
                                             <i className="bx bx-chevrons-right"></i></span>Test_DotNet_012399</a>
                                    </div>
                                    <div className="project_list"><a className="project-item" target="_blank"
                                          href="#"><span className="icon">
                                             <i className="bx bx-chevrons-right"></i></span>Heller Doc</a>
                                    </div>
                                    <div className="project_list"><a className="project-item" target="_blank"
                                          href="#"><span className="icon">
                                             <i className="bx bx-chevrons-right"></i></span>BEA Solutions</a>
                                    </div>
                                    <div className="project_list"><a className="project-item" target="_blank"
                                          href="#">
                                          <span className="icon">
                                             <i className="bx bx-chevrons-right"></i></span>Test_0208</a>
                                    </div>
                                 </div>
                              </div>
                              <div className="pt-1">
                                 <p className="show_more fw-semibold mb-0">Show More <i
                                       className="bx bx-chevrons-down fs-18 align-middle"></i></p>
                                 <p className="show_less fw-semibold mb-0">Show Less <i
                                       className="bx bx-chevrons-up fs-18 align-middle"></i> </p>
                              </div>
                           </div>
                        </div>
                     </div>
                        </div>

                       <ScrumTeamDetails teamPerformance={teamPerformance}  payLoad={payLoad} employeeDetails={employeeData} performanceBadgesList={performanceBadgesList} teamProductivity={teamProductivity}/>

                       <ScrumAttendance teamMonthlyAttendance={teamMonthlyAttendance} bioMetricAttendance={bioMetricAttendance} selectedMonth={selectedMonth} payLoad={payLoad}/>



                       <ScrumTeamStatus teamStatus={teamStatus} attendanceList={attendanceList} payLoad={payLoad}/>

                    
                      </div>
                        
                        
                        </div>
                      
                    </div>
                </div>

           
                <Footer />
            </div>
        </>
    );
};

export default Projects;