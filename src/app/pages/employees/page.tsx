import {
  allDesignations,
  departments,
  employeeStatus,
  employeesById,
  getEmployeeStatus,
  managerList,
  newMemberRequestList,
} from '@/utils/publicApi';
import SearchInput from '@/components/common/Search/search';
import {
  DepartmentModel,
  DesignationsParam,
  EmpReqParams,
  newRequestModel,
} from '@/utils/types';
import Designation from '@/components/employees/designation';
import EmployeeStatus from '@/components/employees/employeeStatus';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import getUser from '@/utils/getUserServerSide';
import Image from 'next/image';
import Footer from '@/components/common/Footer/footer';
import ActionButtons from '@/components/employees/actionButtons';
import TeamMember from '@/components/employees/teamMemberTable';
import PageSizeHandler from '@/components/employees/pazeSizeHandler';

const EmployeeComponent = async ({ searchParams }: any) => {
  let user: any = getUser();
  let departmentID: string = searchParams.departmentId==='null' || searchParams.departmentId==='' || searchParams.departmentId===undefined ||searchParams.departmentId==='undefined' ? '':searchParams.departmentId;
  let searchQuery = searchParams?.searchValue ?? '';
  const selectedDesignation = searchParams?.designation ?? '';
  const selectedEmpStatus = searchParams?.empStatus ?? 1;

  let pageSize = searchParams?.size ?? 10;
  let currentPage = searchParams?.page ?? 1;
  let teamAdminId: string = searchParams.teamAdminId==='null' || searchParams.teamAdminId==='' || searchParams.teamAdminId===undefined || searchParams.teamAdminId==='undefined' ? '': searchParams.teamAdminId ;
  let sortColumn: any = searchParams?.sortColumn;
  let sortOrder: any = searchParams?.sortOrder;
  const empStatusList = await employeeStatus();
  const empStatus = await getEmployeeStatus();

  let getManagerList: any;
  let departmentData: DepartmentModel[] = [];

  try {
    getManagerList = await managerList(Number(departmentID));
  } catch (error: any) {}

  try {
    departmentData = await departments();
  } catch (error) {}

  let newRequest: newRequestModel[] = [];

  let reqParams: EmpReqParams = {
    departmentID: (user.role === 'Admin' || user.role === 'HR') ? departmentID : user?.departmentId,
    searchValue: searchQuery,
    pageSize: pageSize,
    pagenumber: currentPage,
    employeeStatus: selectedEmpStatus,
    designation: selectedDesignation,
    isActive: selectedEmpStatus,
    TeamAdminId: teamAdminId,
    SortColumn: sortColumn??'',
    SortOrder: sortOrder??'',
  };

 

  let initialEmployees = await employeesById(reqParams);

  const totalCount = initialEmployees?.model?.totalCount || 0;
  const totalEntries =
    totalCount < pageSize * currentPage ? totalCount : pageSize * currentPage;

  const params: DesignationsParam = {
    departmentID: (user.role === 'Admin' || user.role === 'HR') ? departmentID : user?.departmentId,
  };

  const designations = await allDesignations(params);

  try {
    const { results } = await newMemberRequestList();
    newRequest = results;
  } catch (error) {}
  

  return (
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
                  <div className='col-xl-9'>
                    <div className='card custom-card'>
                      <div className='card-header justify-content-between'>
                        <div className='card-title'>Team Members</div>
                        
                        <div className='filter-right d-flex gap-x-2'>
                        <div className='selectbox select_designation'>

                           <PageSizeHandler
                            payload={reqParams}
                           />


                          </div>
                          <div className='selectbox select_designation'>
                            <Designation
                              desg={designations}
                              payload={reqParams}
                            />
                          </div>

                          <div className='selectbox'>
                            <EmployeeStatus
                              empStatusList={empStatusList}
                              payload={reqParams}
                            />
                          </div>

                          <div className='search_box'>
                            <i className='ri-search-line' />
                            <SearchInput payload={reqParams} />
                          </div>
                        </div>
                      </div>
                      <div className='card-body'>
                        <TeamMember
                          initialEmployees={initialEmployees}
                          reqParams={reqParams}
                          empStatus={empStatus}
                          totalEntries={totalEntries}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-3'>
                    <div className='card custom-card'>
                      <div className='card-header justify-content-between'>
                        <div className='card-title'>New Member Requests.</div>
                      </div>
                      <div className='card-body'>
                        <div className='table-responsive theme_table'>
                          <table className='table text-nowrap table-hover  '>
                            <thead>
                              <tr>
                                {/* <th scope='col'>User Name</th> */}
                                {/* <th scope='col'>Designation</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Action</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {newRequest.length > 0 &&
                                newRequest.map((item: newRequestModel) => (
                                  <tr key={item.employeeID}>
                                    <td>
                                      <div className='d-flex align-items-center fw-semibold user-with-img'>
                                        <span className='avatar avatar-sm me-2 avatar-rounded'>
                                          {item.profileImage ? (
                                            <Image
                                              src={`https://3t-api.csdevhub.com/images/${item.profileImage}`}
                                              alt='img'
                                              height={50}
                                              width={50}
                                            />
                                          ) : (
                                            item.employeeUserName
                                              .split(' ')
                                              .map((name: any) =>
                                                name[0]?.toUpperCase()
                                              )
                                              .join('')
                                          )}
                                        </span>
                                        {item.employeeUserName}
                                      </div>
                                    </td>

                                    <td>
                                      <ActionButtons id={item.employeeID} />
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          {newRequest.length == 0 && (
                            <span>No Record Found.</span>
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
      <Footer />
    </div>
  );
};

export default EmployeeComponent;
