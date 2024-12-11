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
} from '@/utils/publicApi';
import {
  ProjectInfoModel,
  GetAllProjectsParamsModel,
  applicationDomainModel,
  Technology,
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
  let teamAdminId:string= searchParams.teamAdminId==='null' || searchParams.teamAdminId==='' || searchParams.teamAdminId===undefined || searchParams.teamAdminId==='undefined' ? '': searchParams.teamAdminId ;
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
    departmentId: Number(token?.departmentId),
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

  return (
    <>
      {/* <!-- PAGE --> */}
      <div className="app sidebar-mini ltr light-mode">
        <div className="page">
          {/* <!-- app-Header --> */}
          <Header />
          {/* <!--APP-SIDEBAR--> */}
          <SideNav />
          {/* <!--app-content open--> */}
          <div className="main-content app-content mt-0">
            <div className="side-app">
              {/* <!-- CONTAINER --> */}
              <div className="main-container container-fluid">
                {/* <!-- Project --> */}
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card custom-card">
                      <div className="card-header justify-content-between">
                        <div className="filter-left d-flex gap-x-2 project_leftBox">
                          <DateFilter data={data} />
                        </div>

                        <div className="filter-right d-flex gap-x-2 project_leftBox">
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
                      <div className="card-body">
                        <div className="d-flex flex-wrap justify-content-between dataTable_filterBox">
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
                {/* <!-- Projects END --> */}

                {/* <!--Delete Modal --> */}
                <div className="modal fade" id="DeleteModal">
                  <div
                    className="modal-dialog modal-dialog-centered text-center"
                    role="document"
                  >
                    <div className="modal-content tx-size-sm">
                      <div className="modal-body text-center p-4 pb-5">
                        <button
                          aria-label="Close"
                          className="btn-close position-absolute"
                          data-bs-dismiss="modal"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <i className="icon icon-close fs-70 text-danger lh-1 my-5 d-inline-block"></i>
                        <h4 className="text-danger">
                          Are you sure you want to delete?
                        </h4>
                        <p className="mg-b-20 mg-x-20">
                          Do you Really want to delete this record?
                        </p>
                        <button
                          aria-label="Close"
                          className="btn btn-danger pd-x-25"
                          data-bs-dismiss="modal"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Add Projects--> */}

                {/* <!-- Update Project--> */}
                <div
                  className="offcanvas offcanvas-end ModalW500"
                  // tabIndex='-1'
                  id="UpdateProjectModal"
                  aria-labelledby="UpdateProjectModalLabel"
                >
                  <div className="offcanvas-header">
                    <h5>Update Project</h5>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <i className="fe fe-x fs-18"></i>
                    </button>
                  </div>
                  <div className="offcanvas-body">
                    <form className="status-repeat-box row m-0">
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputCity">Project Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputState">Hiring Status</label>
                        <select id="inputState" className="form-control">
                          <option value="0">Choose Hiring Status</option>
                          <option value="1">Agency</option>
                          <option value="2">Freelancer</option>
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputState">Client Name</label>
                        <select id="inputState" className="form-control">
                          <option>Select Profile</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputState">Status</label>
                        <select id="inputState" className="form-control">
                          <option>Select Status</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputState">Billing Type</label>
                        <select id="inputState" className="form-control">
                          <option>Choose Billing Type</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputState">Project Invoice ID</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputState">Production Url</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="inputState">Dev/Stage Url</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <div className="col-md-12 form-group">
                        <label htmlFor="inputCity">Description </label>
                        <textarea
                          id="inputState"
                          className="form-control h50"
                        ></textarea>
                      </div>
                      <div className="col-md-12 form-group">
                        <label htmlFor="inputCity">Important Notes </label>
                        <textarea
                          id="inputState"
                          className="form-control h100"
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="offcanvas-footer text-right">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </div>

                {/* <!-- Notes--> */}
                <div
                  className="offcanvas offcanvas-end ModalW500"
                  // tabIndex='-1'
                  id="NotesProjectModal"
                  aria-labelledby="NotesProjectModalLabel"
                >
                  <div className="offcanvas-header">
                    <h5>Project Notes</h5>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <i className="fe fe-x fs-18"></i>
                    </button>
                  </div>
                  <div className="offcanvas-body">
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <textarea
                          id="inputState"
                          className="form-control"
                          style={{ height: '500px' }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="offcanvas-footer text-right">
                    <button type="submit" className="btn btn-danger">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
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
