import React from 'react';
import getUser from '@/utils/getUserServerSide';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import {
  individualProjectStatus,
  projectModulesDetails,
  projectModulesStatus,
  projectPaymentStatus,
  projectsBillingType,
  projectsClientList,
  projectsHiring,
  getApplicationDomain,
  technologyList,
} from '@/utils/publicApi';
import {
  applicationDomainModel,
  BillingTypeModel,
  ClientModel,
  HiringModel,
  ModuleStatusModel,
  ProjectModuleBasicDetailsModel,
  StatusModel,
  Technology,
} from '@/utils/types';
import EditProjectButton from '@/components/projects/editProjectDetailsButton';
import ProjectDetail from '@/components/projects/projectDetail';
import BillingDetailsTable from '@/components/projects/billingDetailsTable';
import ModuleDetailsTable from '@/components/projects/moduleDetailSTable';
import EmployeeBillingDetailsTable from '@/components/projects/employeeBillingDetailsTable';

type Props = {
  params: {
    projectDetails: number;
  };
};
const ProjectDetails = async ({ params}: Props) => {
  
  const projectId = params.projectDetails;
  const token: any = getUser();
  
//   const moduleStatus = searchParams.ModuleStatus ?? 'Open';
//   const paymentStatus = searchParams.PaymentStatus ?? 'Pending';
// const pageSize=searchParams.PageSize??10;
// const pageNumber=searchParams.PageNumber??1;
// const searchValue=searchParams.SearchValue??'';


  // const payload: ProjectModuleFormValue = {
  //   id: projectId,
  //   moduleStatus: moduleStatus,
  //   paymentStatus: paymentStatus,
  //   billingStartDate: billingStartDate,
  //   billingEndDate: billingEndDate,
  //   statusStartDate: statusStartDate,
  //   statusEndDate: statusEndDate,
  //   departmentId: Number(token?.departmentId),
  //   pageSize:Number(pageSize),
  //   pageNumber:Number(pageNumber),
  //   searchValue:searchValue
  // };


  // let totalRecords:number=0;
  // let moduleDetails: ModuleDetailsModel[] = [];
  let projectModels: ProjectModuleBasicDetailsModel = {
    id: 0,
    name: '',
    description: '',
    createdTime: '',
    createdBy: '',
    clientName: '',
    notes: '',
    assignedTo: '',
    projectUpworkHours: 0,
    projectFixedHours: 0,
    projectOfflineHours: 0,
    projectGetID: '',
    projectListStartDate: null,
    projectListEndDate: null,
    productionUrl: '',
    stageUrl: '',
    projectStatus: 0,
    isBilling: 0,
    hiringStatus: 0,
    clientId: 0,
    invoiceProjectID: null,
    createdByUser: '',
    projectDepartmentIds:[],
  };

  let projectModuleStatus: ModuleStatusModel[] = [];
  let projectPaymentsStatus: ModuleStatusModel[] = [];
  let hiringType: HiringModel[] = [];
  let billingType: BillingTypeModel[] = [];
  let clientList: ClientModel[] = [];
  let projectStatusData: StatusModel[] = [];

let applicationDomain:applicationDomainModel[]=[];
    let technologies: Technology[] = [];


  try {
    const payload={
      id: projectId,
      departmentId: Number(token?.departmentId),
    };
    projectModels = await projectModulesDetails(payload);
  } catch (error) {}

  try {
    projectPaymentsStatus = await projectPaymentStatus();
  } catch (error) {}

  try {
    projectModuleStatus = await projectModulesStatus();
  } catch (error) {}

  try {
    projectStatusData = await individualProjectStatus();
  } catch (error) {}

  try {
    clientList = await projectsClientList(Number(token?.departmentId));
  } catch (error) {}
  try {
    billingType = await projectsBillingType();
  } catch (error) {}
  try {
    hiringType = await projectsHiring();
  } catch (error) {}
  
  // try {
  //   const result:any = await modulesDetails(payload);
  //   if (result) {
  //     const { results, totalCount } = result;
  //     moduleDetails=results;
  //     totalRecords=totalCount;
  // } 
    
   
  // } catch (error) {}


  try {
    applicationDomain= await getApplicationDomain(); 
} catch (error) {
    
}

try {
    technologies = await technologyList();
} catch (error) {
    
}



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
              <div className='main-container container-fluid'> 

              <div className="col-xl-12">
                        <div className="d-flex justify-content-between items-center ">
                           <div className="fs-18 text-semibold">{projectModels?.name}</div>
                           <EditProjectButton
                          id={projectId}
                          projectStatusData={projectStatusData}
                          hiringType={hiringType}
                          billingType={billingType}
                          clientList={clientList}
                          applicationDomain={applicationDomain}
                          technologies={technologies}
                        />
                    </div>
                      </div>
                  


                <div className='row'>
                  <div className='col-xl-12'>

                    <ProjectDetail projectId={projectId} projectModels={projectModels} projectStatusData={projectStatusData}  hiringType={hiringType} />
                    <ModuleDetailsTable projectId={projectId} projectModuleStatus={projectModuleStatus} projectPaymentsStatus={projectPaymentsStatus} />
                    <BillingDetailsTable projectId={projectId}  />
                    <EmployeeBillingDetailsTable projectId={projectId} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

     
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetails;
