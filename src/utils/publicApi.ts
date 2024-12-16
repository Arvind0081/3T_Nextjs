import {
  EmpProfileDetails,
  TeamLeadAndBDMList,
  UpdateEmpManagerAndStatus,
  UserProfileDetail,
  addUpworkProfile,
  client,
  getAllDepartments,
  getEmpByDepId,
  getEmpStatus,
  getEmpStatusList,
  getUpworkProfile,
  settingsEmpByDepId,
  updateEmp,
  updatePayment,
} from '@/components/common/constant';
import {
  BillingTypeModel,
  ClientModel,
  ClientReqParams,
  ClientResponse,
  EmpProfileReqParams,
  EmpReqParams,
  EmployeeResponse,
  HiringModel,
  ModuleStatusModel,
  ProjectInfoModel,
  ProjectModuleFormValue,
  UpdateEmpReq,
  UpworkBodyParams,
  UpworkReqParams,
  UpworkResponse,
  EmployeeProfileDetailsResponse,
  MyProfileResponse,
  ProjectModel,
  Technology,
  Managers,
  AddProjectModuleFormValues,
  SettingEmpReqParams,
  SettingGetTeamLeadAndBDMListParams,
  ProjectBillingModel,
  ProjectEmployeeStatus,
  TeamMembersInProjectModel,
  ModuleDetailsModel,
  AttendenceFormValue,
  EmployeeStatusProjectListModel,
  EmployeeStatusUpworkProfileListModel,
  EmployeeStatusProjectModulesListModel,
  ModulesListModelParams,
  GetEmployeeStatusParamsModel,
  ProjectListModel,
  ProjectModuleListModel,
  UpworkProfileListModel,
  AddEmployeeStatusModel,
  ProductivityParams,
  HRPayLoad,
  TeamListByDepartment,
  AttendenceEmp,
  TeamStatusModel,
  ProjectModuleBasicDetailsModel,
  Perfornmance,
  WarningEmailModel,
  ManagerDashBoardModel,
  ProjectSummaryResponseModel,
  TeamProductivityResponseModel,
  TeamSummaryResponseModel,
  ProjectBillingReport,
  TeamsReport,
  DevelopersReport,
  ProjectsReport,
  ApproveMemberModel,
  TeamToDoModel,
  AddToDoPayloadModel,
  UpdateTeamAttendancePayLoadModel,
  AttendanceListModel,
  ScrumPayLoadModel,
  ScrumTeamPerFormanceResponseModel,
  ScrumTeamProjectsResponseModel,
  ScrumTeamStatusResponseModel,
  UpdateManagerReq,
  UpdateEmployeeReq,
  EmployeeProjectStatusParam,
  ProjectWithBillingDetailSummaryParams,
  MonthlyBillingSummaryParams,
  PaymentPendingReport,
  ClientReportReq,
  EmployeesAttendanceReport,
  ForgotPasswordPayloadModel,
  TeamMemberParam,
  WorkInHandReq,
  FullReportByManagerReq,
  TeamLeadDashBoardParam,
  AssignBagesModel,
  DesignationsParam,
  CLientModel,
  InvoiceProjectDetails,
  InvoicePaymentModel,
  UserParam,
  UpdatePaymentReq,
  LockStatus,
  ClientTypeModel,
  AdminProductivityParam,
  todoParam,
  MonthlyReportByManagerReq,
  ProjectProductivityPayloadModel,
  ProjectBillingDetailsModel,
  ProjectEmployeeDetailsModel,
  ClientReqParam,
} from '@/utils/types';

import apiService from '@/services/apiService';
// import { cookies } from'next/headers';
import {
  DesignationModel,
  DepartmentModel,
  StatusModel,
  GetAllProjectsParamsModel,
} from '@/utils/types';

export const designations = async (id: number): Promise<DesignationModel[]> => {
  const response = await apiService.get(
    `/Employee/GetDesignationsList?departmentId=${id}`
  );
  return response?.model;
};

export const departments = async (): Promise<DepartmentModel[]> => {
  const response = await apiService.get('/Employee/GetDepartmentsList');

  if (response?.model && Array.isArray(response.model)) {
    return response.model.filter(
      (department:any) => department.name !== 'Admin'
    );
  }

  return [];
};


export const projectDetail = async (): Promise<ProjectModel[]> => {
  const response = await apiService.get(
    '/EmployeeStatus/GetProjectsListByDepartment'
  );
  return response?.model;
};

export const technologyList = async (): Promise<Technology[]> => {
  const response = await apiService.get('/UserProfile/GetTechnologyList');
  return response?.model;
};

export const managerList = async (id: number): Promise<Managers[]> => {
  const response = await apiService.get(
    `/Employee/GetManagerList?departmentId= ${id}`
  );
  return response?.model;
};

export const projectsStatus = async (): Promise<StatusModel[]> => {
  const response = await apiService.get('/Project/GeProjectStatusFilter');
  return response.model;
};
export const individualProjectStatus = async (): Promise<StatusModel[]> => {
  const response = await apiService.get('/Project/GetProjectStatusList');
  return response.model;
};

export const projectsHiring = async (): Promise<HiringModel[]> => {
  const response = await apiService.get('/Project/GetHiringStatusList');
  return response.model;
};
export const projectsHiringFilter = async (): Promise<HiringModel[]> => {
  const response = await apiService.get('/Project/GetHiringTypeFilter');
  return response.model;
};

export const projectsBillingType = async (): Promise<BillingTypeModel[]> => {
  const response = await apiService.get('/Project/GetBillingTypeList');
  return response.model;
};
export const projectsBillingTypeFilter = async (): Promise<
  BillingTypeModel[]
> => {
  const response = await apiService.get('/Project/GetBilingTypeFilter');
  return response.model;
};

export const projectsClientList = async (
  id: number
): Promise<ClientModel[]> => {
  const response = await apiService.get(
    `/Client/GetAllClientsDetail?DepartmentId=${id}`
  );
  return response?.model?.results;
};

export const projects = async (
  params: GetAllProjectsParamsModel
): Promise<
  { projects: ProjectInfoModel[]; totalCount: number } | undefined
> => {
  try {
    const response = await apiService.get(
      `/Project/GetAllProjects?ProjectStatus=${params.projectStatus}&StartDate=${params.startDate}&EndDate=${params.endDate}&BilingType=${params.bilingType}&HiringStatus=${params.hiringStatus}&DepartmentId=${params.departmentId}&PageNumber=${params.pageNumber}&PageSize=${params.pageSize}&SearchValue=${params.searchValue}&SortColumn=${params.sortColumn}&SortOrder=${params.sortOrder}&TeamAdminId=${params.teamAdminId}`
    );

    return {
      projects: response.model.results,
      totalCount: response.model.totalCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const individualProject = async (
  id: number
): Promise<ProjectInfoModel> => {
  const response = await apiService.get(`/Project/GetProjectByID?id=${id}`);
  return response.model;
};

export const getEmployeeStatus = async () => {
  try {
    const response = await apiService.get(`${getEmpStatus}`);
    return response;
  } catch (error) {
    console.error('Error fetching Employee Status:', error);

    return null;
  }
};

export const getEmployeesById = async (
  reqParams: EmpReqParams
): Promise<EmployeeResponse | null> => {
  try {
    const response = await apiService.get(
      `${getEmpByDepId}=${reqParams.departmentID}&PageNo=${reqParams.pagenumber}&PageSize=${reqParams.pageSize}&SearchValue=${reqParams.searchValue}&SortColumn=id&SortOrder=Desc&ProjectStatus=${reqParams.employeeStatus}`
    );

    if (response && response?.model && response?.model?.employeeModels) {
      return {
        ...response,
        model: {
          ...response.model,
        },
        employeeModels: response.model.employeeModels,
      };
    } else {
      console.error('Invalid response structure:', response);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const projectModulesDetails = async (
  payload: ProjectProductivityPayloadModel
): Promise<ProjectModuleBasicDetailsModel> => {
  const response = await apiService.get(
    `/ProjectModule/GetProjectBasicDetails?projectId=${payload.id}&departmentId=${payload.departmentId}`
  );
  return response.model;
};

export const modulesDetails = async (
  payload: ProjectModuleFormValue
): Promise<ModuleDetailsModel[]> => {
  const response = await apiService.get(
    `/ProjectModule/GetProjectModuleDetailsByProjectId?ProjectId=${payload.id}&ModuleStatus=${payload.moduleStatus}&PaymentStatus=${payload.paymentStatus}&DepartmentId=${payload.departmentId}&PageSize=${payload.pageSize}&PageNumber=${payload.pageNumber}&SearchValue=${payload.searchValue}`
  );
  return response.model;
};

export const projectBillingDetails = async (
  payload: ProjectBillingDetailsModel
): Promise<ProjectBillingModel[]> => {
  const response = await apiService.get(
    `/ProjectModule/GetProjectBillingDetailsByProjectId?ProjectId=${payload.id}&DepartmentId=${payload.departmentId}&StartDate=${payload.billingStartDate}&EndDate=${payload.billingEndDate}`
  );
  return response.model;
};

export const projectEmployeeDetails = async (
  payload: ProjectEmployeeDetailsModel
): Promise<ProjectEmployeeStatus[]> => {
  const response = await apiService.get(
    `/ProjectModule/GetProjectEmployeeStatusByProjectId?ProjectId=${payload.id}&DepartmentId=${payload.departmentId}&StartDate=${payload.statusStartDate}&EndDate=${payload.statusEndDate}`
  );
  return response.model;
};

export const projectAssignedToEmployee = async (
  payload: ProjectProductivityPayloadModel
): Promise<TeamMembersInProjectModel[]> => {
  const response = await apiService.get(
    `/Setting/GetTeamMembersInProject?projectId=${payload.id}&departmentId=${payload.departmentId}`
  );
  return response.model;
};

export const projectModulesStatus = async (): Promise<ModuleStatusModel[]> => {
  const response = await apiService.get('/ProjectModule/GetModuleStatusList');
  return response.model;
};

export const projectPaymentStatus = async (): Promise<ModuleStatusModel[]> => {
  const response = await apiService.get('/ProjectModule/GetPaymentStatusList');
  return response.model;
};

export const allDesignations = async (
  reqParam: DesignationsParam
): Promise<DesignationModel[]> => {
  const response = await apiService.get(
    `/Employee/GetDesignationsList?departmentId=${reqParam.departmentID}`
  );
  return response?.model;
};

export const allDepartments = async (): Promise<DepartmentModel[]> => {
  const response = await apiService.get(`${getAllDepartments}`);
  return response.model;
};

export const employeeStatus = async () => {
  try {
    const response = await apiService.get(`${getEmpStatusList}`);
    return response;
  } catch (error) {
    console.error('Error fetching Employee Status:', error);

    return null;
  }
};

export const employeesById = async (
  reqParams: EmpReqParams
): Promise<EmployeeResponse | null> => {
  try {
   
    const response = await apiService.get(
      `/Employee/GetAllEmployees?DepartmentId=${reqParams.departmentID}&PageNumber=${reqParams.pagenumber}&Designation=${reqParams.designation}&PageSize=${reqParams.pageSize}&SearchValue=${reqParams.searchValue}&isActive=${reqParams.isActive}&TeamAdminId=${reqParams.TeamAdminId}&SortColumn=${reqParams.SortColumn}&SortOrder=${reqParams.SortOrder}`
    );

    if (response && response.model && response.model.results) {
      return {
        ...response,
        model: {
          ...response.model,
        },
        employeeModels: response.model.results,
      };
    } else {
      console.error('Invalid response structure:', response);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateEmployee = async (data: UpdateEmpReq) => {
  try {
    const response = await apiService.put(
      `${updateEmp}=${data.employeeId}&isActive=${data.isActive}`,
      data
    );
    return response;
  } catch (error) {
    console.error('Error fetching Employee Status:', error);

    return null;
  }
};

export const clientsById = async (
  reqParams: ClientReqParams
): Promise<ClientResponse | null> => {
  try {
    const response = await apiService.get(
      `${client}=${reqParams.departmentID}&PageNumber=${reqParams.pageNumber}&PageSize=${reqParams.pageSize}&SearchValue=${reqParams.searchValue}&SortColumn=${reqParams.sortColumn}&SortOrder=${reqParams.sortOrder}&TeamAdminId=${reqParams.teamAdminId}`
    );

    if (response && response.model && response.model.results) {
      return {
        ...response,
        model: {
          ...response.model,
        },
        clientModels: response.model.results,
      };
    } else {
      console.error('Invalid response structure:', response);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const UpworkProfile = async (
  reqParams: UpworkReqParams
): Promise<UpworkResponse | null> => {
  try {
    const response = await apiService.get(
      `${getUpworkProfile}?DepartmentId=${reqParams.departmentID}&PageNumber=${reqParams.pageNumber}&PageSize=${reqParams.pageSize}&SearchValue=${reqParams.searchValue}&SortColumn=${reqParams.sortColumn}&SortOrder=${reqParams.sortOrder}&TeamAdminId=${reqParams.teamAdminId}&ProfileType=${reqParams.profileType}`
    );

    if (response && response.model && response.model.results) {
      return {
        ...response,
        model: {
          ...response.model,
        },
        employeeModels: response.model.results,
      };
    } else {
      console.error('Invalid response structure:', response);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUpworkPrf = async (upworkProfileParams: UpworkBodyParams) => {
  try {
    const response = await apiService.post(
      `${addUpworkProfile}`,
      upworkProfileParams
    );
    return response;
  } catch (error) {
    console.error('Error fetching Employee Status:', error);
    return null;
  }
};

export const EmpProfileDetailsById = async (
  reqParams: EmpProfileReqParams
): Promise<EmployeeProfileDetailsResponse> => {
  try {
    const response = await apiService.get(
      `${EmpProfileDetails}=${reqParams.employeeId}`
    );

    if (response && response.model && response.model) {
      return response.model;
    } else {
      console.error('Invalid response structure:', response);
      return response;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const userProfileDetails = async (): Promise<MyProfileResponse> => {
  try {
    const response = await apiService.get(`${UserProfileDetail}`);
    return response;
  } catch (error) {
    console.error('Error fetching profile Details:', error);

    throw error;
  }
};

export const UpdateEmployeeByStatus = async (data: UpdateEmployeeReq) => {
  try {
    const response = await apiService.put(
      `${UpdateEmpManagerAndStatus}=${data.employeeId}&isActive=${data.isActive}`,
      data
    );
    return response.model?.results;
  } catch (error) {
    console.error('Error fetching Employee Status:', error);

    return null;
  }
};

export const UpdateEmployeeByManager = async (data: UpdateManagerReq) => {
  try {
    const response = await apiService.put(
      `${UpdateEmpManagerAndStatus}=${data.employeeId}&teamAdminId=${data.teamAdminId}`,
      data
    );
    return response;
  } catch (error) {
    console.error('Error fetching Employee Status:', error);

    return null;
  }
};

export const individualProjectModule = async (
  id: string,
  departmentId: number
): Promise<AddProjectModuleFormValues> => {
  const response = await apiService.get(
    `/ProjectModule/GetProjectModule?moduleId=${id}&departmentId=${departmentId}`
  );
  return response?.model;
};

export const ProfileList = async (): Promise<any> => {
  const response = await apiService.get('/UpworkProfile/GetProfileTypeList');
  return response?.model;
};
export const teamLeadAndBDM = async (
  departmentId: number[] = []
): Promise<any[]> => {
  const queryString = departmentId
    .map((id: number) => `departmentId=${id}`)
    .join('&');
  const response = await apiService.get(
    `/Employee/GetProjectManagerOrTeamLeadOrBDMListByDepartments?${queryString}`
  );
  return response?.model;
};

export const updateProjectMembers = async (data: any): Promise<any> => {
  const response = await apiService.post(
    '/Setting/AddTeamMembersInProject',
    data
  );
  return response?.model;
};

export const displayProjectDocument = async (id: number): Promise<any> => {
  const response = await apiService.get(
    `/Project/GetUploadedDocuments?projectId=${id}`
  );
  return response?.model;
};

export const uploadProjectDocument = async (data: any): Promise<any> => {
  const response = await apiService.post('/Project/UploadDocument', data);
  return response?.model;
};

export const settingsEmployeeList = async (reqParams: SettingEmpReqParams) => {
  try {
    const response = await apiService.get(
      `${settingsEmpByDepId}=${reqParams.departmentID}&teamAdminId=${reqParams.teamAdminId}`
    );
    return response?.model;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const SettingGetTeamLeadAndBDMList = async (
  reqParams: SettingGetTeamLeadAndBDMListParams
) => {
  try {
    const response = await apiService.get(
      `${TeamLeadAndBDMList}=${reqParams.departmentID}&teamAdminId=${reqParams.teamAdminId}`
    );
    return response?.model;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const EmployeeDashboard = async (attendance: AttendenceEmp) => {
  const response = await apiService.get(
    `/EmployeeDashboard/GetEmployeeDashboardDetails?month=${attendance.Month}&year=${attendance.Year}`
  );
  return response?.model;
};

export const EmployeeStatusProjectList = async (): Promise<
  EmployeeStatusProjectListModel[]
> => {
  const response = await apiService.get(
    '/EmployeeStatus/GetProjectsListByDepartment'
  );
  return response?.model;
};

export const EmployeeStatusUpworkProfileList = async (): Promise<
  EmployeeStatusUpworkProfileListModel[]
> => {
  const response = await apiService.get(
    '/EmployeeStatus/GetUpworkProfilesListByDepartment'
  );
  return response?.model;
};

export const EmployeeStatusProjectModulesList = async (
  param: ModulesListModelParams
): Promise<EmployeeStatusProjectModulesListModel[]> => {
  const response = await apiService.get(
    `/EmployeeStatus/GetProjectModulesListByProject?projectId=${param.id}`
  );
  return response?.model;
};

export const EmployeeStatusList = async (
  data: GetEmployeeStatusParamsModel
): Promise<any> => {
  const response = await apiService.get(
    `/EmployeeStatus/GetEmployeeStatus?FromDate=${data.fromDate}&PageNumber=${data.pageNumber}&PageSize=${data.pageSize}&UserProfileId=${data.userProfileId}&ToDate=${data.toDate}`
  );
  return response?.model;
};

export const projectsList = async (): Promise<ProjectListModel[]> => {
  const response = await apiService.get(
    '/EmployeeStatus/GetProjectsListByDepartment'
  );
  return response?.model;
};

export const moduleList = async (
  id: number
): Promise<ProjectModuleListModel[]> => {
  const response = await apiService.get(
    `/EmployeeStatus/GetProjectModulesListByProject?projectId=${id}`
  );
  return response?.model;
};

export const upwokProfileList = async (): Promise<UpworkProfileListModel[]> => {
  const response = await apiService.get(
    '/EmployeeStatus/GetUpworkProfilesListByDepartment'
  );
  return response?.model;
};

export const addEmployeeStatus = async (
  payload: AddEmployeeStatusModel[]
): Promise<any> => {
  const response = await apiService.post(
    '/EmployeeStatus/AddEmployeeStatus',
    payload
  );
  return response?.model;
};

export const teamsProductivity = async (param: ProductivityParams) => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetTeamsProductivity?Month=${param.Month}&Year=${param.Year}`
  );
  return response?.model;
};

export const PerformanceDetail = async (param: TeamLeadDashBoardParam) => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetTeamPerformanceDetail?FromDate=${param.fromDate}&ToDate=${param.toDate}&TeamLeadId=${param.teamLeadId}`
  );
  return response?.model;
};

export const updateEmployeeStatus = async (
  payload: AddEmployeeStatusModel
): Promise<any> => {
  const response = await apiService.put(
    '/EmployeeStatus/UpdateEmployeeStatus',
    payload
  );
  return response?.model;
};

export const deleteEmployeeStatus = async (id: number): Promise<any> => {
  const response = await apiService.delete(
    `/EmployeeStatus/DeleteEmployeeStatusbyId?id=${id}`
  );
  return response?.model;
};

export const ProjectDetails = async (param: TeamLeadDashBoardParam) => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetTeamLeadTotalProjectsDetail?FromDate=${param.fromDate}&ToDate=${param.toDate}&TeamLeadId=${param.teamLeadId}`
  );
  return response?.model;
};

export const perfornmanceChart = async (param: ProductivityParams) => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetEmployeePerformanceDetails?Month=${param.Month}&Year=${param.Year}`
  );
  return response?.model;
};
export const teamListByDepartment = async (
  payload: HRPayLoad
): Promise<TeamListByDepartment> => {
  const response = await apiService.get(
    '/HRDashboard/GetALLTeamListByDepartment',
    payload
  );
  return response?.model;
};

export const hrMonthlyReports = async (attendance: AttendenceFormValue) => {
  const response = await apiService.get(
    `/Reports/GetEmployeesMonthlyLeaveReportByHR?month=${attendance.Month}&year=${attendance.Year}&departmentId=${attendance.DepartmentId}&PageNumber=${attendance.PageNumber}&PageSize=${attendance.PageSize}&SearchValue=${attendance.SearchValue}&IsActive=${attendance.IsActive}&Designation=${attendance.designations}`,
    { responseType: 'blob' }
  );
  return response?.model;
};

export const hrReports = async (attendance: AttendenceFormValue) => {
  const response = await apiService.get(
    `/Reports/GetEmployeesAttendanceReport?Month=${attendance.Month}&Year=${attendance.Year}&departmentId=${attendance.DepartmentId}&PageNumber=${attendance.PageNumber}&PageSize=${attendance.PageSize}&SearchValue=${attendance.SearchValue}&IsActive=${attendance.IsActive}&Designation=${attendance.designations}&TeamAdminId=${attendance.TeamAdminId}`,
    { responseType: 'blob' }
  );

  return response?.model;
};

export const userProjects = async () => {
  const response = await apiService.get('/UserProfile/GetUserProjects', {
    responseType: 'blob',
  });
  return response?.model;
};
export const userTools = async () => {
  const response = await apiService.get('/UserProfile/GetUserTools', {
    responseType: 'blob',
  });
  return response?.model;
};

export const TeamStatusList = async (
  payload: any
): Promise<TeamStatusModel[]> => {
  const response = await apiService.get(
    `/TeamStatus/GetTeamStatusByTeamLead?filterByDate=${payload.filterByDate}`
  );
  return response?.model;
};

export const TeamMemberList = async (
  payLoad: TeamMemberParam
): Promise<any> => {
  const response = await apiService.get(
    `/Employee/GetAllEmployees?TeamAdminId=${payLoad.teamAdminId}`
  );
  return response?.model;
};

export const teamAttendance = async (param: ProductivityParams) => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetTeamAttendance?Month=${param.Month}&Year=${param.Year}`
  );
  return response?.model;
};
export const traineeList = async () => {
  const response = await apiService.get('/TeamLeadDashboard/GetTraineeList');
  return response?.model;
};

export const monthlyTraineeFeedback = async (
  reqParams: EmpProfileReqParams
) => {
  const response = await apiService.get(
    `Employee/GetMonthlyTraineeFeedback?employeeId=${reqParams.employeeId}&departmentId=${reqParams.departmentID}`
  );
  return response?.model;
};

export const performanceList = async (): Promise<Perfornmance[]> => {
  const response = await apiService.get('Employee/GetPerformanceList');
  return response?.model;
};

export const sendWarningMail = async (
  payload: WarningEmailModel
): Promise<any> => {
  const response = await apiService.post(
    '/TeamStatus/SendWarningMailToEmployees',
    payload
  );
  return response?.model;
};

export const teamProductivitySummaryByManager = async (
  payload: ManagerDashBoardModel
): Promise<TeamProductivityResponseModel[]> => {
  const response = await apiService.get(
    `/ManagerDashboard/GetTeamsProductivitySummaryByManager?TeamAdminId=${payload.teamAdminId}&DepartmentId=${payload.departmentId}&Month=${payload.month}&Year=${payload.year}`
  );
  return response?.model;
};

export const projectsSummaryByManager = async (
  payload: ManagerDashBoardModel
): Promise<ProjectSummaryResponseModel> => {
  const response = await apiService.get(
    `/ManagerDashboard/GetProjectsSummaryByManager?teamAdminId=${payload.teamAdminId}&departmentId=${payload.departmentId}`
  );
  return response?.model;
};

export const teamSummaryByManager = async (
  payload: ManagerDashBoardModel
): Promise<TeamSummaryResponseModel[]> => {
  const response = await apiService.get(
    `/ManagerDashboard/GetTeamsSummaryByManager?teamAdminId=${payload.teamAdminId}&departmentId=${payload.departmentId}`
  );
  return response?.model;
};

export const projectsReport = async (reqProjectReport: ProjectsReport) => {
  const response = await apiService.get(
    `/Reports/GetProjectsReport?PageNumber=${reqProjectReport.PageNumber}&PageSize=${reqProjectReport.PageSize}&StartDate=${reqProjectReport.StartDate}&HoursFrom=${reqProjectReport.From}&HoursTo=${reqProjectReport.To}&DepartmentId=${reqProjectReport.DepartmentId}&SearchValue=${reqProjectReport.SearchValue}&TeamAdminId=${reqProjectReport.TeamAdminId}&SortColumn=${reqProjectReport.SortColumn}&SortOrder=${reqProjectReport.SortOrder}`,
    { responseType: 'blob' }
  );
  return response?.model;
};

export const developersReport = async (
  reqDevelopersReport: DevelopersReport
) => {
  const response = await apiService.get(
    `/Reports/GetDevelopersReport?From=${reqDevelopersReport.From}&To=${reqDevelopersReport.To}&DepartmentId=${reqDevelopersReport.DepartmentId}&PageNumber=${reqDevelopersReport.PageNumber}&PageSize=${reqDevelopersReport.PageSize}&SearchValue=${reqDevelopersReport.SearchValue}&TeamAdminId=${reqDevelopersReport.TeamAdminId}&SortColumn=${reqDevelopersReport.SortColumn}&SortOrder=${reqDevelopersReport.SortOrder}`,
    { responseType: 'blob' }
  );
  return response?.model;
};

export const teamReport = async (reqteamReport: TeamsReport) => {
  const response = await apiService.get(
    `/Reports/GetTeamReport?From=${reqteamReport.From}&To=${reqteamReport.To}&DepartmentId=${reqteamReport.DepartmentId}&SearchValue=${reqteamReport.SearchValue}&TeamAdminId=${reqteamReport.TeamAdminId}`,
    { responseType: 'blob' }
  );
  return response?.model;
};
export const projectBillingReport = async (
  reqProjectBillingReport: ProjectBillingReport
) => {
  const response = await apiService.get(
    `/Reports/GetDeveloperProjectBillingReport?EmployeeId=${reqProjectBillingReport.EmployeeId}&From=${reqProjectBillingReport.From}&To=${reqProjectBillingReport.To}`,
    { responseType: 'blob' }
  );
  return response?.model;
};

export const newMemberRequestList = async (): Promise<any> => {
  const response = await apiService.get('/Employee/GetListOfNewRequest');
  return response?.model;
};

export const approveMemberByManager = async (
  payload: ApproveMemberModel
): Promise<any> => {
  const response = await apiService.put(
    '/Employee/UpdateEmployeeManagerAndStatus',
    payload
  );
  return response?.model;
};

export const teamsToDo = async (data: todoParam): Promise<TeamToDoModel[]> => {
  const response = await apiService.get(
    `/Common/GetToDoListByManagerAndTeamLead?DepartmentId=${data.departmentId}&TeamAdminId=${data.teamAdminId}`
  );
  return response?.model;
};

export const addToDoList = async (
  payload: AddToDoPayloadModel
): Promise<any> => {
  const response = await apiService.post('/Common/AddToDo', payload);
  return response?.model;
};

export const individualToDo = async (): Promise<any> => {
  const response = await apiService.get('/Common/GetToDoListByEmployee');
  return response?.model;
};

export const updateTeamberAttendance = async (
  payload: UpdateTeamAttendancePayLoadModel
): Promise<any> => {
  const response = await apiService.put(
    '/TeamStatus/UpdateAttendanceStatus',
    payload
  );
  return response?.model;
};

export const attendanceListFromDB = async (): Promise<
  AttendanceListModel[]
> => {
  const response = await apiService.get('/TeamStatus/GetAttendanceStatusList');
  return response?.model;
};

export const scrumTeamPerformance = async (
  payLoad: ScrumPayLoadModel
): Promise<ScrumTeamPerFormanceResponseModel[]> => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetTeamPerformanceDetail?FromDate=${payLoad.startDate}&ToDate=${payLoad.endDate}&TeamLeadId=${payLoad.teamLeadId}`
  );
  return response?.model;
};
export const scrumTeamProjects = async (
  payLoad: ScrumPayLoadModel
): Promise<ScrumTeamProjectsResponseModel[]> => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetTeamLeadTotalProjectsDetail?FromDate=${payLoad.startDate}&ToDate=${payLoad.endDate}&TeamLeadId=${payLoad.teamLeadId}`
  );
  return response?.model;
};
export const scrumTeamStatus = async (
  payLoad: ScrumPayLoadModel
): Promise<ScrumTeamStatusResponseModel[]> => {
  const response = await apiService.get(
    `/TeamStatus/GetTeamStatusByTeamLead?filterByDate=${payLoad.filterByDate}&teamLeadId=${payLoad.teamLeadId}`
  );
  return response?.model;
};

export const employeeProjectStatus = async (
  param: EmployeeProjectStatusParam
) => {
  const response = await apiService.get(
    `/EmployeeStatus/GetEmployeeStatusByManager?Month=${param.Month}&Year=${param.Year}&EmployeeId=${param.employeeId}&departmentId=${param.departmentId}`
  );
  return response?.model;
};

// export const WorkedProjectWithBillingDetailSummary = async (param: EmployeeProjectStatusParam) => {

//   const response = await apiService.get(`/EmployeeStatus/GetEmployeeStatusByManager?Month=${param.Month}&Year=${param.Year}&EmployeeId=${param.employeeId}`);
//   return response?.model;
// };

export const WorkedProjectWithBillingDetailSummary = async (
  data: ProjectWithBillingDetailSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetEmployeeWorkedProjectWithBillingDetailSummary?EmployeeId=${data.employeeId}&From=${data.fromDate}&To=${data.toDate}`
  );
  return response?.model;
};

export const GetTeamAttendanceSummary = async (
  data: ProjectWithBillingDetailSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetEmployeeAttendanceSummary?EmployeeId=${data.employeeId}&From=${data.fromDate}&To=${data.toDate}`
  );
  return response?.model;
};

export const MonthlyBillingSummary = async (
  data: MonthlyBillingSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetEmployeeMonthlyBillingSummary?employeeId=${data.employeeId}`
  );
  return response?.model;
};

export const employeesAttendanceReport = async (
  params: EmployeesAttendanceReport
) => {
  const response = await apiService.get(
    `/Reports/GetEmployeesReport?PageNumber=${params.PageNumber}&PageSize=${params.PageSize}&DepartmentId=${params.DepartmentId}&SearchValue=${params.SearchValue}&TeamAdminId=${params.TeamAdminId}&SortColumn=${params.SortColumn}&SortOrder=${params.SortOrder}`
  );
  return response?.model;
};
export const workReport = async (params: EmployeesAttendanceReport) => {
  const response = await apiService.get(
    `/Reports/GetEmployeesReport?PageNumber=${params.PageNumber}&PageSize=${params.PageSize}&DepartmentId=${params.DepartmentId}&SearchValue=${params.SearchValue}`
  );
  return response?.model;
};

export const forgotPassword = async (payload: ForgotPasswordPayloadModel) => {
  const response = await apiService.post('/Account/ForgotPassword', payload);
  return response?.model;
};

export const EmployeeWorkedProjectSummary = async (
  param: ProjectWithBillingDetailSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetEmployeeWorkedProjectSummary?EmployeeId=${param.employeeId}&From=${param.fromDate}&To=${param.toDate}`
  );
  return response?.model;
};

export const paymentPendingReport = async (params: PaymentPendingReport) => {
  const response = await apiService.get(
    `/Reports/GetPaymentPendingReport?teamAdminId=${params.teamAdminId}&departmentId=${params.departmentId}&searchText=${params.searchText}`
  );
  return response?.model;
};

export const EmpFeedBack = async (payload: EmpProfileReqParams) => {
  const response = await apiService.get(
    `/Employee/GetMonthlyTraineeFeedback?employeeId=${payload.employeeId}`
  );
  return response?.model;
};

export const TeamProductivitySummary = async (
  data: ProjectWithBillingDetailSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetTeamProductivitySummary?EmployeeId=${data.employeeId}&From=${data.fromDate}&To=${data.toDate}`
  );
  return response?.model;
};

export const projectProductivity = async (data: ProjectProductivityPayloadModel) => {
  const response = await apiService.get(
    `/Project/GetProjectProductivity?projectId=${data.id}&departmentId=${data.departmentId}`
  );
  return response?.model;
};

export const clientReport = async (payload: ClientReportReq) => {
  const response = await apiService.get(
    `/Reports/GetClientReport?FromDate=${payload.From}&ToDate=${payload.To}&DepartmentId=${payload.DepartmentId}&TeamAdminId=${payload.TeamAdminId}`
  );
  return response?.model;
};

export const workInHand = async (payload: WorkInHandReq) => {
  const response = await apiService.get(
    `/Reports/GetWorkInHandReport?searchText=${payload.SearchText}&teamAdminId=${payload.TeamAdminId}&departmentId=${payload.DepartmentId}`
  );
  return response;
};
export const fullReport = async (payload: FullReportByManagerReq) => {
  const response = await apiService.get(
    `/Reports/GetFullReportByManager?TeamAdminId=${payload.TeamAdminId}&DepartmentId=${payload.DepartmentId}&EmployeeId=${payload.EmployeeId}&ProjectId=${payload.ProjectId}&ClientId=${payload.ClientId}&FromDate=${payload.From}&ToDate=${payload.To}`
  );
  return response?.model;
};

export const monthlyHoursReport = async (
  payload: MonthlyReportByManagerReq
) => {
  const response = await apiService.get(
    `/Reports/GetMonthlyHoursListForFullReport?EmployeeId=${payload.EmployeeId}&ProjectId=${payload.ProjectId}&ClientId=${payload.ClientId}&FromDate=${payload.From}&ToDate=${payload.To}`
  );
  return response?.model;
};

export const AssignBadges = async (payload: AssignBagesModel) => {
  const response = await apiService.post(
    '/Setting/AssignBadgeToEmployees',
    payload
  );
  return response?.model;
};

export const WorkedProjectWithBillingDetailSummaryForTeam = async (
  data: ProjectWithBillingDetailSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetTeamWorkedProjectWithBillingDetailSummary?EmployeeId=${data.employeeId}&From=${data.fromDate}&To=${data.toDate}`
  );
  return response?.model;
};

export const MonthlyTeamBillingSummary = async (
  data: MonthlyBillingSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetTeamMonthlyBillingSummary?employeeId=${data.employeeId}`
  );
  return response?.model;
};

export const GetAllTeamAttendanceSummary = async (
  data: ProjectWithBillingDetailSummaryParams
) => {
  const response = await apiService.get(
    `/PerformanceReport/GetTeamAttendanceSummary?EmployeeId=${data.employeeId}&From=${data.fromDate}&To=${data.toDate}`
  );
  return response?.model;
};

export const clientList = async (): Promise<CLientModel[]> => {
  const response = await apiService.get('/Reports/GetClientListForFullReport');
  return response.model;
};

export const invoiceProjectDetails = async (data: InvoiceProjectDetails) => {
  const response = await apiService.get(
    `/Invoice/GetInvoiceProjectsDetails?ClientId=${data.clientId}&From=${data.fromDate}&To=${data.toDate}&DepartmentId=${data.departmentId}`
  );
  return response?.model;
};

export const invoicePaymentStatus = async (): Promise<
  InvoicePaymentModel[]
> => {
  const response = await apiService.get(
    '/Invoice/GetPaymentStatusInvoiceStatusFilter'
  );
  return response.model;
};

export const invoicePayment = async (): Promise<InvoicePaymentModel[]> => {
  const response = await apiService.get(
    '/Invoice/GetPaymentStatusInvoiceStatus'
  );
  return response.model;
};

export const getAllUsers = async (data: UserParam) => {
  const response = await apiService.get(
    `/Employee/GetAllUsers?DepartmentId=${data.departmentId}&SearchValue=${data.searchValue}`
  );
  return response.model;
};

export const updatePaymentStatus = async (data: UpdatePaymentReq) => {
  try {
    const response = await apiService.put(
      `${updatePayment}=${data.id}&paymentStatus=${data.paymentStatus}`,
      data
    );
    return response;
  } catch (error) {
    console.error('Error fetching Update Payment Status:', error);

    return null;
  }
};

export const updateLockStatus = async (data: LockStatus) => {
  try {
    const response = await apiService.put(
      `${updatePayment}=${data.id}&status=${data.status}`,
      data
    );
    return response;
  } catch (error) {
    console.error('Error fetching Update Payment Status:', error);

    return null;
  }
};

export const teamLeadBadges = async () => {
  const response = await apiService.get('/TeamLeadDashboard/GetTeamLeadBadges');
  return response?.model;
};

export const getCLients = async (data:ClientReqParam): Promise<ClientTypeModel[]> => {
  const response = await apiService.get(`/Client/GetClientListByDepartment?departmentId=${data.departmentID}`);
  return response.model;
};

export const salesPersonList = async (departmentId: number): Promise<any> => {
  const response = await apiService.get(
    `/Employee/GetSalesPersonsList?departmentId=${departmentId}`
  );
  return response?.model;
};

export const DepartmentOverallDetails = async (
  data: AdminProductivityParam
) => {
  const response = await apiService.get(
    `/SuperAdminDashboard/GetAllDepartmentProductivity?month=${data.month}&year=${data.year}`
  );
  return response.model;
};

export const DepartmentWiseOverallDetails = async () => {
  const response = await apiService.get(
    '/SuperAdminDashboard/GetDepartmentWiseOverallDetails'
  );
  return response.model;
};

export const scrumTeamAttendance = async (param: ScrumPayLoadModel) => {
  const response = await apiService.get(
    `/TeamLeadDashboard/GetTeamAttendance?Month=${param.month}&Year=${param.year}&TeamLeadId=${param.teamLeadId}`
  );
  return response?.model;
};

export const scrumTeamBioMetric = async (param: any) => {
  const response = await apiService.get(
    `/Common/GetBioMatricAttendanceLogs?EmployeeId=${param.empID}&TeamAdminId=${param.teamAdminId}&DepartmentId=${param.departmentId}&TeamLeadId=${param.teamLeadId}&Month=${param.month}&Year=${param.year}`
  );
  return response?.model;
};

export const attendanceReports = async (param: any) => {
  const response = await apiService.get(
    `/Reports/GetEmployeesAttendanceReport?Month=${param.month}&Year=${param.year}&departmentId=${param.departmentId}&TeamAdminId=${param.teamAdminId}&PageNumber=${param.pageNo}&PageSize=${param.pageSize}&SearchValue=${param.searchValue}`
  );
  return response?.model;
};

export const performanceBadges = async () => {
  const response = await apiService.get('/Employee/GetAwardsList');
  return response?.model;
};

export const projectBillingHistoryDetails = async (
  id: Number
): Promise<any> => {
  const response = await apiService.get(
    `/Project/GetProjectBillingHistory?projectId=${id}`
  );
  return response.model;
};

export const getApplicationDomain=async ()=>{
  const response = await apiService.get('/Project/GetApplicationDomain');
  return response?.model;
};
