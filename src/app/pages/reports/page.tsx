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

const Reports = async ({ searchParams }: any) => {
  let user: any = getUser();
  let today = new Date();
  let startDateFrom = format(
    new Date(today.setDate(today.getDate() - 6)),
    'yyyy-MM-dd'
  );
  let endDateTo = format(new Date(), 'yyyy-MM-dd');

  let projectStartDate: any = searchParams?.projectStartDate ?? startDateFrom;
  let fromDate: any = searchParams?.from ?? startDateFrom;
  let toDate: any = searchParams?.to ?? endDateTo;

  let emp: any = searchParams?.employeeId;
  let projectID: any = searchParams?.projectId;

  let sortColumn:any=searchParams?.sortColumn;
  let sortOrder:any=searchParams?.sortOrder;

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
  let monthlyReportRes:any;;

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

  const reportsAttendencePayload: reportAttendenceFormValue = {
    departmentId: Number(user?.departmentId),
    month: Number(month),
    year: Number(year),
    pageNo: pageNumber,
    pageSize: pageSize,
    searchValue: searchQuery,
    teamAdminId: user?.id,
    date: dateStr,
  };
  try {
    attendanceReportList = await attendanceReports(reportsAttendencePayload);
  } catch (error) {}

  const projectReq: ProjectsReport = {
    PageNumber: Number(pageNumber),
    PageSize: Number(pageSize),
    StartDate: projectStartDate ?? '',
    From: fromDate ?? '',
    To: toDate ?? '',
    DepartmentId: Number(user.departmentId),
    SearchValue: searchQuery ?? '',
    TeamAdminId: teamAdminId ?? '',
    SortColumn: sortColumn ?? '',
    SortOrder: sortOrder ?? '',
  };

  let payLoad: any = {
    teamLeadId: '',
    month: Number(month),
    year: Number(year),
    departmentId: Number(user.departmentId),
    teamAdminId: user?.id,
    empID: '',
  };
  try {
    projectsReports = await projectsReport(projectReq);
  } catch (error) {}



  const developersReportReq: DevelopersReport = 
  {
    From: fromDate ?? '',
    To: toDate ?? '',
    PageNumber: pageNumber,
    PageSize: pageSize,
    DepartmentId: 0,
    SearchValue: searchQuery ?? '',
    TeamAdminId: teamAdminId ?? '',
    SortColumn: sortColumn ?? '',
    SortOrder: sortOrder ?? '',
  };
  try {
    developersReports = await developersReport(developersReportReq);
  } catch (error) {}

  const empReportReq: EmployeesAttendanceReport = {
    PageNumber: pageNumber,
    PageSize: pageSize,
    DepartmentId: 0,
    SearchValue: searchQuery ?? '',
    TeamAdminId: teamAdminId ?? '',
    SortColumn: sortColumn ?? '',
    SortOrder: sortOrder ?? '',
  };
  try {
    empsReport = await employeesAttendanceReport(empReportReq);
  } catch (error) {}

  const paymentPendingReportReq: PaymentPendingReport = {
    teamAdminId: teamAdminId ?? '',
    departmentId: 0,
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
    DepartmentId: 0,
    TeamAdminId: teamAdminId ?? '',
  };
  try {
    clientReportResonse = await clientReport(clientReportReq);
  } catch (error) {}

  //Work In Hand API Call
  const workInHandReq: WorkInHandReq = {
    SearchText: searchQuery ?? '',
    DepartmentId: 0,
    TeamAdminId: teamAdminId ?? '',
  };
  try {
    workInHandRes = await workInHand(workInHandReq);
  } catch (error) {}

  //Full Report API Call
  const fullReportReq: FullReportByManagerReq = {
    EmployeeId: emp ?? '',
    DepartmentId: user.departmentId,
    TeamAdminId: teamAdminId ?? '',
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

console.log('monthlyReportRes',  monthlyReportRes);

  let reqParams: SettingEmpReqParams = {
    departmentID: user.departmentId,
    teamAdminId: teamAdminId ?? '',
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

  return (
    <>
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          <div className='page-main'>
            <Header />
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
                              projectsReports={projectsReports}
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

                          {activeTab == 'Work In Hand' && (
                            <WorkInHand
                              workInHandRes={workInHandRes}
                              projectModuleStatus={projectModuleStatus}
                              departmentId={user?.departmentId}
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


