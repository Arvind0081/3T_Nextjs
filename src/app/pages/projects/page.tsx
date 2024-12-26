import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import { format } from 'date-fns';
import {
  projectsStatus,
  projects,
  projectsHiring,
  projectsBillingType,
  projectsClientList,
  individualProjectStatus,
  projectsHiringFilter,
  projectsBillingTypeFilter,
  getApplicationDomain,
  technologyList,
  managerList,
  departments,
} from '@/utils/publicApi';
import {
  ProjectInfoModel,
  GetAllProjectsParamsModel,
  applicationDomainModel,
  Technology,
  DepartmentModel,
} from '@/utils/types';
import Search from '@/components/projects/search';
import ProjectStatus from '@/components/projects/projectStatus';
import Paginator from '@/components/projects/pagination';
import ShowEntries from '@/components/projects/showEntries';
import AddProjectButton from '@/components/projects/addProjectButton';
import ProjectTable from '@/components/projects/projectTable';
import getUser from '@/utils/getUserServerSide';
import DateFilter from '@/components/projects/dateFilterAllProjects';
import BillingAndHiringStatusFilter from '@/components/projects/billingAndHiringStatusFilter';

const Projects = async ({ searchParams }: any) => {
  let projectStatus: number = searchParams.status ?? 2;
  let pageSize: number = searchParams.size ?? 10;
  let searchValue: string = searchParams.search ?? '';
  let currentPage: number = searchParams.page ?? 1;
  let hiringStatusId: number = searchParams.hiringStatus ?? 0;
  let bilingTypeId: number = searchParams.bilingType ?? 0;
  let departmentID: any =
  searchParams.departmentId === 'null' ||
  searchParams.departmentId === '' ||
  searchParams.departmentId === undefined ||
  searchParams.departmentId === 'undefined'
    ? ''
    : searchParams.departmentId;
    let teamAdminId: string =
    searchParams.teamAdminId === 'null' ||
    searchParams.teamAdminId === '' ||
    searchParams.teamAdminId === undefined ||
    searchParams.teamAdminId === 'undefined'
      ? ''
      : searchParams.teamAdminId;
  let sortColumn: string = searchParams.sortColumn ?? '';
  let sortOrder: string = searchParams.sortOrder ?? '';
  let today = new Date();
  let startDate =
    searchParams.startDate ??
  format(new Date(today.setDate(today.getDate() - 6)), 'yyyy-MM-dd');
  let endDate = searchParams.endDate ?? format(new Date(), 'yyyy-MM-dd');
  let allProjects: ProjectInfoModel[] = [];
  let totalRecords: number = 0;
  let clientList: any;
  let billingType: any;
  let billingTypeFilter: any;
  let statusData: any;
  let hiringType: any;
  let hiringTypeFilter: any;
  let result: any;
  let applicationDomain: applicationDomainModel[] = [];
  let technologies: Technology[] = [];

  const token: any = getUser();
  try {
    statusData = await projectsStatus();
  } catch (error) {}
  try {
    hiringType = await projectsHiring();
  } catch (error) {}
  try {
    hiringTypeFilter = await projectsHiringFilter();
  } catch (error) {}
  try {
    billingType = await projectsBillingType();
  } catch (error) {}
  try {
    billingTypeFilter = await projectsBillingTypeFilter();
  } catch (error) {}

  try {
    clientList = await projectsClientList(Number(token?.departmentId));
  } catch (error) {}

  const projectStatusData = await individualProjectStatus();

  let data: GetAllProjectsParamsModel = {
    departmentId:token.role === 'Admin' ? Number(departmentID) : Number(token?.departmentId),
    pageNumber: currentPage,
    pageSize: pageSize,
    searchValue: searchValue,
    projectStatus: projectStatus,
    startDate: startDate,
    endDate: endDate,
    sortOrder: sortOrder,
    sortColumn: sortColumn,
    hiringStatus: hiringStatusId,
    bilingType: bilingTypeId,
    teamAdminId: teamAdminId,
  };

  try {
    result = await projects(data);
    if (result) {
      const { projects, totalCount } = result;
      allProjects = projects;
      totalRecords = totalCount;
    }
  } catch (error) {}

  try {
    applicationDomain = await getApplicationDomain();
  } catch (error) {}

  try {
    technologies = await technologyList();
  } catch (error) {}

  const showingRecordCount = () => {
    const startRecord = totalRecords > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);
    return `Showing ${startRecord} to ${endRecord} of ${totalRecords} Entries`;
  };

  let getManagerList: any;

  let departmentData: DepartmentModel[] = [];

  try {
    departmentData = await departments();
  } catch (error) {}

  try {
    getManagerList = await managerList(Number(departmentID));
  } catch (error: any) {}

  return (
    <>
      {/* <!-- PAGE --> */}
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          {/* <!-- app-Header --> */}
          <Header
            getManagerList={getManagerList}
            departmentData={departmentData}
          />
          {/* <!--APP-SIDEBAR--> */}
          <SideNav />
          {/* <!--app-content open--> */}
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              {/* <!-- CONTAINER --> */}
              <div className='main-container container-fluid'>
                {/* <!-- Project --> */}
                <div className='row'>
                  <div className='col-xl-12'>
                    <div className='card custom-card'>
                      <div className='card-header justify-content-between'>
                        <div className='filter-left d-flex gap-x-2 project_leftBox'>
                          <DateFilter data={data} />
                        </div>

                        <div className='filter-right d-flex gap-x-2 project_leftBox'>
                          <BillingAndHiringStatusFilter
                            data={data}
                            hiringTypeFilter={hiringTypeFilter}
                            billingTypeFilter={billingTypeFilter}
                          />
                          <ProjectStatus statusData={statusData} data={data} />
                          <Search data={data} />
                          <AddProjectButton
                            projectStatusData={projectStatusData}
                            hiringType={hiringType}
                            billingType={billingType}
                            clientList={clientList}
                            applicationDomain={applicationDomain}
                            technologies={technologies}
                          />
                        </div>
                      </div>
                      <div className='card-body'>
                        <div className='d-flex flex-wrap justify-content-between dataTable_filterBox'>
                          <ShowEntries data={data} />
                        </div>
                        <ProjectTable
                          allProjects={allProjects}
                          projectStatusData={projectStatusData}
                          hiringType={hiringType}
                          billingType={billingType}
                          clientList={clientList}
                          data={data}
                          applicationDomain={applicationDomain}
                          technologies={technologies}
                        />
                        {allProjects.length == 0 && (
                          <span>No record found.</span>
                        )}
                      </div>
                      <div className="card-footer">
                        <div className="d-flex align-items-center">
                          {allProjects.length !== 0 && <div>
                            {showingRecordCount()}

                            <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                          </div>}
                          <div className="ms-auto">
                            {allProjects.length !== 0 && <Paginator
                              totalRecords={totalRecords}
                              data={data}
                            />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
              {/* <!-- CONTAINER--> */}
            </div>
            {/* <!-- CONTAINER END --> */}
          </div>
        </div>

        {/* FOOTER  */}
        <Footer />
      </div>
    </>
  );
};

export default Projects;
