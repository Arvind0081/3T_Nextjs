import DeleteButton from '@/components/common/Delete/delete';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import Designation from '@/components/hrEmployeesDashBoard/desginations';
import Image from 'next/image';
import {
    allDesignations,
    departments,
    employeeStatus,
    employeesById,
    getEmployeeStatus,
    managerList,
    teamListByDepartment,
} from '@/utils/publicApi';
import getUser from '@/utils/getUserServerSide';
import { DepartmentModel, DesignationsParam, EmpReqParams, GetAllEmpParamsModel, HRPayLoad } from '@/utils/types';
import EmployeeStatus from '@/components/employees/employeeStatus';
import SearchInput from '@/components/employees/searchInput';
import UpdateEmployeeStatus from '@/components/employees/updateEmployeeStatus';
import Link from 'next/link';
import Paginator from '@/components/common/Pagination/pagination';
const HREmployeesBoard = async ({ searchParams }: any) => {
    let user: any = getUser();
    let searchQuery = searchParams?.search ?? '';
    const selectedDesignation = searchParams?.designation??'';
    const selectedEmpStatus = searchParams?.empStatus;
    const hrDepSelected = searchParams?.departmentId;
    let managerId = searchParams?.managerId;

    const desgParams: DesignationsParam = {
        departmentID:user.departmentId
      };
    

    const designations = await allDesignations(desgParams);
    let empStatus: any;
    let empStatusList: any;
    
    let initialEmployees: any;
    let pageSize = searchParams?.size ?? 10;
    let currentPage = searchParams?.page ?? 1;

    let roleDepartmentID = searchQuery
        ? 0
        : hrDepSelected != undefined
          ? hrDepSelected
          : user.departmentId;
    let data: GetAllEmpParamsModel = {
        pageNo: currentPage,
        pageSize: pageSize,
        searchValue: searchQuery,
        projectStatus: 0,
        employeeStatus: selectedEmpStatus,
        teamAdminId:managerId??''
    };
    let reqParams: EmpReqParams = {
        departmentID: Number(roleDepartmentID),
        searchValue: searchQuery,
        pageSize: pageSize,
        pagenumber: currentPage,
        employeeStatus: '',
        designation: selectedDesignation,
        isActive: selectedEmpStatus !== undefined ? selectedEmpStatus : '',
        TeamAdminId:managerId??'',
        SortColumn:'',
        SortOrder:'',
    };
 
    // try {
    //     departmentData = await departments();
    // } catch (error) {}

    try {
        initialEmployees = await employeesById(reqParams);
    } catch (error) {}
    try {
        empStatus = await getEmployeeStatus();
    } catch (error) {}
    const totalCount = initialEmployees?.model?.totalCount || 0;

    const totalEntries =
    totalCount < pageSize * currentPage ? totalCount : pageSize * currentPage;
    try {
        empStatusList = await employeeStatus();
    } catch (error) {}

    let departmentID = searchParams?.departmentId ?? 1;

   
    let departmentData: DepartmentModel[] = [];
    let getManagerList: any;

    const hrReq: HRPayLoad = {
        departmentId: Number(departmentID),
        teamAdminId: managerId ?? '',
    };
    try {
       await teamListByDepartment(hrReq);
       

    } catch (error) {}
    try {
        departmentData = await departments();
    

    } catch (error) {}
    try {
        getManagerList = await managerList(departmentID);
     
    } catch (error: any) {}
    return (
        <div className="app sidebar-mini ltr light-mode">
            <div className="page">
                <div className="page-main">
                    <Header getManagerList={getManagerList} departmentData={departmentData} />

                    <SideNav />
                    <div className="main-content app-content mt-0">
                        <div className="side-app">
                            <div className="main-container container-fluid">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card custom-card">
                                            <div className="card-header justify-content-between">
                                                <div className="card-title">
                                                    All Employee
                                                </div>
                                                <div className="filter-right d-flex gap-x-2">
                                                    <div className="selectbox select_designation">
                                                        <Designation
                                                            desg={designations}
                                                        />
                                                    </div>
                                                    <div className="selectbox">
                                                        <EmployeeStatus
                                                            empStatusList={
                                                                empStatusList
                                                            }
                                                        />
                                                    </div>
                                                    <div className="search_box">
                                                        <i className="ri-search-line"></i>
                                                        <SearchInput />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive theme_table">
                                                    <table className="table text-nowrap table-hover border table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">
                                                                    User Name
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="designation-width"
                                                                >
                                                                    Designation
                                                                </th>
                                                                <th scope="col">
                                                                    Department
                                                                </th>
                                                                <th scope="col">
                                                                    Email
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="w200"
                                                                >
                                                                    Employee
                                                                    Status
                                                                </th>
                                                                <th scope="col">
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        {initialEmployees?.model
                                                            ?.results ? (
                                                            <tbody>
                                                                {initialEmployees.model.results.map(
                                                                    (
                                                                        emp: any
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                emp.email
                                                                            }
                                                                        >
                                                                            <td>
                                                                                <div className="d-flex align-items-center fw-semibold user-with-img">
                                                                                    <span>
                                                                                 
                                                                                        {emp?.profileImage ? (
                                                                                            <div className="profile_image_outer">
                                                                                                <Image
                                                                                                    className="w-100 h-100 object-cover position-top rounded-pill "
                                                                                                    src={`https://3t-api.csdevhub.com/images/${emp?.profileImage}`}
                                                                                                    width={
                                                                                                        20
                                                                                                    }
                                                                                                    height={
                                                                                                       20
                                                                                                    }
                                                                                                    alt="img"
                                                                                                />
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="profile_image_outer">
                                                                                                <span className="avatar avatar-sm me-2 avatar-rounded">
                                                                                                    <span
                                                                                                        style={{
                                                                                                            fontSize:
                                                                                                                '20px',
                                                                                                            color: '#00000059',
                                                                                                            textTransform:
                                                                                                                'uppercase',
                                                                                                            padding:
                                                                                                                '19%',
                                                                                                        }}
                                                                                                    >
                                                                                                        {emp?.employeeUserName.substring(
                                                                                                            0,
                                                                                                            1
                                                                                                        )}
                                                                                                    </span>
                                                                                                </span>
                                                                                            </div>
                                                                                        )}
                                                                                    </span>
                                                                                    <Link
                                                                                        href={`/employees/${emp.employeeID}`}
                                                                                        className="btn btn-link text-primary"
                                                                                    >
                                                                                        {
                                                                                            emp.employeeUserName
                                                                                        }
                                                                                    </Link>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    emp.designation
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    emp.department
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    emp.email
                                                                                }
                                                                            </td>
                                                                            {/* <td> <select className="form-control w150"><option>Active</option></select></td> */}

                                                                            <td>
                                                                                <UpdateEmployeeStatus
                                                                                    emp={
                                                                                        emp
                                                                                    }
                                                                                    empStatus={
                                                                                        empStatus
                                                                                    }
                                                                                />
                                                                            </td>

                                                                            <td>
                                                                                <DeleteButton
                                                                                    id={
                                                                                        emp.employeeID
                                                                                    }
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        ) : (
                                                            <tbody>
                                                                <tr>
                                                                    <td className="text-center">
                                                                        No
                                                                        record
                                                                        found.
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )}
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="d-flex align-items-center pagination_layout">
                                                    <div>
                                                    Total Showing Entries {totalEntries} out of {' '}
                                                    {initialEmployees
                                                                    ?.model
                                                                    .totalCount ?? 0}
                                                        <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <Paginator
                                                            totalRecords={
                                                                initialEmployees
                                                                    ?.model
                                                                    .totalCount
                                                            }
                                                            data={data}
                                                        />
                                                       
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
            </div>
        </div>
    );
};

export default HREmployeesBoard;
