import Image from 'next/image';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {
  EmployeeStatusProjectList,
  EmployeeStatusUpworkProfileList,
  individualToDo,
  PerformanceDetail,
  perfornmanceChart,
  ProjectDetails,
  scrumTeamBioMetric,
  teamAttendance,
  teamLeadBadges,
  teamsProductivity,
  traineeList,
} from '@/utils/publicApi';
import {
  ProductivityParams,
  ProjectListModel,
  TeamLeadDashBoardParam,
  UpworkProfileListModel,
} from '@/utils/types';
import ProgressButton from '@/components/teamleadDashboard/ProgressButton';
import Link from 'next/link';
import ProjectButton from '@/components/teamleadDashboard/projectButton';
import DateFilter from '@/components/teamleadDashboard/dateFilter';
import TeamleadPerformanceChart from '@/components/teamleadDashboard/teamleadPerformanceChart';
import AddStatusButton from '@/components/myStatus/addStatusButton';
import Footer from '@/components/common/Footer/footer';
import Todo from '@/components/teamleadDashboard/todo';
import getUser from '@/utils/getUserServerSide';
import { format } from 'date-fns';
import TeamLeadAttendance from '@/components/teamleadDashboard/attendance';
const TeamLeadDashBoard = async ({ searchParams }: any) => {
  const user: any = getUser();
  let dateStr = searchParams?.month;
  if (dateStr == undefined) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    dateStr = `${year}-${month}`;
  }
  let [year, month] = dateStr.split('-');
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);

  const formattedFirstDate = format(firstDate, 'yyyy-MM-dd');
  const formattedLastDate = format(lastDate, 'yyyy-MM-dd');
  let teamProductivity = [];
  let perfornmanceDetails = [];
  let projectDetail = [];
  let chartDetail = [];
  let response: any[] = [];
  let trainees = [];
  let assignedTask: string = '';
  let projectsListFromDb: ProjectListModel[] = [];
  let upwokProfileListFromDb: UpworkProfileListModel[] = [];
  let badges: any;
  let bioMetricAttendance:any[]=[];

  const params: ProductivityParams = {
    Month: month,
    Year: year,
  };

  const teamLeadParams: TeamLeadDashBoardParam = {
    teamLeadId: '',
    fromDate: formattedFirstDate,
    toDate: formattedLastDate,
  };

  let payLoad:any={
    teamLeadId:user.id,
    month: Number(month),
    year: Number(year),
    departmentId:Number(user.departmentId),
    teamAdminId:'',
    empID:''
}

  try {
    badges = await teamLeadBadges();
  } catch (error) {}

  try {
    projectsListFromDb = await EmployeeStatusProjectList();
  } catch (error: any) {}
  try {
    upwokProfileListFromDb = await EmployeeStatusUpworkProfileList();
  } catch (error: any) {}

  try {
    teamProductivity = await teamsProductivity(params);
  } catch (error) {}
  try {
    perfornmanceDetails = await PerformanceDetail(teamLeadParams);
  } catch (error) {}
  try {
    projectDetail = await ProjectDetails(teamLeadParams);
  } catch (error) {}

  try {
    chartDetail = await perfornmanceChart(params);
  } catch (error) {}

  try {
    response = await teamAttendance(params);
  } catch (error) {}

  try {
    trainees = await traineeList();
  } catch (error) {}

  try {
    const response = await individualToDo();
    assignedTask = response?.name;
  } catch (error) {}

  try {
    bioMetricAttendance= await scrumTeamBioMetric(payLoad);
} catch (error) {}

  const getMonthName = (month: string) => {
    const date = new Date(0, parseInt(month) - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  };

  const monthName = getMonthName(month);

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };



  const badgeCounts = badges?.reduce((acc: any, badge: any) => {
    const key = badge.badgeImage; // Use badgeImage as the key
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Create an array of unique badges
  const uniqueBadges = Array.from(
    new Set(badges?.map((badge: any) => badge.badgeImage))
  ).map((badgeImage: any) => ({
    badgeImage,
    count: badgeCounts[badgeImage],
  }));



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
                  <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xl-12'>
                      <div className='card overflow-hidden form_card top_card'>
                        <div className='card-body justify-content-between align-items-center d-flex flex-wrap'>
                          <div className='filter-left'>
                            <DateFilter dateStr={dateStr}/>
                          </div>
                          <div className='btn-list mt-md-0 mt-2 filter-right d-flex gap-2'>
                            <div className='dashboard-awards top_card_awards mb-2'>
                              {uniqueBadges.map((badge, index) => (
                                <div key={index} className='mr-3 relative'>
                                  <Image
                                    src={`data:image/png;base64,${badge.badgeImage}`} // Adjust MIME type if necessary
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
                              <a href='/profile' className='fs-12'>
                                {' '}
                                View All
                              </a>
                            </div>
                            <div className='btn-list mt-md-0 mt-2 filter-right'>
                              <AddStatusButton
                                projectsListFromDb={projectsListFromDb}
                                upwokProfileListFromDb={upwokProfileListFromDb}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='card custom-card'>
                        <div className='card-header justify-content-between'>
                          <div className='card-title'>
                            Given Trainees feedback are missing for previous
                            Months Please Give feedback Immediately
                          </div>
                        </div>
                        <div className='card-body'>
                          <div className='table-responsive theme_table'>
                            <table className='table text-nowrap table-hover border table-bordered'>
                              <thead>
                                <tr>
                                  <th scope='col'>Trainee Name</th>
                                  <th scope='col'>Month</th>
                                  <th scope='col'>Give FeedBack</th>
                                </tr>
                              </thead>
                              <tbody>
                                {trainees?.length > 0 &&
                                  trainees?.map((trainee: any, index: any) => (
                                    <tr key={index}>
                                      <td>{trainee.employeeName}</td>
                                      <td>
                                        {trainee.months.map(
                                          (month: any, idx: any) => (
                                            <span key={idx}>
                                              {month}
                                              {idx !==
                                                trainee.months.length - 1 &&
                                                ', '}
                                            </span>
                                          )
                                        )}
                                      </td>
                                      <td>
                                        <Link
                                          href={`/teamLeadDashBoard/${trainee.employeeID}`}
                                        >
                                          Give Feedback
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                            {trainees?.length === 0 && (
                              <span>No record found.</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='card custom-card'>
                        <div className='card-header justify-content-between'>
                          <div className='card-title'>Total Projects</div>
                        </div>
                        <div className='card-body'>
                          <div className='table-responsive theme_table'>
                            <table className='table text-nowrap table-hover border table-bordered'>
                              <thead>
                                <tr>
                                  <th scope='col'>Project</th>
                                  <th scope='col'>Client Name</th>
                                  <th scope='col'>Upwork Hours</th>
                                  <th scope='col'>Fixed Billing Hours</th>
                                  <th scope='col'>Non Billable Hours</th>
                                  <th scope='col'>Total Billing</th>
                                  <th scope='col'>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {projectDetail?.map((project: any) => (
                                  <tr key={project.projectId}>
                                  
                                    <td>
                                      <a
                                       href={`/projects/${project.projectId}`}
                                      >
                                        {project.projectName}{' '}
                                      </a>
                                    </td>

                                    {/* <td>{project.projectName}</td> */}
                                    <td>{project.clientName}</td>
                                    <td>
                                      {numberToTimeConversion(
                                        project.upworkHours
                                      )}
                                    </td>
                                    <td className='text-danger'>
                                      {numberToTimeConversion(
                                        project.fixedHours
                                      )}
                                    </td>
                                    <td>
                                      {numberToTimeConversion(
                                        project.nonBillableHours
                                      )}
                                    </td>
                                    <td className='text-success'>
                                      <b>
                                        {numberToTimeConversion(
                                          project.totalBilling
                                        )}
                                      </b>
                                    </td>
                                    <td>
                                      <Link
                                        aria-label='anchor'
                                        href=''
                                        className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text'
                                        data-bs-target='#ProgressReport'
                                        data-bs-toggle='modal'
                                      >
                                        <ProjectButton
                                          projectID={project.projectId}
                                        />
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='card custom-card'>
                        <div className='card-header justify-content-between'>
                          <div className='card-title'>
                            {teamProductivity?.teamLeadName}(
                            {numberToTimeConversion(
                              teamProductivity?.productivityHours
                            )}
                            /{teamProductivity?.expectedProductivityHours}){' '}
                            <span className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text'>
                              {Math.round(
                                teamProductivity?.productivityPercentage
                              )}
                              %
                            </span>
                          </div>
                        </div>
                        <div className='card-body'>
                          <div className='table-responsive theme_table'>
                            <table className='table text-nowrap table-hover border table-bordered'>
                              <thead>
                                <tr>
                                  <th scope='col'>Name</th>
                                  <th scope='col'>Upwork Hours</th>
                                  <th scope='col'>Fixed Billing Hours</th>
                                  <th scope='col'>Non Billable Hours</th>
                                  <th scope='col'>Total Billing</th>
                                  <th scope='col'>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {perfornmanceDetails?.map((employee: any) => (
                                  <tr key={employee.employeeId}>
                                    <td>
                                      <a
                                        href={
                                          user.id === employee.employeeId
                                            ? '/profile'
                                            : `/employees/${employee.employeeId}`
                                        }
                                      >
                                        {employee.name}
                                      </a>
                                    </td>
                                    <td>
                                      {numberToTimeConversion(
                                        employee.upworkHours
                                      )}
                                    </td>
                                    <td>
                                      {numberToTimeConversion(
                                        employee.fixedHours
                                      )}
                                    </td>
                                    <td className='text-danger'>
                                      {numberToTimeConversion(
                                        employee.nonBillableHours
                                      )}
                                    </td>
                                    <td className='text-success'>
                                      <b>
                                        {numberToTimeConversion(
                                          employee.totalBilling
                                        )}
                                      </b>
                                    </td>
                                    <td>
                                      <Link
                                        aria-label='anchor'
                                        href='#'
                                        className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light btn-badge-text'
                                        data-bs-target='#ProgressReport'
                                        data-bs-toggle='modal'
                                      >
                                        <ProgressButton
                                          empID={employee.employeeId}
                                        />
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6'>
                      <div className='card custom-card'>
                        <div className='card-header justify-content-between'>
                          <div className='card-title'>Performance Chart</div>
                        </div>
                        <TeamleadPerformanceChart chartDetail={chartDetail} />
                      </div>
                      <Todo assignedTask={assignedTask} />
                    </div>
                  </div>

                 <TeamLeadAttendance monthName={monthName} response={response} bioMetricAttendance={bioMetricAttendance}/>

                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='card custom-card team_card'>
                        <div className='card-header justify-content-between'>
                          <div className='card-title'>My Showcase Projects</div>
                        </div>
                        <div className='card-body showcase-project-list-outer'>
                          <ul className='list-unstyled mb-0 showcase-project-list'>
                            {projectDetail?.map(
                              (project: any, index: number) => (
                                <li
                                  className={
                                    index === 0
                                      ? 'warning'
                                      : 'warning single-dot'
                                  }
                                  key={index}
                                >
                                  <div className='d-flex align-items-center justify-content-between'>
                                    {project.projectName}
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
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
    </>
  );
};
export default TeamLeadDashBoard;
