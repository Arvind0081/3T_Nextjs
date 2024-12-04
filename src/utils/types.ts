

//utils/type.ts

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegiserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  departmentId: number;
  designation: string;
  employeeNumber: string;
  address: string;
  experienceOnJoining: number;
  month:number;
  year: number;
  joiningDate: string;
  confirmPassword: string;
  profileImage: FileList;
};
export type userModel = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string | null;
  departmentId: number;
  designation: string;
  depName: string;
  employeeNumber: string;
  address: string | null;
  experienceOnJoining: string | null;
  joiningDate: string;
  token: string;
};

export type DepartmentModel = {
  id: number;
  name: string;
};

export type DesignationModel = {
  id: number;
  name: string;
};

export type ProjectModel = {
  id: number;
  name: string;
};

export type Technology = {
  id: number;
  name: string;
};

export type Managers = {
  id: string;
  name: string;
};

export type StatusModel = {
  value: number;
  text: string;
};
export type ModuleStatusModel = {
  value: string;
  text: string;
};

export type HiringModel = {
  value: number;
  text: string;
};

export type BillingTypeModel = {
  value: number;
  text: string;
};

export type ProjectMembersModel={
  id: string;
  name: string;
};

export type ClientModel = {
  id: number;
  name: string;
  email: string;
  skypeid: string | null;
  phoneNumber: string | null;
  departmentId: number;
  billingAddress: string | null;
  country: string | null;
  clientCompanyName: string;
  responseMessage: string | null;
  isDeleted: boolean;
};

export type ProjectInfoModel = {
  id: number;
  clientId: number;
  name: string;
  description: string;
  clientName: string;
  createdBy: string;
  notes: string;
  productionUrl: string | null;
  createdTime: string;
  updatedBy: string;
  stageUrl: string | null;
  isBilling: number;
  hiringStatus: number;
  responseMessage: string | null;
  isActive: number;
  projectStatus: number;
  invoiceProjectID: string;
  employeeList: [];
  salesPerson:string;
  skills:string;
};


export type addEditProjectFormValue = {
  id: number;
  clientId: number;
  name: string;
  description: string;
  clientName: string;
  createdBy: string;
  updatedBy: string;
  notes: string | null;
  productionUrl: string | null;
  createdTime: string;
  stageUrl: string | null;
  isBilling: number;
  hiringStatus: number;
  isActive: number;
  projectStatus: number;
  invoiceProjectID: string;
  salesPerson: string;
  skills: [];
  departmentId: number;
  employeeList: [];
  interDepartment:boolean;
  departmentIds:any[];
  applicationDomains:[];
};

export type GetAllProjectsParamsModel={
  departmentId:number,
  pageNumber:number,
  pageSize:number,
  searchValue:string,
  projectStatus:number,
  startDate:string,
  endDate:string,
  sortOrder:string,
  sortColumn:string,
  hiringStatus:number,
  bilingType:number,
  teamAdminId: string;
 }

export type ModuleDetailsModel = {
  nonBillableHours: number;
  billedHours: number;
  id: string;
  name: string;
  projectId: number;
  isActive: boolean;
  createdOn: string;
  updatedOn: string;
  updatedBy: string ;
  createdBy: string ;
  estimatedHours: number;
  deadline: string;
  approvalDate: string;
  paymentStatus: string;
  approvedBy: string;
  moduleStatus: string;
  moduleNotes: string;
};
export type BillingDetailsModel = {
  developerName: string;
  projectModuleName: string;
  upworkHours: number;
  fixedHours: number;
  offlineHours: number;
  totalBilledHours: number;
  nonBillableHours: number;
};

export type EmployeeDetailsModel = {
  applicationUsersId: string;
  employeeName: string;
  projectName: string;
  projectId: number;
  clientId: number;
  clientName: string;
  moduleName: string;
  profileName: string;
  memo: string;
  fixedHours: number;
  upworkHours: number;
  nonBillableHours: number;
  date: string;
  moduleId: string;
};

export type ProjectModuleFormValue = {
  id: number;
  moduleStatus: String[];
  paymentStatus: String[];
  departmentId: number;
  pageSize:number;
  pageNumber:number;
  searchValue:string
};

export type ProjectBillingDetailsModel = {
  id: number;
  billingStartDate: string;
  billingEndDate: string;
  departmentId: number;
};


export type ProjectEmployeeDetailsModel = {
  id: number;
  statusStartDate: string;
  statusEndDate: string;
  departmentId: number;
};

export type ProjectProductivityPayloadModel = {
  id: number;
  departmentId: number;
};

//utils/type.ts

export type EmpReqParams = {

  departmentID: number;
  pagenumber: number;
  pageSize: number;
  searchValue: string;
  employeeStatus: string | number;
  designation: string;
  isActive: string | number;
  TeamAdminId: string;
  SortColumn:string;
  SortOrder:string;


};

export type SettingEmpReqParams = {
  departmentID: number;
  teamAdminId: string| null;
 
};

export type SettingGetTeamLeadAndBDMListParams = {
  departmentID: number;
  teamAdminId: string;
 
};



export type EmpProfileReqParams = {
  employeeId: string;
  departmentID: number;
};

export type Employee = {
  employeeID: number;
  employeeUserName:string,
  firstName: string | null;
  lastName: string | null;
  designation: string;
  department: string;
  email: string;
  empStatus: number;
  responseMessage: string | null;
};

export type EmployeeProfileDetailsResponse = {
  name: any;
  userTools: any;

  userBadges: any;
  employeeID: string;
  firstName: string | undefined;
  lastName: string | undefined;
  designation: string | null;
  profileImage: string;
  departmentId: string;
  department: string;
  email: number;
  phoneNumber: string | null;
  empStatus: number;
  joiningDate: string | null;
  experience: string | null;
  teamAdminId: string;
  manager: string;
  address: string;
  skills: string;
  employeeNumber:string;
  canEditStatus: boolean;
  projects: ProjectDetails[];
  awardList: AwardListRecords[];
  feedbackDetails: FeedbackDetails[];
};


export type FeedbackDetails = {
  feedBackId:number;
  applicationUserId: string;
  assessmentMonth:string;
  mentorName:string;
  recommendedSalary:boolean;
  skillSet:string;


};


export type AwardListRecords = {

    id: string;
    name:string;
    base64Image:string;

};



export type UserProfileDetails = {
  id: string;
  firstName: string | undefined;
  lastName: string | null;
  email: string;
  isActive: string;
  department: string;
  skypeMail: string | null;
  departmentId: string;
  departmentName: string | null;
  designation: string | null;
  profileImage: string;
  skills: string;
  joiningDate: string;
  phoneNumber: string;
  employeeNumber: string;
  address: string;
  experienceOnJoining: string;
  upworkHours: string;
  fixedHours: string;
  offlineHours: string;
  projects: string;
  experienceYears: string;
};

export type MyProfileResponse = {
  model: {
    userProfile: MyProfileDetails;
    userProjects: ProjectDetails[];
    userTools: UserTools[];
  };
};

export type MyProfileDetails = {
  ProfileImage:string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: string;
  department: string;
  skypeMail: string;
  departmentId: string;
  departmentName: string | null;
  designation: string;
  uploadImage: FileList;
  skills: any;
  joiningDate: string;
  phoneNumber: string;
  employeeNumber: string;
  address: string;
  experienceOnJoining: string;
  upworkHours: number;
  fixedHours: number;
  offlineHours: number;
  projects: string;
  experienceYears: string;
  teamAdminFirstName: string;
  teamAdminLastName: string;

};

export type UserTools = {
  description: string;
  technology: string;
  nerworkUrl: string;
  localUrl: string;
  id: number;
  networkUrl: string | null;
  liveUrl: string;
  applicationUsersId: string;
  projectsId: number;
  feature: string;
};

export type EmployeeResponse = {
  statusCode: number;
  message: string;
  model: {
    totalCount: number;
    results: Employee[];
  };
};



export type UpdateEmpReq = {
  employeeId: string;
  isActive: string;
};

export type EmpStatusModel = {
  value: number;
  text: string;
};

export type ClientReqParams = {
  departmentID: number;
  pageNumber: number;
  pageSize: number;
  searchValue: string;
  isActive: string;
  sortColumn:string;
  sortOrder:string;
  teamAdminId:string;
};

export type Client = {
  id: number;
  name: string | null;
  email: string | null;
  skypeid: string;
  phoneNumber: string;
  departmentId: string;
  billingAddress: number;
  country: string;
  clientCompanyName: string;
  responseMessage: string;
  isDeleted: string;
};

export type ClientResponse = {
  statusCode: number;
  message: string;
  model: {
    totalCount: number;
    results: Client[];
  };
};

export type UpworkReqParams = {
  departmentID: number;
  pageNumber: number;
  pageSize: number;
  searchValue: string;
  sortColumn:string;
  sortOrder:string;
  teamAdminId:string;
  profileType:number;

};
export type UpworkBodyParams = {
  id: number;
  name: string | null;
  description: string | null;
  departmentId: number;
  profileType:number
};

export type UpworkResponse = {
  statusCode: number;
  message: string;
  model: {
    totalCount: number;
    results: UpworkBodyParams[];
  };
};


export type UpdateManagerEmployeeReq = {
  employeesById:string
  managerId: string;
  isActive: string;
};
export type GetAllEmpParamsModel={
  pageNo:number,
  pageSize:number,
  searchValue:string,
  projectStatus:number,
  employeeStatus:string
  teamAdminId: string;
}

export type AddProjectModuleFormValues={
  
    id:string,
    name: string,
    projectId: number,
    estimatedHours:number | null,
    deadline: string,
    approvalDate: string,
    paymentStatus: string,
    approvedBy: string,
    moduleStatus:string,
    moduleNotes: string
  
}

export type ProjectModuleBasicDetailsModel={
  id: number,
  name: string,
  description: string,
  createdTime: string,
  createdBy: string,
  clientName: string,
  notes: string,
  assignedTo: string,
  projectUpworkHours: number,
  projectFixedHours: number,
  projectOfflineHours: number,
  projectGetID: string,
  projectListStartDate: string | null,
  projectListEndDate: string | null,
  productionUrl: string,
  stageUrl: string,
  projectStatus: number,
  isBilling: number,
  hiringStatus: number,
  clientId: number,
  invoiceProjectID: string |null,
  createdByUser: string,
  projectDepartmentIds:[],
}

export type ProjectBillingModel={
  developerName: string,
  projectModuleName: string,
  upworkHours: number,
  fixedHours: number,
  offlineHours: number,
  totalBilledHours: number,
  nonBillableHours: number
}

export type ProjectEmployeeStatus={
  applicationUsersId: string,
  employeeName: string,
  projectName: string,
  projectId: number,
  clientId: number,
  clientName: string,
  moduleName: string,
  profileName: string,
memo: string,
  fixedHours: number,
  upworkHours: number,
  nonBillableHours: number,
  date: string,
  moduleId: string
}

export type TeamMembersInProjectModel={
    fullName: string,
    employeeId: string
}

export type TeamLeadAndBDMListModel={
  manager:[],
  teamLead: [],
  bdm: []
}

export type MemberModel={
    id: string,
    name: string
}


export type EmployeeDashboardModel = {
  model: {
    attendenceList: Attendence[];
    userProjects:UserProject[];
  };
};

export type Attendence = {
  day: number;
  dayHours: number;
  billingHours: number;
  monthlyPotentialHours: number;
  attendanceStatus: string;
};

export type UserProject = {
  day: number;
 name:string;
};


export type AttendenceFormValue = {
  designations:string;
  IsActive:number,
  DepartmentId:number;
  Month: number;
  Year: number;
  PageNumber:number;
   PageSize:number;
  SearchValue:string
  TeamAdminId: string;
 // Date: string;
};
export type AttendenceEmp = {
 
  Month: number;
  Year: number;
}

export type EmployeeStatus = {
  showModal: any;
  id: number;
  attendanceStatus:string |null 
  applicationUsersId: string;
  projectID: number;
  date: string;
  moduleId:string
  profileName: string;
  memo: string;
  upworkHours:number;
  fixedHours:number;
  offlineHours:number;
  isSVNUpdated:boolean;
  updatedClient:boolean;
  markAsLeave:boolean;
  profileId:number|null
};
export type EmployeeLeaveStaus= {
  markAsLeave: boolean,      
  date: string,     
  applicationUsersId: string
};
export type EmployeeStatusProjectListModel = {
  id: number;
  name: string;
};

export type EmployeeStatusUpworkProfileListModel = {
  id: string;
  name: string;
};

export type EmployeeStatusProjectModulesListModel = {
  id: string;
  name: string;
};


export type ModulesListModelParams  = {
  id: number |string;

};

export type GetEmployeeStatusParamsModel={
  fromDate:string,
        toDate:string,
        pageNumber:number,
        pageSize:number,
      userProfileId:string
}
export type GetEmployeeStatusResponseModel={
  moduleName: string,
      attendanceStatus: string,
      clientName: string,
      projectName: string,
      id: number,
      applicationUsersId: string,
      projectID: number,
      date: string,
      moduleId: null,
      profileName: string,
      memo: string,
      upworkHours: number,
      fixedHours:number,
      offlineHours: number,
      isSVNUpdated: boolean,
      updatedClient: boolean,
      markAsLeave: boolean,
      profileId:number
}

export type AddEmployeeStatusFormModel={
  id: number| undefined,
  applicationUsersId: string,
    projectID: number|null,
    date: string,
    moduleId: string,
    profileName: string,
    memo: string,
    upworkHours: number|null,
    fixedHours: number|null,
    offlineHours: number|null,
    //isSVNUpdated: boolean,
    updatedClient: boolean,
    markAsLeave: boolean,
    profileId:number|null
}


export type ProjectListModel={
  id:number,
  name:string
}
export type ProjectModuleListModel={
  id:string,
  name:string
}

export type UpworkProfileListModel={
  id:string,
  name:string
}

export type AddEmployeeStatusModel={
    id: number,
    applicationUsersId: string,
    projectID: number,
    date: string,
    moduleId: string,
    profileName: string,
    memo: string,
    upworkHours: number,
    fixedHours: number,
    offlineHours: number,
   // isSVNUpdated: boolean,
    updatedClient: boolean,
    markAsLeave: boolean
}

export type ProductivityParams = {
 
  Month: number;
  Year: number;
 
};
export interface HRPayLoad {
  departmentId: number;
  teamAdminId: string;
}
export interface TeamListByDepartment {
  message: any[];
  model: Model[];
}

export interface Model {
  teamLeadId: string;
  teamLeadName: string;
  employees: Employee[];
}

export interface Employees {
  employeeId: string;
  employeeName: string;
  designation: string;
  profileImage: null | string;
}

export type TeamStatusModel={
    id: string,
    email: string,
    name:string,
    projectName: string,
    clientName: string,
    moduleName: string,
    profileName: string,
    memo: null | string,
    upworkHours: null | number,
    fixedHours: null | number,
    billingHours: null | number,
    nonBillableHours: null | number,
    attendance: null | string,
    clientId: number,
    projectId: number,
    moduleId: null |string
}

export type TeamMemberModel= {
  id: string,
  firstName: string,
  lastName: string,
  profileImageName: string,
  email: string,
  phoneNumber: string,
  designation: string,
  employeeNumber: string,
  address: string,
  experienceOnJoining: number,
  joiningDate: string,
  projectCount: number,
  badges: []
}

export type teamAttedance = {
  employeeName: string;
  employeeAttendance: Attendance[];
};

type Attendance = {
  attendanceStatus: string;
  day: number;
  fixedHours: number;
  upworkHours: number;
  offlineHours: number;
  totalHours: number;
};
export type Perfornmance = {
  value: number;
  text: string;
};

export type MonthlyFeedback = {
  feedBackId: number;
  applicationUserId: string | null;
  assessmentMonth: string | null;
  mentorName: string;
  skillSet: string;
  comments: string;
  performance:number| null;
  
};

export type WarningEmailModel = {
  employeeId: string[],
  description: string
};

export type ManagerDashBoardModel = {
  teamAdminId: string,
  departmentId: number,
  month:number,
  year:number
};

export type TeamProductivityResponseModel= {
  teamLeadId: string,
  teamLeadName: string,
  productivityHours: number,
  expectedProductivityHours: number,
  productivityPercentage: number
}

export type ProjectSummaryResponseModel={
  teamAdminId: string;
  totalEmployees: number,
  productivityPercentage: number,
  pendingPayment: number,
  workInHand: number
}

export type teamMember={
  teamMemberId: string,
  teamMemberName: string,
  teamMemberDesignation: string,
  teamMemberProfilePicture: string
}

export type TeamSummaryResponseModel= {
  teamLeadId: string,
  teamLeadName: string,
  teamLeadProfilePicture: string,
  teamMembers: teamMember[]
}

export interface GetUserProjects {
  message: any[];
  model: Model[];
}

export interface Model {
  id: number;
  description: null | string;
  nerworkUrl: null | string;
  localUrl: null;
  dateTime: Date;
  applicationUsersId: string;
  technology: string;
}
export interface GetUserTools {
  message: any[];
  model: Model[];
}

export interface Model {
  id: number;
  description: string | null;
  svnUrl: null;
  projectName: string;
  liveUrl: null;
  localUrl: null;
  applicationUsersId: string;
  projectsId: number;
  technology: string;
  feature: boolean;
}

export type ProjectDetails = {
  projectName: string | null;
  technology: string;
  description: string;
  productionURL: string;
  id: number;
  svnUrl: string | null;
  liveUrl: string;
  localUrl: string;
  applicationUsersId: string;
  projectsId: number;
  feature: string;
  TeamAdminId:string;
  getUserTools: GetUserTools
  getUserProjects: GetUserProjects
}

export interface ProjectsReport {
  PageNumber: number;
  PageSize: number;
  StartDate: string;
  From: string;
  To: string;
  DepartmentId: number;
  SearchValue: string;
  TeamAdminId: string;
  SortColumn:string;
  SortOrder:string;
}

export interface DevelopersReport {
  From: string;
  To: string;
  PageNumber: number;
  PageSize: number;
  DepartmentId: number;
  SearchValue: string;
  TeamAdminId: string;
  SortColumn:string;
  SortOrder:string;
}

export interface TeamsReport {
  From: string;
  To: string;
  DepartmentId: number;
  SearchValue: string;
  TeamAdminId: string;
}
export interface ProjectBillingReport {
  From: string;
  To: string;
  EmployeeId: any;
}

export type newRequestModel= {
  employeeID: string,
  employeeUserName: string,
  profileImage:string,
  designation: string,
  department: string,
  email: string,
  empStatus: number,
  teamAdminId: string,
  responseMessage: string
}

export type ApproveMemberModel={
  employeeId:string,
  teamAdminId:string,
        isActive:number
}

export type TeamToDoModel={
    teamLeadId: string;
    employeeId: string,
    employeeName: string,
    toDoList: any
}

export type AddToDoPayloadModel={
 toDo: string,
  assignedToId: string
}

export type UpdateTeamAttendancePayLoadModel={
  empId: string[],
  filterByDate:string,
  attendanceStatus: number
}

export type AttendanceListModel={
   value: number,
      text: string
}

export type ScrumPayLoadModel={
  startDate:string,
  endDate:string,
  teamLeadId:string,
  filterByDate:string,
  month: number,
  year: number,
  selectedMonth:any,
  departmentId:number,
  teamAdminId:string,
  empID:string
}

export type ScrumTeamPerFormanceResponseModel= {
  employeeId: string,
  name: string,
  fixedHours: number,
  upworkHours: number,
  nonBillableHours: number,
  totalBilling: string,
  productivityPercentage:number
}

export type ScrumTeamProjectsResponseModel= {
    projectId: number,
    projectName: string,
    clientId: number,
    clientName: string,
    fixedHours: number,
    upworkHours: number,
    nonBillableHours: number,
    totalBilling: string
  
}

export type ScrumTeamStatusResponseModel={
  id: string,
  email: string,
  name: string,
  projectName: string,
  clientName: string,
  moduleName: string,
  profileName: string,
  memo: string,
  upworkHours: number,
  fixedHours: number,
  billingHours: number,
  nonBillableHours: number,
  attendance:string| null,
  clientId: number,
  projectId: number,
  moduleId: string,
  profileId: number
}

export type Awards = {
  id: number;
  badgeId: number;
  userId: string | null;
  badgeDescription: string | null;
};

export type EmployeeProjectStatusParam = {
  Month: number;
  Year: number;
  employeeId: string;
departmentId:number;
};

export type EmployeeProfileDetails = {
  employeeId: string;
  firstName: string;
  lastName: string;
  skypeMail: string;
  designation: string;
  departmentId: number;
  email: string;
  isActive: number;

  canEditStatus: string;

  phoneNumber: string;
  address: string;
  skills: any;
  joiningDate: string;
};

export type ProjectWithBillingDetailSummaryParams = {
  employeeId: string;
  fromDate: string;
  toDate: string;
};

export type MonthlyBillingSummaryParams = {
  employeeId: string;
  
};

export type UpdateEmployeeReq = {
  employeeId: string;
  isActive: number;
};
export type UpdateManagerReq = {
  employeeId: string;
  teamAdminId: string;
};

export type   EmployeesAttendanceReport = {
  PageNumber: number;
  PageSize: number;
  DepartmentId: number;
  SearchValue: string;
  TeamAdminId:string;
  SortColumn:string;
  SortOrder:string;
};

export interface TeamsReport {
  From: string;
  To: string;
  DepartmentId: number;
  SearchValue: string
}
export interface ProjectBillingReport {
  From: string;
  To: string;
  EmployeeId: any;
}

export type ForgotPasswordPayloadModel={
  email: string,
  domainName: string
}

export type ResetPasswordPayloadModel={
  token: string,
  password: string
}

export type ValidatePasswordPayloadModel={
  token: string
}

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};
export interface PaymentPendingReport {
  teamAdminId: string;
  departmentId: number;
  searchText:string;
}

export type WorkedProjectSummary = {
  employeeId: string;
  fromDate: string;
  toDate: string;
};

export interface PaymentPendingReport {
  teamAdminId: string;
  departmentId: number;
}
export interface ClientReportReq {
  From: string;
  To: string;
  DepartmentId: number;
  TeamAdminId: string;
 
}

export type TeamProductivityParams = {
  employeeId: string;
  fromDate: string;
  toDate: string;
}

export type TeamMemberParam = {
  teamAdminId: string,
 
};

export interface PaymentPendingReport {
  teamAdminId: string;
  departmentId: number;
  searchText: string
}

 
export interface WorkInHandReq {
  SearchText: string;
  DepartmentId: number;
  TeamAdminId: string;
}
export interface FullReportByManagerReq {
  EmployeeId: string;
  DepartmentId: number;
  TeamAdminId: string;
  ProjectId: number;
  ClientId: number;
  From: string;
  To: string;
 
}


export type TeamLeadDashBoardParam={
  teamLeadId:string;
  fromDate: string;
  toDate: string;
}

export type AssignBagesModel={
  month :number,
  year :number,
  departmentId:number
}
export type DesignationsParam = {
  departmentID: number;

};

export type CLientModel = {
  id: number;
  name: string;
};

export type InvoiceProjectDetails = {
  clientId: number;
  fromDate: string;
  toDate: string;
  departmentId:number;
};

export type InvoicePaymentModel = {
  value: number;
  text: string;
};

export type UserParam = {
  searchValue: string;
  departmentId:number;
  pageNumber:number;
  pageSize:number;
  
};

export type UpdatePaymentReq = {
  id: number;
  paymentStatus: number;
};

export type LockStatus = {
  id: number;
  status:boolean;
};

export type ToDoReqParam = {
  teamAdminId:string;
};

export type ClientTypeModel = {
  id: string;
  name: string;
};

export type AdminProductivityParam={
  month :number;
  year :number;

}

export type todoParam={
 departmentId:number;
 teamAdminId:string;

}

export type reportAttendenceFormValue={
  departmentId: number,
  month:number,
  year: number,
  pageNo: number,
  pageSize: number,
  searchValue: string,
  teamAdminId: string,
  date:string
}
export interface MonthlyReportByManagerReq {
  EmployeeId: string;
  ProjectId: number;
  ClientId: number;
  From: string;
  To: string;
 
}

export type applicationDomainModel={
 id: number,
 domainType:string
}

export type CLientModelByDepartment = {
  id: string;
  name: string;
};

export type ClientReqParam = {
  departmentID:number;
};
