import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';

import {
  projectsReport,
  developersReport,
  employeesAttendanceReport,
  paymentPendingReport,
  projectModulesStatus,
  projectPaymentStatus,
  clientReport,
  workInHand,
  fullReport,
  settingsEmployeeList,
  projectDetail,
  getCLients,
  scrumTeamBioMetric,
  attendanceReports,
  projectsHiring,
  projectsBillingTypeFilter,
  projectsBillingType,
  projectsHiringFilter,
  projectsStatus,
  monthlyHoursReport,
  managerList,
  departments,
  hrMonthlyReports,
} from '@/utils/publicApi';
import {
  ProjectsReport,
  DevelopersReport,
  // TeamsReport,
  EmployeesAttendanceReport,
  PaymentPendingReport,
  ClientReportReq,
  WorkInHandReq,
  FullReportByManagerReq,
  SettingEmpReqParams,
  reportAttendenceFormValue,
  MonthlyReportByManagerReq,
  ClientReqParam,
  DepartmentModel,
  AttendenceFormValue,
  MonthlyReportsByHr,
} from '@/utils/types';
import getUser from '@/utils/getUserServerSide';
import SelectTabs from '@/components/reports/selectTabs';
import AttendanceReport from '@/components/reports/attendanceReport';
import ProjectReport from '@/components/reports/projectProductivityReport';
import DeveloperReport from '@/components/reports/developerProductivityReport';
import { format } from 'date-fns';
import EmployeesReport from '@/components/reports/employeesReport';
import PaymentPending from '@/components/reports/paymentPending';
import ClientReport from '@/components/reports/clientReport';
import WorkInHand from '@/components/reports/workInHand';
import FullReport from '@/components/reports/fullReport';
import MonthlyReports from '@/components/hrReports/monthlyReports';

const Reports = async ({ searchParams }: any) => {
  let user: any = getUser();
  let today = new Date();
  
  let startDateFrom = format(
    new Date(today.setDate(today.getDate() - 6)),
    'yyyy-MM-dd'
  );

  


  
  let endDateTo = format(new Date(), 'yyyy-MM-dd');
  let getManagerList: any;
  let departmentData: DepartmentModel[] = [];
  let departmentID: string =
    searchParams.departmentId === 'null' ||
    searchParams.departmentId === '' ||
    searchParams.departmentId === undefined ||
    searchParams.departmentId === 'undefined'
      ? ''
      : searchParams.departmentId;

  let projectStartDate: any = searchParams?.projectStartDate ?? startDateFrom;
  let fromDate: any = searchParams?.from ?? startDateFrom;
  let toDate: any = searchParams?.to ?? endDateTo;

  let emp: any = searchParams?.employeeId;
  let projectID: any = searchParams?.projectId;

  let sortColumn: any = searchParams?.sortColumn;
  let sortOrder: any = searchParams?.sortOrder;

  let dateStr = searchParams?.month;
  let activeTab = searchParams?.tab ?? 'Attendance Report';
  let teamAdminId = searchParams?.teamAdminId;
  let attendanceReportList: any;
  let projectsReports: any;
  let developersReports: any;
  let empsReport: any;
  let paymentPendingReports: any;
  let projectModuleStatus: any;
  let projectPaymentsStatus: any;
  let clientReportResonse: any;
  let workInHandRes: any;
  let fullReportRes: any;
  let employeeList: any;
  let projects: any;
  let clients: any;
  let bioMetricAttendance: any[] = [];
  let hiringStatus: any;
  let billingTypeFilter: any;
  let billingType: any;
  let projectsHiringFilters: any;
  let projectStatusFilter: any;
  let monthlyReportRes: any;
  let monthlyReports: any;
  let reportsAttendencePayload: reportAttendenceFormValue = {
    departmentId: 0,
    month: 0,
    year: 0,
    pageNo: 0,
    pageSize: 0,
    searchValue: '',
    teamAdminId: '',
    date: '',
  };

  let monthlyReportsPayload: MonthlyReportsByHr = {
    Month: 0,
    Year: 0,
    DepartmentId: 0,
    TeamAdminId: '',
    PageNumber: 0,
    PageSize: 0,
    SearchValue: '',
    date: ''
  };





  const pageNumber = searchParams?.pageNumber ?? 1;
  const pageSize = searchParams?.pageSize ?? 10;
  const searchQuery = searchParams?.search ?? '';
  const clientID = searchParams?.clientId ?? 0;

  if (dateStr == undefined) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    dateStr = `${year}-${month}`;
  }
  let [year, month] = dateStr.split('-');


  

  try {
    if (user.role === 'HOD') {
      reportsAttendencePayload = {
        departmentId: Number(user?.departmentId),
        month: Number(month),
        year: Number(year),
        pageNo: Number(pageNumber),
        pageSize: Number(pageSize),
        searchValue: searchQuery,
        teamAdminId:
          teamAdminId === 'null' ||
          teamAdminId === '' ||
          teamAdminId === undefined ||
          teamAdminId === 'undefined'
            ? ''
            : teamAdminId,
        date: dateStr,
      };

      attendanceReportList = await attendanceReports(reportsAttendencePayload);
    }
    
    if (user.role === 'Admin') {
      reportsAttendencePayload = {
        departmentId:Number(departmentID) ,
        month: Number(month),
        year: Number(year),
        pageNo: Number(pageNumber),
        pageSize: Number(pageSize),
        searchValue: searchQuery,
        teamAdminId:
          teamAdminId === 'null' ||
          teamAdminId === '' ||
          teamAdminId === undefined ||
          teamAdminId === 'undefined'
            ? ''
            : teamAdminId,
        date: dateStr,
      };

      attendanceReportList = await attendanceReports(reportsAttendencePayload);
    }

    if (user.role === 'HR') {
      reportsAttendencePayload = {
        departmentId:Number(departmentID) ,
        month: Number(month),
        year: Number(year),
        pageNo: Number(pageNumber),
        pageSize: Number(pageSize),
        searchValue: searchQuery,
        teamAdminId:
          teamAdminId === 'null' ||
          teamAdminId === '' ||
          teamAdminId === undefined ||
          teamAdminId === 'undefined'
            ? ''
            : teamAdminId,
        date: dateStr,
      };

      attendanceReportList = await attendanceReports(reportsAttendencePayload);
    }

    
    
    if (user.role === 'Project Manager'){
      reportsAttendencePayload = {
        departmentId: Number(user?.departmentId),
        month: Number(month),
        year: Number(year),
        pageNo: Number(pageNumber),
        pageSize: Number(pageSize),
        searchValue: searchQuery,
        teamAdminId: user?.id,
        date: dateStr,
      };

      attendanceReportList = await attendanceReports(reportsAttendencePayload);
    }
  } catch (error) {}

  const projectReq: ProjectsReport = {
    PageNumber: Number(pageNumber),
    PageSize: Number(pageSize),
    StartDate: projectStartDate ?? '',
    From: fromDate ?? '',
    To: toDate ?? '',
    DepartmentId: user.role === 'Admin' ? departmentID : user?.departmentId,
    SearchValue: searchQuery ?? '',
    TeamAdminId:
      teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
        ? ''
        : teamAdminId,
    SortColumn: sortColumn ?? '',
    SortOrder: sortOrder ?? '',
  };

  let payLoad: any = {
    teamLeadId: '',
    month: Number(month),
    year: Number(year),
    departmentId:  (user.role === 'Admin' || user.role==='HR') ? Number(departmentID) : Number(user?.departmentId),
    teamAdminId: (user.role === 'Admin' || user.role==='HR')? (teamAdminId === 'null' || teamAdminId === '' || teamAdminId === undefined || teamAdminId === 'undefined')? '': teamAdminId: user?.id,
    empID: '',
  };
  try {
    projectsReports = await projectsReport(projectReq);
  } catch (error) {}

  const developersReportReq: DevelopersReport = {
    From: fromDate ?? '',
    To: toDate ?? '',
    PageNumber: pageNumber,
    PageSize: pageSize,
    DepartmentId: user.role === 'Admin' ? departmentID : user?.departmentId,
    SearchValue: searchQuery ?? '',
    TeamAdminId:
      teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
        ? ''
        : teamAdminId,
    SortColumn: sortColumn ?? '',
    SortOrder: sortOrder ?? '',
  };
  try {
    developersReports = await developersReport(developersReportReq);
  } catch (error) {}

  const empReportReq: EmployeesAttendanceReport = {
    PageNumber: pageNumber,
    PageSize: pageSize,
    DepartmentId: (user.role === 'Admin' || user.role === 'HR') ? Number(departmentID) : Number(user?.departmentId) ,
    SearchValue: searchQuery ?? '',
    TeamAdminId:
      teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
        ? ''
        : teamAdminId,
    SortColumn: sortColumn ?? '',
    SortOrder: sortOrder ?? '',
  };
  try {
    empsReport = await employeesAttendanceReport(empReportReq);
  } catch (error) {}


  const paymentPendingReportReq: PaymentPendingReport = {
    teamAdminId:
      teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
        ? ''
        : teamAdminId,
    departmentId: user.role === 'Admin' ? departmentID : user?.departmentId,
    searchText: searchQuery ?? '',
  };
  try {
    paymentPendingReports = await paymentPendingReport(paymentPendingReportReq);
  } catch (error) {}

  //ProjectModuleStatus  API Call
  try {
    projectModuleStatus = await projectModulesStatus();
  } catch (error) {}

  //ProjectPaymentStatus API Call
  try {
    projectPaymentsStatus = await projectPaymentStatus();
  } catch (error) {}

  //ClientReport API Call
  const clientReportReq: ClientReportReq = {
    From: fromDate ?? '',
    To: toDate ?? '',
    DepartmentId: user.role === 'Admin' ? departmentID : user?.departmentId,
    TeamAdminId:
      teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
        ? ''
        : teamAdminId,
  };
  try {
    clientReportResonse = await clientReport(clientReportReq);
  } catch (error) {}

  //Work In Hand API Call
  const workInHandReq: WorkInHandReq = {
    SearchText: searchQuery ?? '',
    DepartmentId: user.role === 'Admin' ? departmentID : user?.departmentId,
    TeamAdminId:
      teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
        ? ''
        : teamAdminId,
  };
  try {
    workInHandRes = await workInHand(workInHandReq);
  } catch (error) {}

  //Full Report API Call
  const fullReportReq: FullReportByManagerReq = {
    EmployeeId: emp ?? '',
    DepartmentId: user.role === 'Admin' ? departmentID : user?.departmentId,
    TeamAdminId:
      teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
        ? ''
        : teamAdminId,
    ProjectId: projectID ?? 0,
    ClientId: clientID ?? 0,
    From: fromDate,
    To: toDate,
  };
  try {
    fullReportRes = await fullReport(fullReportReq);
  } catch (error) {}

  const monthlyReportReq: MonthlyReportByManagerReq = {
    EmployeeId: emp ?? '',
    ProjectId: projectID ?? 0,
    ClientId: clientID ?? 0,
    From: fromDate,
    To: toDate,
  };

  try {
    monthlyReportRes = await monthlyHoursReport(monthlyReportReq);
  } catch (error) {}

  let reqParams: SettingEmpReqParams = {
    departmentID: user.role === 'Admin' ? Number(departmentID) :  user.departmentId,
    teamAdminId: (teamAdminId === 'null' || teamAdminId === '' || teamAdminId === undefined || teamAdminId === 'undefined')? '': teamAdminId,
  };
  try {
    employeeList = await settingsEmployeeList(reqParams);
  } catch (error) {}

  try {
    projects = await projectDetail();
  } catch (error) {}

  const param: ClientReqParam = {
    departmentID: user.departmentId,
  };

  try {
    clients = await getCLients(param);
  } catch (error) {}

  try {
    bioMetricAttendance = await scrumTeamBioMetric(payLoad);
  } catch (error) {}


  try {
    hiringStatus = await projectsHiring();
  } catch (error) {}

  try {
    billingTypeFilter = await projectsBillingTypeFilter();
  } catch (error) {}

  try {
    billingType = await projectsBillingType();
  } catch (error) {}

  try {
    projectsHiringFilters = await projectsHiringFilter();
  } catch (error) {}

  try {
    projectStatusFilter = await projectsStatus();
  } catch (error) {}

  try {
    getManagerList = await managerList(Number(departmentID));
  } catch (error: any) {}

  try {
    departmentData = await departments();
  } catch (error) {}





  const attendence: MonthlyReportsByHr = {
    Month: Number(month),
    Year: Number(year),
    DepartmentId: Number(departmentID),
    PageNumber: pageNumber,
    PageSize: pageSize,
    SearchValue: searchQuery,
    TeamAdminId: teamAdminId === 'null' ||
      teamAdminId === '' ||
      teamAdminId === undefined ||
      teamAdminId === 'undefined'
      ? ''
      : teamAdminId,
    date: dateStr
  };


try {
  monthlyReports = await hrMonthlyReports(attendence);
 
} catch (error) {}


  return (
    <>
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
                  <div className='row'>
                    <div className='col-xl-12'>
                      <div className='card custom-card'>
                        <div className='card-body'>
                          <SelectTabs activeTabName={activeTab} />
                        </div>
                      </div>

                      <div className='custm-tabs'>
                        <div className='tab-content'>
                          {activeTab == 'Attendance Report' && (
                            <AttendanceReport
                              attendanceReportList={attendanceReportList}
                              param={reportsAttendencePayload}
                              bioMetricAttendance={bioMetricAttendance}
                            />
                          )}
                          {activeTab == 'Project Report' && (
                            <ProjectReport
                              projectsReport={projectsReports}
                              param={projectReq}
                            />
                          )}
                          {activeTab == 'Developer Report' && (
                            <DeveloperReport
                              developersReports={developersReports}
                              param={developersReportReq}
                            />
                          )}

                          {/* {activeTab == 'Team Report' && (
                            <TeamReport teamReport={teamsReport} />
                          )} */}
                          {activeTab == 'Employees Report' && (
                            <EmployeesReport
                              employeesReport={empsReport}
                              param={empReportReq}
                            />
                          )}

                        {activeTab == 'Monthly Report' && (
                            <MonthlyReports
                            monthlyReports={monthlyReports}
                            param={attendence}
                         
                            />
                          )}

                          {activeTab == 'Work In Hand' && (
                            <WorkInHand
                              workInHandRes={workInHandRes}
                              projectModuleStatus={projectModuleStatus}
                              departmentId={user?.departmentId}
                              workInHandReq={workInHandReq}
                            />
                          )}
                          {activeTab == 'Payment Pending' && (
                            <PaymentPending
                              paymentPendingReports={paymentPendingReports}
                              projectModuleStatus={projectModuleStatus}
                              projectPaymentsStatus={projectPaymentsStatus}
                              departmentId={user?.departmentId}
                              hiringStatus={hiringStatus}
                              billingTypeFilter={billingTypeFilter}
                              billingType={billingType}
                              projectsHiringFilters={projectsHiringFilters}
                              projectStatusFilter={projectStatusFilter}
                              param={paymentPendingReportReq}
                            />
                          )}
                          {activeTab == 'Client Report' && (
                            <ClientReport
                              clientReports={clientReportResonse}
                              param={clientReportReq}
                            />
                          )}
                          {activeTab == 'Full Report' && (
                            <FullReport
                              clients={clients}
                              projects={projects}
                              employeeList={employeeList}
                              fullReportRes={fullReportRes}
                              param={fullReportReq}
                              monthlyReportRes={monthlyReportRes}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reports;
