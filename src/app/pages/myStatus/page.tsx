import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import {
  GetEmployeeStatusResponseModel,
  ProjectListModel,
  UpworkProfileListModel,
} from '@/utils/types';
import {
  EmployeeStatusList,
  projectsList,
  upwokProfileList,
} from '@/utils/publicApi';
import { format } from 'date-fns';
import AddStatusButton from '@/components/myStatus/addStatusButton';
import getUser from '@/utils/getUserServerSide';
import EmployeeStatusDateFilter from '@/components/myStatus/employeeStatusDateFilter';
import EditStatusButton from '@/components/myStatus/editStatusButton';
import DeleteStatusButton from '@/components/myStatus/deleteStatusButton';
import Paginator from '@/components/myStatus/pagination';

const MyStatus = async ({ searchParams }: any) => {
  let pageSize: number = searchParams.size ?? 10;
  let currentPage: number = searchParams.page ?? 1;
  const token: any = getUser();
  const today = new Date();
  const startDate =
    searchParams.StartDate ??
    format(new Date(today.setDate(today.getDate() - 6)), 'yyyy-MM-dd');
  const endDate = searchParams.EndDate ?? format(new Date(), 'yyyy-MM-dd');

  let employeeStatus: GetEmployeeStatusResponseModel[] = [];
  let totalRecords: number = 0;

  let projectsListFromDb: ProjectListModel[] = [];
  let upwokProfileListFromDb: UpworkProfileListModel[] = [];
  const payLoad = {
    fromDate: startDate,
    toDate: endDate,
    pageNumber: currentPage,
    pageSize: pageSize,
    userProfileId: token.id,
  };
  try {
    const { totalCount, results } = await EmployeeStatusList(payLoad);
    employeeStatus = results;
    totalRecords = totalCount;
  } catch (error) {}

  try {
    projectsListFromDb = await projectsList();
  } catch (error) {}
  try {
    upwokProfileListFromDb = await upwokProfileList();
  } catch (error) {}

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const showingRecordCount = () => {
    const Count =
      (currentPage - 1) * pageSize + Math.ceil(employeeStatus.length) <=
      totalRecords
        ? (currentPage - 1) * pageSize + Math.ceil(employeeStatus.length)
        : totalRecords;

    return Count;
  };

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
              <div className='main-container container-fluid'>
                <div className='row'>
                  <div className='col-xl-12'>
                    <div className='card custom-card'>
                      <div className='card-header justify-content-between items-center'>
                        <div className='card-title'>My Status</div>
                        <div className='filter-right d-flex gap-x-2'>
                          <EmployeeStatusDateFilter payLoad={payLoad} />
                          <AddStatusButton
                            projectsListFromDb={projectsListFromDb}
                            upwokProfileListFromDb={upwokProfileListFromDb}
                          />
                        </div>
                      </div>
                      <div className='card-body'>
                        <div className='table-responsive theme_table'>
                          <table className='table text-nowrap table-hover border table-bordered status_table'>
                            <thead>
                              <tr>
                                <th scope='col'>Date</th>

                                <th className='project-width'>Project Name</th>
                                <th scope='col'>Client Name</th>
                                <th scope='col' className='module-width'>
                                  Module
                                </th>
                                <th scope='col' className='profile-width'>
                                  Profile
                                </th>
                                <th scope='col' className='memo-width'>
                                  Memo{' '}
                                </th>
                                <th scope='col'>Upwork Hours</th>
                                <th scope='col'>Fixed Billing Hours</th>
                                <th scope='col'>Billing Hours</th>
                                <th scope='col'>Non Billable Hours</th>

                                <th scope='col'>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {employeeStatus &&
                                employeeStatus?.map(
                                  (
                                    status: GetEmployeeStatusResponseModel,
                                    index: number,
                                    employeeStatus: GetEmployeeStatusResponseModel[]
                                  ) => (
                                    <tr
                                      className={
                                        index == 0
                                          ? 'mainuser'
                                          : employeeStatus[index].date !==
                                              employeeStatus[index - 1].date
                                            ? 'mainuser'
                                            : ''
                                      }
                                      key={status.id}
                                    >
                                      <td className='nowrap'>
                                        {format(
                                          new Date(status.date),
                                          'dd-MM-yyyy'
                                        )}
                                      </td>

                                      <td>
                                        <a
                                       href={`/projects/${status.id}`}
                                      >
                                        {status.projectName}{' '}

                                      </a>
                                      </td>
                                     
                                      <td>{status.clientName}</td>
                                      <td>{status.moduleName}</td>
                                      <td>
                                        {upwokProfileListFromDb?.filter(
                                          (item: any) =>
                                            item.id == status?.profileId
                                        )[0]?.name ?? ''}
                                      </td>
                                      <td>{status.memo}</td>
                                      <td>
                                        {numberToTimeConversion(
                                          status.upworkHours
                                        )}
                                      </td>
                                      <td>
                                        {numberToTimeConversion(
                                          status.fixedHours
                                        )}
                                      </td>
                                      <td className='text-success text-bold'>
                                        <b>
                                          {numberToTimeConversion(
                                            status.upworkHours +
                                              status.fixedHours
                                          )}
                                        </b>
                                      </td>
                                      <td className='text-danger'>
                                        {numberToTimeConversion(
                                          status.offlineHours
                                        )}
                                      </td>
                                      <td>
                                        <div className='align-items-start d-flex fs-15 gap-2'>
                                          <EditStatusButton
                                            item={employeeStatus.filter(
                                              (x: { date: string }) =>
                                                x.date == status.date
                                            )}
                                            projectsListFromDb={
                                              projectsListFromDb
                                            }
                                            upwokProfileListFromDb={
                                              upwokProfileListFromDb
                                            }
                                          />

                                          <DeleteStatusButton
                                            id={status.date}
                                            item={employeeStatus.filter(
                                              (x: { date: string }) =>
                                                x.date == status.date
                                            )}
                                            userId={token.id}
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                          {employeeStatus.length == 0 && (
                            <span>No record found.</span>
                          )}
                        </div>
                      </div>
                      <div className='card-footer'>
                        <div className='d-flex align-items-center'>
                          <div>
                            {' '}
                            Showing {showingRecordCount()} Entries{' '}
                            <i className='bi bi-arrow-right ms-2 fw-semibold'></i>
                          </div>
                          <div className='ms-auto'>
                            <Paginator
                              totalRecords={totalRecords}
                              data={payLoad}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- CONTAINER END --> */}
            </div>
          </div>
          {/* <!--app-content close--> */}
        </div>

        {/* FOOTER  */}
        <Footer />
      </div>
    </>
  );
};

export default MyStatus;
