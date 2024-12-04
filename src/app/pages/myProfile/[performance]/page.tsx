import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {
  // EmpProfileReqParams,
  MonthlyBillingSummaryParams,
  ProjectWithBillingDetailSummaryParams,
} from '@/utils/types';
import getUser from '@/utils/getUserServerSide';
import {
  EmployeeWorkedProjectSummary,
  // EmpProfileDetailsById,
  GetAllTeamAttendanceSummary,
  GetTeamAttendanceSummary,
  MonthlyBillingSummary,
  MonthlyTeamBillingSummary,
  TeamProductivitySummary,
  userProfileDetails,
  WorkedProjectWithBillingDetailSummary,
  WorkedProjectWithBillingDetailSummaryForTeam,
} from '@/utils/publicApi';
import Image from 'next/image';
import { format, subDays } from 'date-fns';
import DateFilter from '@/components/employees/profile/performanceReport/dateFilter';
// import PrintComponent from '@/components/employees/profile/performanceReport/print';
import AttendanceSummary from '@/components/employees/profile/performanceReport/attendanceSummary';
import MonthsProductivity from '@/components/employees/profile/performanceReport/monthsProductivity';
import TeamProductivity from '@/components/employees/profile/performanceReport/teamProductivity';
import AttendanceSummaryForTeam from '@/components/employees/profile/performanceReport/attendanceSummaryForTeam';

const Performance = async ({ params, searchParams }: any) => {
  let employeePerformance = params.performance;
  let user: any = getUser();
  //let data: any;
  let projectBillingStatus: any[] = [];
  let projectBillingStatusForTeam: any[] = [];
  let attendanceSummary: any;
  let attendanceSummaryForTeam: any;

  let monthlyBilllingSummary: any;
  let monthlyTeamBilllingSummary: any;
  let employeeWorkedProjectSummary: any;
  let profileDetails: any;
  let teamProductivity: any[] = [];
  // let today=new Date();
  let startDate = searchParams.From
    ? format(subDays(new Date(searchParams.From), 7), 'yyyy-MM-dd')
    : format(subDays(new Date(), 7), 'yyyy-MM-dd');
  let endDate = searchParams.To
    ? format(new Date(searchParams.To), 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');

  // let reqParams: EmpProfileReqParams = {
  //   departmentID: user.departmentId,
  //   employeeId: employeePerformance,
  // };

  let billingSummaryreqParams: MonthlyBillingSummaryParams = {
    employeeId: employeePerformance,
  };

  let projectBillingStatusParam: ProjectWithBillingDetailSummaryParams = {
    employeeId: employeePerformance,
    fromDate: startDate,
    toDate: endDate,
  };
  try {
    projectBillingStatus = await WorkedProjectWithBillingDetailSummary(
      projectBillingStatusParam
    );
  } catch (error) {}

  try {
    projectBillingStatusForTeam =
      await WorkedProjectWithBillingDetailSummaryForTeam(
        projectBillingStatusParam
      );
  } catch (error) {}

  try {
    attendanceSummary = await GetTeamAttendanceSummary(
      projectBillingStatusParam
    );
  } catch (error) {}

  try {
    attendanceSummaryForTeam = await GetAllTeamAttendanceSummary(
      projectBillingStatusParam
    );
  } catch (error) {}

  try {
    monthlyBilllingSummary = await MonthlyBillingSummary(
      billingSummaryreqParams
    );
  } catch (error) {}

  try {
    monthlyTeamBilllingSummary = await MonthlyTeamBillingSummary(
      billingSummaryreqParams
    );
  } catch (error) {}

  try {
    employeeWorkedProjectSummary = await EmployeeWorkedProjectSummary(
      projectBillingStatusParam
    );
  } catch (error) {}
  try {
    profileDetails = await userProfileDetails();
  } catch (error) {}

  // try {
  //   data = await EmpProfileDetailsById(reqParams);
  // } catch (error) {}

  try {
    teamProductivity = await TeamProductivitySummary(projectBillingStatusParam);
  } catch (error) {}



  const badgeCounts = profileDetails?.model?.userBadges?.reduce(
    (acc: { [key: string]: number }, badge: any) => {
      const key = badge.badgeImage; // Use badgeImage as the key
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

 
  const uniqueBadges = Array.from(
    new Set(
      profileDetails?.model?.userBadges?.map((badge: any) => badge.badgeImage)
    )
  ).map((badgeImage: any) => ({
    badgeImage,
    badgeName: profileDetails?.model?.userBadges.find(
      (badge: any) => badge.badgeImage == badgeImage
    )?.badgeName,
    count: badgeCounts[badgeImage],
  }));

  const totalUpworkHours = projectBillingStatus
    ?.reduce((sum: any, project: any) => sum + project.totalUpworkHours, 0)
    .toFixed(2);
  const totalFixedHours = projectBillingStatus
    ?.reduce((sum: any, project: any) => sum + project.totalFixedHours, 0)
    .toFixed(2);
  const totalBillingHours = projectBillingStatus
    ?.reduce((sum: any, project: any) => sum + project.totalBillingHours, 0)
    .toFixed(2);
  const nonBillableHours = projectBillingStatus
    ?.reduce((sum: any, project: any) => sum + project.nonBillableHours, 0)
    .toFixed(2);

  const totalUpworkHoursForTeam = projectBillingStatusForTeam
    ?.reduce((sum: any, project: any) => sum + project.totalUpworkHours, 0)
    .toFixed(2);
  const totalFixedHoursForTeam = projectBillingStatusForTeam
    ?.reduce((sum: any, project: any) => sum + project.totalFixedHours, 0)
    .toFixed(2);
  const totalBillingHoursForTeam = projectBillingStatusForTeam
    ?.reduce((sum: any, project: any) => sum + project.totalBillingHours, 0)
    .toFixed(2);
  const nonBillableHoursForTeam = projectBillingStatusForTeam
    ?.reduce((sum: any, project: any) => sum + project.nonBillableHours, 0)
    .toFixed(2);



    const totalUpworkHoursForTeamProductivity = teamProductivity
    ?.reduce((sum: any, project: any) => sum + project?.upWorkHours, 0)
    .toFixed(2);
  const totalFixedHoursForTeamProductivity = teamProductivity
    ?.reduce((sum: any, project: any) => sum + project?.fixedBillingHours, 0)
    .toFixed(2);

   
  const nonBillableHoursForTeamProductivity = teamProductivity
    ?.reduce((sum: any, project: any) => sum + project?.nonBillableHours, 0).toFixed(2);

    const totalBillingHoursForTeamProductivity = teamProductivity
    ?.reduce((sum: any, project: any) => sum + Number(project?.billingHours), 0)


  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };



  const profileImageSrc = profileDetails?.model?.userProfile.profileImage
    ? `https://3t-api.csdevhub.com/images/${profileDetails?.model?.userProfile.profileImage}`
    : null;

  const initials =
    profileDetails?.model?.userProfile.firstName &&
    profileDetails?.model?.userProfile.lastName
      ? `${profileDetails?.model?.userProfile.firstName.substring(0, 1).toUpperCase()}${profileDetails?.model?.userProfile.lastName.substring(0, 1).toUpperCase()}`
      : '';
      const projectSummary = (employeeWorkedProjectSummary ?? [])[0] ?? {};


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
                  <div className='row Performance-report-card'>
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
                                      backgroundColor: '#6f42c1', // Optional: Add a background color
                                      borderRadius: '50%', // Optional: Make it circular
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
                                  {profileDetails?.model?.userProfile.firstName}{' '}
                                  &nbsp;
                                  {profileDetails?.model?.userProfile.lastName}
                                </h6>
                              </div>
                              <p className='mb-1 text-fixed-white op-8'>
                                {
                                  profileDetails?.model?.userProfile
                                    ?.designation
                                }
                              </p>
                              <p className='fs-12 mb-1 op-8 text-fixed-white'>
                                <span className='me-3'>
                                  Date of Joining:{' '}
                                  {profileDetails?.model?.userProfile
                                    ?.joiningDate
                                    ? new Date(
                                        profileDetails.model?.userProfile.joiningDate
                                      ).toLocaleDateString()
                                    : 'N/A'}
                                </span>
                              </p>
                              <p className='fs-12 text-fixed-white mb-4 op-8'>
                                <span className='me-3'>
                                  {' '}
                                  Total Experience:
                                  {
                                    profileDetails?.model?.userProfile
                                      ?.experienceOnJoining
                                  }
                                </span>
                              </p>
                              <div className='d-flex mb-2'>
                                {projectSummary && (
                                  <>
                                    <div className='me-4'>
                                      <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                                        {projectSummary?.totalProjects}
                                      </p>
                                      <p className='mb-0 fs-11 op-8 text-fixed-white'>
                                        Projects
                                      </p>
                                    </div>
                                    <div className='me-4'>
                                      <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                                      
                                        {numberToTimeConversion(projectSummary?.upworkHours ?? 0)}
                                      </p>
                                      <p className='mb-0 fs-11 op-8 text-fixed-white'>
                                        Upwork
                                      </p>
                                    </div>
                                    <div className='me-4'>
                                      <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                                        {numberToTimeConversion(
                                          projectSummary?.fixedBillingHours??0
                                        )}
                                      </p>
                                      <p className='mb-0 fs-11 op-8 text-fixed-white'>
                                        Fixed
                                      </p>
                                    </div>
                                    <div className='me-4'>
                                      <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                                        {numberToTimeConversion(
                                          projectSummary?.nonBillableHours??0
                                        )}
                                      </p>
                                      <p className='mb-0 fs-11 op-8 text-fixed-white'>
                                        Offline
                                      </p>
                                    </div>
                                    <div className='me-4'>
                                      <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                                        {projectSummary?.productivityPercentage?.toFixed(2)??0}
                                        %
                                      </p>
                                      <p className='mb-0 fs-11 op-8 text-fixed-white'>
                                        Productivity
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='p-4 border-bottom border-block-end-dashed'>
                            <div>
                              <p className='fs-15 mb-2 fw-semibold'>
                                Performance Badges
                              </p>
                              <div className='d-flex mb-0 profile-awards'>
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
                            </div>
                          </div>
                          <div className='p-4 border-bottom border-block-end-dashed'>
                            <p className='fs-15 mb-2 me-4 fw-semibold'>
                              Skills:
                            </p>
                            <div>
                              {profileDetails?.model?.userProfile.skills
                                ?.split(',')
                                .map((skill: any, index: any) => (
                                  <a key={index}>
                                    <span className='badge bg-primary m-1'>
                                      {skill.trim()}
                                    </span>
                                  </a>
                                ))}
                            </div>
                          </div>
                          <div className='p-4 border-bottom border-block-end-dashed theme-timeline'>
                            <p className='fs-15 mb-2 fw-semibold'>Timeline</p>
                            <ul className='timeline-layout'>
                              {profileDetails?.model?.userBadges?.map(
                                (badge: any, index: any) => (
                                  <li key={index}>
                                    <div className='timeline-time text-end'>
                                      <span className='badge bg-light text-muted custm-timelineBadge bg-primary-transparent fs-12 d-block'>
                                        {badge.dateReceived
                                          ? new Date(
                                              badge.dateReceived
                                            ).toLocaleDateString()
                                          : 'N/A'}
                                      </span>
                                      <span className='time d-block'>
                                        {badge.submittedByName}
                                      </span>
                                    </div>
                                    <div className='timeline-icon'>
                                      <a href='#'></a>
                                    </div>
                                    <div className='timeline-body'>
                                      <div className='d-flex align-items-top timeline-main-content mt-0'>
                                        {/* If there's an image to show, uncomment the img tag and use badge.image */}
                                        <div className='awards-image me-3 mt-sm-0 mt-4'>
                                          <Image
                                            src={`data:image/jpeg;base64, ${badge.badgeImage}`}
                                            width={100}
                                            height={100}
                                            alt={`award_${index}`}
                                          />
                                        </div>
                                        <div className='flex-fill'>
                                          <div className='d-flex align-items-center'>
                                            <div className='mt-sm-0 mt-2'>
                                              <p className='mb-0 fs-14 fw-semibold'>
                                                {badge.badgeName}
                                              </p>
                                              <p className='mb-0 fs-12 text-muted'>
                                                {badge.badgeDescription}
                                                {/* <span className='badge bg-primary-transparent fw-semibold mx-1'>
                        {badge.tag}
                      </span> */}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-8 col-xl-12'>
                      <div className='row'>
                        <div className='col-xxl-12 col-xl-12 hidePrint'>
                          <div className='card custom-card overflow-hidden'>
                            <div className='card-header justify-content-between items-center'>
                              <div className='card-title'>
                                Performance Report
                              </div>
                              <div className='filter-right d-flex gap-x-2'>
                                <DateFilter
                                  projectBillingStatusParam={
                                    projectBillingStatusParam
                                  }
                                />
                                {/* <div className='btn-list mt-md-0 mt-2'>
                                          <PrintComponent/>
                                     </div> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        {user.role == 'Team Lead' ? (
                          <div className='col-xl-12'>
                            <div className='card custom-card team_card'>
                              <div className='card-header justify-content-between awards_card_header'>
                                <div className='card-title'>Top 8 Projects</div>
                              </div>
                              <div className='card-body'>
                                <div>
                                  <div className='table-responsive theme_table'>
                                    <table className='table text-nowrap table-hover border table-bordered mb-0'>
                                      <thead>
                                        <tr>
                                          <th
                                            scope='col'
                                            className='project-width'
                                          >
                                            Project Name
                                          </th>
                                          <th scope='col'>Upwork Hours</th>
                                          <th scope='col'>
                                            Fixed Billing Hours
                                          </th>
                                          <th scope='col'>Billing Hours</th>
                                          <th scope='col'>
                                            Non Billable Hours
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {projectBillingStatusForTeam
                                          ?.slice(0, 8)
                                          .map((project: any) => (
                                            <tr key={project.projectID}>
                                              <td>{project.projectName}</td>
                                              <td>
                                                {numberToTimeConversion(
                                                  project.totalUpworkHours
                                                )}
                                              </td>
                                              <td>
                                                {numberToTimeConversion(
                                                  project.totalFixedHours
                                                )}
                                              </td>
                                              <td className='text-success text-bold'>
                                                {numberToTimeConversion(
                                                  project.totalBillingHours
                                                )}
                                              </td>
                                              <td className='text-danger'>
                                                {numberToTimeConversion(
                                                  project.nonBillableHours
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                      <tfoot>
                                        <tr>
                                          <td className='text-bold'>Total</td>
                                          <td>
                                            {numberToTimeConversion(
                                              totalUpworkHoursForTeam
                                            )}
                                          </td>
                                          <td>
                                            {numberToTimeConversion(
                                              totalFixedHoursForTeam
                                            )}
                                          </td>
                                          <td className='text-success text-bold'>
                                            {numberToTimeConversion(
                                              totalBillingHoursForTeam
                                            )}
                                          </td>
                                          <td className='text-danger'>
                                            {numberToTimeConversion(
                                              nonBillableHoursForTeam
                                            )}
                                          </td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className='col-xl-12'>
                            <div className='card custom-card team_card'>
                              <div className='card-header justify-content-between awards_card_header'>
                                <div className='card-title'>Top 5 Projects</div>
                              </div>
                              <div className='card-body'>
                                <div>
                                  <div className='table-responsive theme_table'>
                                    <table className='table text-nowrap table-hover border table-bordered mb-0'>
                                      <thead>
                                        <tr>
                                          <th
                                            scope='col'
                                            className='project-width'
                                          >
                                            Project Name
                                          </th>
                                          <th scope='col'>Upwork Hours</th>
                                          <th scope='col'>
                                            Fixed Billing Hours
                                          </th>
                                          <th scope='col'>Billing Hours</th>
                                          <th scope='col'>
                                            Non Billable Hours
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {projectBillingStatus
                                          ?.slice(0, 5)
                                          .map((project: any) => (
                                            <tr key={project.projectID}>
                                              <td>{project.projectName}</td>
                                              <td>
                                                {numberToTimeConversion(
                                                  project.totalUpworkHours||0
                                                )}
                                              </td>
                                              <td>
                                                {numberToTimeConversion(
                                                  project.totalFixedHours||0
                                                )}
                                              </td>
                                              <td className='text-success text-bold'>
                                                {numberToTimeConversion(
                                                  project.totalBillingHours||0
                                                )}
                                              </td>
                                              <td className='text-danger'>
                                                {numberToTimeConversion(
                                                  project.nonBillableHours||0
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                      <tfoot>
                                        <tr>
                                          <td className='text-bold'>Total</td>
                                          <td>
                                            {numberToTimeConversion(
                                              totalUpworkHours||0
                                            )}
                                          </td>
                                          <td>
                                            {numberToTimeConversion(
                                              totalFixedHours||0
                                            )}
                                          </td>
                                          <td className='text-success text-bold'>
                                            {numberToTimeConversion(
                                              totalBillingHours||0
                                            )}
                                          </td>
                                          <td className='text-danger'>
                                            {numberToTimeConversion(
                                              nonBillableHours||0
                                            )}
                                          </td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {user.role == 'Team Lead' && (
                        <div className='col-xl-12'>
                          <div className='card custom-card team_card'>
                            <div className='card-header justify-content-between awards_card_header'>
                              <div className='card-title'>
                                Team Productivity
                              </div>
                            </div>
                            <div className='card-body'>
                              <div>
                                <div className='table-responsive theme_table'>
                                  <table className='table text-nowrap table-hover border table-bordered mb-0'>
                                    <thead>
                                      <tr>
                                        <th
                                          scope='col'
                                          className='project-width'
                                        >
                                          Name
                                        </th>
                                        <th scope='col'>Upwork Hours</th>
                                        <th scope='col'>Fixed Billing Hours</th>
                                        <th scope='col'>Non Billable Hours</th>
                                        <th scope='col'>Total Billing</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {teamProductivity?.map((project: any) => (
                                        <tr key={project.projectID}>
                                          <td>{project.developerName}</td>
                                          <td>
                                            {numberToTimeConversion(
                                              project.upWorkHours
                                            )}
                                          </td>
                                          <td>
                                            {numberToTimeConversion(
                                              project.fixedBillingHours
                                            )}
                                          </td>
                                          <td className='text-danger'>
                                            {numberToTimeConversion(
                                              project.nonBillableHours
                                            )}
                                          </td>
                                          <td className='text-success text-bold'>
                                            {numberToTimeConversion(
                                              project.billingHours
                                            )}
                                          </td>
                                         
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <td className='text-bold'>Total</td>
                                        <td>
                                          {numberToTimeConversion(
                                            totalUpworkHoursForTeamProductivity
                                          )}
                                        </td>
                                        <td>
                                          {numberToTimeConversion(
                                            totalFixedHoursForTeamProductivity
                                          )}
                                        </td>
                                        <td className='text-success text-bold'>
                                          {numberToTimeConversion(
                                            nonBillableHoursForTeamProductivity
                                          )}
                                        </td>
                                        <td className='text-danger'>
                                          {numberToTimeConversion(
                                            totalBillingHoursForTeamProductivity
                                          )}
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className='row'>
                        <div className='col-xl-6'>
                          <div className='card custom-card'>
                            <div className='card-header justify-content-between'>
                              <div className='card-title'>
                                Team Last 12 Months Productivity
                              </div>
                            </div>
                            <div className='card-body'>
                              <div>
                                {user.role == 'Team Lead' ? (
                                  <TeamProductivity
                                    monthlyTeamBilllingSummary={
                                      monthlyTeamBilllingSummary
                                    }
                                  />
                                ) : (
                                  <MonthsProductivity
                                    monthlyBilllingSummary={
                                      monthlyBilllingSummary
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-xl-6'>
                          <div className='card custom-card'>
                            <div className='card-header justify-content-between'>
                              <div className='card-title'>
                                Team Attendance Rating
                              </div>
                            </div>
                            <div className='card-body'>
                              {user.role == 'Team Lead' ? (
                                <AttendanceSummaryForTeam
                                  AttendanceSummaryForTeam={
                                    attendanceSummaryForTeam
                                  }
                                />
                              ) : (
                                <AttendanceSummary
                                  attendanceSummary={attendanceSummary}
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
        </div>
      </div>
    </>
  );
};
export default Performance;
