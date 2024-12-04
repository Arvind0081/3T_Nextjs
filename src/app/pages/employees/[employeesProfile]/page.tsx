'use server';
import React from 'react';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {
  EmpProfileDetailsById,
  allDepartments,
  allDesignations,
  employeeProjectStatus,
  getEmployeeStatus,
  managerList,
  technologyList,
} from '@/utils/publicApi';
import {
  DesignationsParam,
  EmployeeProjectStatusParam,
  EmpProfileReqParams,
  Technology,
} from '@/utils/types';
import EditButton from '@/components/employees/profile/editprofileButton';
import QuickAction from '@/components/employees/profile/quickAction';
import Image from 'next/image';
import Footer from '@/components/common/Footer/footer';
import getUser from '@/utils/getUserServerSide';
import AddAwards from '@/components/employees/profile/addAwards';
import EmployeeStatus from '@/components/employees/profile/employeeStatus';
import Link from 'next/link';

const EmployeeProfie = async ({ params, searchParams }: any) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  const selectedMonth = searchParams.month ?? `${year}-${month}`;
  [year, month] = selectedMonth.split('-');

  let user: any = getUser();

  let projectStatusList: any[] = [];
  let technologies: Technology[] = [];

  const empProfileDetails = params.employeesProfile;

  const empStatus = await getEmployeeStatus();
  technologies = await technologyList();

  let reqParams: EmpProfileReqParams = {
    departmentID: user.departmentId,
    employeeId: empProfileDetails,
  };
  const desgParams: DesignationsParam = {
    departmentID: user.departmentId,
  };

  const data = await EmpProfileDetailsById(reqParams);

  const getManagerList = await managerList(Number(data?.departmentId));
  let department = await allDepartments();

  let designation = await allDesignations(desgParams);

  let ProjectStatusParam: EmployeeProjectStatusParam = {
    employeeId: empProfileDetails,
    Month: Number(month),
    Year: year,
    departmentId: user?.departmentId ?? 0,
  };
  try {
    projectStatusList = await employeeProjectStatus(ProjectStatusParam);
  } catch (error) {}

  const badgeCounts = data?.userBadges?.reduce(
    (acc: { [key: string]: number }, badge: any) => {
      const key = badge.badgeImage;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

  const uniqueBadges = Array.from(
    new Set(data?.userBadges?.map((badge: any) => badge.badgeImage))
  ).map((badgeImage: any) => ({
    badgeImage,
    count: badgeCounts[badgeImage],
  }));

  const profileImageSrc = data?.profileImage
    ? `https://3t-api.csdevhub.com/images/${data?.profileImage}`
    : null;
  const initials =
    data.firstName && data.lastName
      ? `${data.firstName.substring(0, 1).toUpperCase()}${data.lastName.substring(0, 1).toUpperCase()}`
      : '';

  const calculateCombinedExperience = (
    joiningDate: string,
    experienceInMonths: number
  ): string => {
    const joining = new Date(joiningDate);
    const today = new Date();
    const yearsElapsed = today.getFullYear() - joining.getFullYear();
    const monthsElapsed = today.getMonth() - joining.getMonth();
    let totalMonths = yearsElapsed * 12 + monthsElapsed;
    totalMonths += experienceInMonths;
    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    return `${totalYears}${totalYears !== 1 ? '' : ''}.${remainingMonths} ${remainingMonths !== 1 ? 'Years' : ''}`;
  };

  return (
    <>
      {/* PAGE */}
      <div className='app sidebar-mini ltr light-mode'>
        <div className='page'>
          <div className='page-main'>
            <Header />
            <SideNav />

            <div className='main-content app-content mt-0'>
              <div className='side-app'>
                <div className='card-body p-0'>
                  <div className='main-container container-fluid profile-page'>
                    <div className='row'>
                      <div className='col-xxl-4 col-xl-12'>
                        <div className='card custom-card overflow-hidden'>
                          <div className='card-body p-0'>
                            <div className='d-sm-flex align-items-top p-4 border-bottom-0 main-profile-cover'>
                              <div>
                                <span className='avatar avatar-xxl avatar-rounded online me-3'>
                                  {profileImageSrc ? (
                                    <Image
                                      src={profileImageSrc}
                                      width={120}
                                      height={120}
                                      alt='profile image'
                                    />
                                  ) : (
                                    <div
                                      style={{
                                        width: 80,
                                        height: 80,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        backgroundColor: '#6f42c1',
                                        borderRadius: '50%',
                                      }}
                                    >
                                      {initials}
                                    </div>
                                  )}
                                </span>
                              </div>

                              <div className='flex-fill main-profile-info'>
                                <div className='d-flex align-items-center justify-content-between'>
                                  <h6 className='fw-semibold mb-1 text-fixed-white'>
                                    {data.firstName}
                                    &nbsp;
                                    {data.lastName}
                                  </h6>

                                  {(user.role == 'Project Manager' ||
                                    user.role == 'HOD') && (
                                    <EditButton
                                      id={data.employeeID}
                                      department={department}
                                      empStatus={empStatus}
                                      designation={designation}
                                      data={data}
                                      technologies={technologies}
                                    />
                                  )}
                                </div>
                                <p className='mb-1 text-fixed-white op-8'>
                                  {data.employeeNumber}
                                </p>
                                <p className='mb-1 text-fixed-white op-8'>
                                  {data.designation} ({data.department})
                                </p>
                                <p className='fs-12 mb-1 op-8 text-fixed-white'>
                                  <span className='me-3'>
                                    Date of Joining:{' '}
                                    {data.joiningDate
                                      ? new Date(
                                          data.joiningDate
                                        ).toLocaleDateString()
                                      : 'N/A'}
                                  </span>
                                </p>
                                <p className='fs-12 text-fixed-white op-8'>
                                  <span className='me-3'>
                                    Experience:{' '}
                                    {data.joiningDate &&
                                    data.experience !== null &&
                                    data.experience !== undefined
                                      ? calculateCombinedExperience(
                                          data.joiningDate,
                                          parseInt(data.experience)
                                        )
                                      : 'N/A'}
                                  </span>
                                </p>
                                &nbsp;
                                <div className='d-flex mb-0 profile-awards assign-awards'>
                                  {uniqueBadges.map((badge, index) => (
                                    <div key={index} className='mr-3 relative'>
                                      <Image
                                        src={`data:image/jpeg;base64, ${badge.badgeImage}`}
                                        width={150}
                                        height={150}
                                        alt={`award_${index}`}
                                      />
                                      {badge.count > 1 && (
                                        <div className='absolute top-[-8px] right-[-6px] bg-red-600 text-white text-xs px-1 py-0.9 rounded'>
                                          {badge.count}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                &nbsp;
                                <div>
                                  <Link
                                    href={`/employeesProfile/${data.employeeID}`}
                                  >
                                    <div className='btn btn-white btn-wave'>
                                      <i className='bi bi-file-bar-graph'></i>
                                      Performance Report{' '}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className='p-4 border-bottom border-block-end-dashed'>
                              <div>
                                <p className='fs-15 mb-2 fw-semibold'>
                                  Quick Action
                                </p>
                                <QuickAction
                                  data={data}
                                  id={data.employeeID}
                                  getManagerList={getManagerList}
                                  empstatus={empStatus}
                                />
                              </div>
                            </div>

                            <AddAwards
                              designation={designation}
                              department={department}
                              data={data}
                            />

                            <div className='p-4 border-bottom border-block-end-dashed'>
                              <p className='fs-15 mb-2 me-4 fw-semibold'>
                                Contact Information
                              </p>
                              <div className='text-muted'>
                                <p className='align-items-center d-flex mb-2'>
                                  <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                                    <i className='bi bi-envelope-fill'></i>
                                  </span>
                                  {data.email}
                                </p>
                                <p className='align-items-center d-flex mb-2'>
                                  <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                                    <i className='bi bi-telephone-fill'></i>
                                  </span>{' '}
                                  {data.phoneNumber}
                                </p>
                                <p className='align-items-center d-flex mb-2'>
                                  <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                                    <i className='bi bi-geo-alt'></i>
                                  </span>
                                  {data.address}
                                </p>
                              </div>
                            </div>
                            <div className='p-4 border-bottom border-block-end-dashed'>
                              <p className='fs-15 mb-2 me-4 fw-semibold'>
                                Skills:
                              </p>
                              <div>
                                {data.skills?.split(',').map((skill, index) => (
                                  <a key={index}>
                                    <span className='badge bg-primary m-1'>
                                      {skill.trim()}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-xxl-8 col-xl-12'>
                        <div className='row'>
                          <div className='col-xl-12 col-xl-'>
                            <div className='card custom-card'>
                              <div className='card-header justify-content-between'>
                                <div className='card-title'>Project Detail</div>
                              </div>
                              <div className='card-body'>
                                <ul className='list-group'>
                                  {data.projects?.length > 0 ? (
                                    data.projects.map((project, index) => (
                                      <li
                                        key={index}
                                        className='d-flex gap-2 justify-content-between list-group-item'
                                      >
                                        <div>
                                          <div className='d-flex align-items-start line-text'>
                                            <div className='me-2 fw-semibold nowrap'>
                                              Project:
                                            </div>
                                            <span>{project.projectName}</span>
                                          </div>
                                          <div className='d-flex align-items-start line-text'>
                                            <div className='me-2 fw-semibold nowrap'>
                                              Technology:
                                            </div>
                                            <span>
                                              {
                                                technologies.filter(
                                                  (item) =>
                                                    item.id ==
                                                    Number(project.technology)
                                                )[0]?.name
                                              }
                                            </span>
                                          </div>
                                          <div className='d-flex align-items-start line-text'>
                                            <div className='me-2 fw-semibold nowrap'>
                                              Description:
                                            </div>
                                            <span>{project.description}</span>
                                          </div>
                                          <div className='d-flex align-items-start line-text'>
                                            <div className='me-2 fw-semibold nowrap'>
                                              Production Url:
                                            </div>
                                            <span>{project.productionURL}</span>
                                          </div>
                                        </div>
                                      </li>
                                    ))
                                  ) : (
                                    <li
                                      className='list-group-item d-flex justify-content-center align-items-center'
                                      style={{ height: '100px' }}
                                    >
                                      No records found
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <EmployeeStatus
                                projectStatusList={projectStatusList}
                                projectStatusParam={ProjectStatusParam}
                                month={selectedMonth}
                                profileInfo={data}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* CONTAINER END */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default EmployeeProfie;
