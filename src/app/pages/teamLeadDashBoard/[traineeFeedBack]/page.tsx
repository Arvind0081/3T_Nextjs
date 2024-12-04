import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import {
  EmpFeedBack,
  EmpProfileDetailsById,
  performanceList,
} from '@/utils/publicApi';
import { EmpProfileReqParams } from '@/utils/types';
import getUser from '@/utils/getUserServerSide';
import Image from 'next/image';
import AddFeedbackButton from '@/components/teamleadDashboard/addFeedBackButton';
import Footer from '@/components/common/Footer/footer';
import EditFeedBackButton from '@/components/teamleadDashboard/editFeedBackButton';
import DeleteFeedbackButton from '@/components/teamleadDashboard/deleteFeedBackButton';
import ViewFeedBackButton from '@/components/teamleadDashboard/viewFeedBackButton';
// import DeleteFeedbackButton from '@/components/teamleadDashboard/deleteFeedBackButton';
// import EditFeedBackButton from '@/components/teamleadDashboard/editFeedBackButton';

const TraineeFeedBack = async ({ params }: any) => {
  let user: any = getUser();
  let data: any;
  let feedBack: any;
  let performance: any[] = [];

  const empProfileDetails = params.traineeFeedBack;
  let reqParams: EmpProfileReqParams = {
    departmentID: user.departmentId,
    employeeId: empProfileDetails,
  };

  try {
    data = await EmpProfileDetailsById(reqParams);
  } catch (error) {}

  try {
    feedBack = await EmpFeedBack(reqParams);
  } catch (error) {}

  try {
    performance = await performanceList();
  } catch (error) {}

  return (
    <div className='app sidebar-mini ltr light-mode'>
      <div className='page'>
        <div className='page-main'>
          <Header />
          <SideNav />
          <div className='main-content app-content mt-0'>
            <div className='side-app'>
              <div className='main-container container-fluid profile-page'>
                <div className='row'>
                  <div className='col-xxl-4 col-xl-12'>
                    <div className='card custom-card overflow-hidden'>
                      <div className='card-body p-0'>
                        <div className='d-sm-flex align-items-top p-4 border-bottom-0 main-profile-cover'>
                          <div>
                            <span className='avatar avatar-xxl avatar-rounded online me-3'>
                              <Image
                                src={`https://3t-api.csdevhub.com/images/${data?.profileImage}`}
                                width={120}
                                height={120}
                                alt='logo'
                              />
                            </span>
                          </div>

                          <div className='flex-fill main-profile-info'>
                            <div className='d-flex align-items-center justify-content-between'>
                              <h6 className='fw-semibold mb-1 text-fixed-white'>
                                {data?.firstName}
                                &nbsp;
                                {data?.lastName}
                              </h6>
                            </div>
                            <p className='mb-1 text-fixed-white op-8'>
                              {data?.designation}
                            </p>
                            <p className='fs-12 text-fixed-white mb-1'>
                              <span className='me-3'>
                                Allow Status Update:{' '}
                                {data?.canEditStatus ? 'Yes' : 'No'}
                              </span>
                            </p>

                            <p className='fs-12 mb-1 op-8 text-fixed-white'>
                              <span className='me-3'>
                                Date of Joining:{' '}
                                {data?.joiningDate
                                  ? new Date(
                                      data.joiningDate
                                    ).toLocaleDateString()
                                  : 'N/A'}
                              </span>
                            </p>

                            {/* <p class='fs-12 text-fixed-white mb-4 op-8 management-change'><span class='me-3'>Manager: <select class='form-control'><option>Vikrant Thakur</option></select></span></p> */}
                          </div>
                        </div>
                        <div className='p-4 border-bottom border-block-end-dashed'>
                          <div>
                            <div>
                              <p className='fs-15 mb-2 fw-semibold'>
                                Quick Action
                              </p>
                              <div className='mb-0 profile-action'>
                                <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
                                  <span className='me-3'>
                                    <label>Status: </label>Active
                                  </span>
                                </p>

                                <p className='fs-12 text-fixed-white mb-3 op-8 management-change'>
                                  <span className='me-3'>
                                    <label>Manager: </label>
                                    {data?.manager}
                                  </span>
                                </p>
                                <p className='fs-12 text-fixed-white mb-0 op-8 management-change'>
                                  <span className='me-3'>
                                    <label>Password: </label>
                                    <a
                                      href='#'
                                      className='badge bg-primary-transparent fs-12'
                                    >
                                      Reset Here
                                    </a>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='p-4 border-bottom border-block-end-dashed'>
                          <div>
                            <p className='fs-15 mb-2 fw-semibold'>
                              Assign Awards
                            </p>
                            <div className='d-flex mb-0 profile-awards assign-awards'>
                              {data?.awardList.map(
                                (award: any, index: number) => (
                                  <div key={index} className='mr-3'>
                                    <Image
                                      src={`data:image/jpeg;base64, ${award.base64Image}`}
                                      width={150}
                                      height={150}
                                      alt={`award_${index}`}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='p-4 border-bottom border-block-end-dashed'>
                          <p className='fs-15 mb-2 me-4 fw-semibold'>
                            Contact Information
                          </p>
                          <div className='text-muted'>
                            <p className='align-items-center d-flex mb-2'>
                              <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                                <i className='bi bi-envelope-fill'></i>
                              </span>
                              {data?.email}
                            </p>
                            <p className='align-items-center d-flex mb-2'>
                              <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                                <i className='bi bi-telephone-fill'></i>
                              </span>{' '}
                              {data?.phoneNumber}
                            </p>
                            <p className='align-items-center d-flex mb-2'>
                              <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                                <i className='bi bi-geo-alt'></i>
                              </span>
                              {data?.address}
                            </p>
                          </div>
                        </div>
                        <div className='p-4 border-bottom border-block-end-dashed'>
                          <p className='fs-15 mb-2 me-4 fw-semibold'>Skills:</p>
                          <div>
                            {data?.skills
                              ?.split(',')
                              .map((skill: any, index: number) => (
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
                            <div className='card-title'>
                              Monthly Trainee feedback{' '}
                            </div>
                            <div className='filter-right'>
                              <AddFeedbackButton
                                performance={performance}
                                user={user}
                                profileDetails={data}
                              />
                            </div>
                          </div>
                          <div className='card-body'>
                            <div className='table-responsive theme_table mb-0'>
                              <div className='table-responsive theme_table'>
                                <table className='table text-nowrap table-hover border table-bordered'>
                                  <thead>
                                    <tr>
                                      <th scope='col'>Assessment</th>
                                      <th scope='col'>Mentor</th>
                                      <th scope='col'>Performance</th>
                                      <th scope='col'>Skill Set</th>
                                      <th scope='col'>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {feedBack?.map((item: any, index: any) => (
                                      <tr key={index}>
                                        <td>{item.assessmentMonth}</td>
                                        <td>{item.mentorName}</td>
                                        <td>
                                          {
                                            performance.find(
                                              (per: any) =>
                                                per.value ===
                                                Number(item.performance)
                                            )?.text
                                          }
                                        </td>
                                        <td>{item.skillSet}</td>
                                        <td>
                                          <div className='align-items-start d-flex fs-15 gap-2'>
                                          <ViewFeedBackButton
                                              performance={performance}
                                              profileDetails={data}
                                              feedback={item}
                                            />
                                            <EditFeedBackButton
                                              performance={performance}
                                              profileDetails={data}
                                              feedback={item}
                                            />
                                            <DeleteFeedbackButton
                                              id={item.feedBackId}
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='card custom-card'>
                          <div className='card-header justify-content-between items-center'>
                            <div className='card-title'>Project Detail</div>
                          </div>
                          <div className='card-body'>
                            <div className='table-responsive theme_table'>
                              <table className='table text-nowrap table-hover border table-bordered'>
                                <thead>
                                  <tr>
                                    <th scope='col'>Updated on</th>
                                    <th scope='col'>Date</th>
                                    <th className='project-width'>
                                      Project Name
                                    </th>
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
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.projects?.map(
                                    (project: any, index: any) => (
                                      <tr key={index}>
                                        <td>{project.projectName}</td>
                                        <td>{project.technology}</td>
                                        <td>{project.description} </td>

                                        <td>{project.productionURL}</td>
                                        <td>
                                          <div className='align-items-start d-flex fs-15 gap-2'>
                                            <a
                                              aria-label='anchor'
                                              href='#'
                                              className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-light'
                                            >
                                              <i className='ri-eye-line'></i>
                                            </a>
                                            <a
                                              aria-label='anchor'
                                              href='#'
                                              className='btn-sm-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light'
                                              data-bs-toggle='offcanvas'
                                              data-bs-target='#UpdateProjectModal'
                                              aria-controls='UpdateProjectModal'
                                            >
                                              <i className='ri-edit-line'></i>
                                            </a>
                                            <a
                                              aria-label='anchor'
                                              href='#'
                                              className='btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger-transparent btn-sm-badge'
                                              data-bs-target='#DeleteModal'
                                              data-bs-toggle='modal'
                                            >
                                              <i className='ri-delete-bin-line'></i>
                                            </a>
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {/* <div className='card custom-card'>
                          <div className='card-header justify-content-between items-center'>
                            <div className='card-title'>Vivek Plugins</div>
                          </div>
                          <div className='card-body'></div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className='offcanvas offcanvas-end ModalW500 feedback-form'
                  id='CreateNewFormModal'
                  aria-labelledby='CreateNewFormModalLabel'
                >
                  <div className='offcanvas-header'>
                    <h5>Feedback form</h5>
                    <button
                      type='button'
                      className='btn-close text-reset'
                      data-bs-dismiss='offcanvas'
                      aria-label='Close'
                    >
                      <i className='fe fe-x fs-18'></i>
                    </button>
                  </div>
                  <div className='offcanvas-body'>
                    <form className='feedback-body m-0'>
                      <div className='row'>
                        <div className='col-sm-12 form-group'>
                          <div className='d-flex gap-2 align-items-center'>
                            <label htmlFor='inputState' className='nowrap mb-1'>
                              Feedback Type
                            </label>
                            <select
                              id='inputState'
                              className='form-control w250'
                            >
                              <option>Monthly Trainee Feedback</option>
                              <option>Performance Feedback</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className='status-repeat-box row m-0 p-0'>
                          <div className='card-header'>
                            <div className='card-title'>
                              Trainee Performance Evaluation
                            </div>
                          </div>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-md-6 form-group'>
                                <label>Name of the Trainee</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder='Vivek'
                                />
                              </div>
                              <div className='col-md-6 form-group'>
                                <label>Department</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder='Dot Net'
                                />
                              </div>
                              <div className='col-md-6 form-group'>
                                <label>Designation</label>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder='Trainee'
                                />
                              </div>
                              <div className='col-md-6 form-group'>
                                <label>
                                  Date of Joining{' '}
                                  <span className='astrisk'>*</span>
                                </label>
                                <div className='input-group'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value='4 Feb 2024'
                                  />
                                  <div className='input-group-text'>
                                    <i className='ri-calendar-line'></i>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6 form-group'>
                                <label>
                                  Assessment Month{' '}
                                  <span className='astrisk'>*</span>
                                </label>
                                <div className='input-group'>
                                  <input
                                    type='month'
                                    className='form-control'
                                    value='Feb 2024'
                                  />
                                  <div className='input-group-text'>
                                    <i className='ri-calendar-line'></i>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6 form-group'>
                                <label htmlFor='inputState'>
                                  Name of Immediate Mentor{' '}
                                  <span className='astrisk'>*</span>
                                </label>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder=''
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='status-repeat-box row  p-0'>
                          <div className='card-header'>
                            <div className='card-title'>
                              Feedback Form Immediate Mentor{' '}
                            </div>
                          </div>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-md-12 form-group'>
                                <label>
                                  Performance <span className='astrisk'>*</span>
                                </label>
                                <div className='d-flex performance-content'>
                                  <label className='performance-label bg-tranparent'>
                                    <input type='checkbox' /> Good
                                  </label>
                                  <label className='performance-label bg-tranparent'>
                                    <input type='checkbox' /> Average
                                  </label>
                                  <label className='performance-label bg-tranparent'>
                                    <input type='checkbox' /> Below Average
                                  </label>
                                </div>
                              </div>
                              <div className='col-md-12 form-group'>
                                <label>
                                  Skill Set <span className='astrisk'>*</span>
                                </label>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder=''
                                />
                              </div>
                              <div className='col-md-12 form-group'>
                                <label>
                                  Comments <span className='astrisk'>*</span>
                                </label>
                                <textarea
                                  id='inputState'
                                  className='form-control'
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className='status-repeat-box row m-0 p-0'>
                          <div className='card-header justify-content-between'>
                            <div className='card-title'>
                              Performance for April
                            </div>
                            <div className='input-group date-selectbox'>
                              <input
                                type='text'
                                className='form-control'
                                value='Feb 2024'
                              />
                              <div className='input-group-text'>
                                <i className='ri-calendar-line'></i>
                              </div>
                            </div>
                          </div>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-sm-12'>
                                <p className='small mb-5'>
                                  <i>
                                    <b>Note:</b> Most of the calculations are
                                    done on automated algorithm based on daily
                                    status added by you and your team in 3T
                                    along with manager and client feedback.
                                  </i>
                                </p>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-6 form-group'>
                                <div className='input-group'>
                                  <div className='input-group-text fs-12'>
                                    To
                                  </div>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder=''
                                  />
                                </div>
                              </div>
                              <div className='col-md-6 form-group'>
                                <div className='input-group'>
                                  <div className='input-group-text fs-12'>
                                    CC
                                  </div>
                                  <input
                                    type='text'
                                    className='form-control'
                                    placeholder=''
                                  />
                                </div>
                              </div>
                              <div className='col-md-12 form-group mb-2'>
                                <div className='d-flex justify-content-start gap-2'>
                                  <label>
                                    Overall Rating{' '}
                                    <span className='small'>
                                      (For April /2024)
                                    </span>
                                  </label>
                                  <div className='feedbackRating star_rating'>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-12 form-group'>
                                <div className='d-flex justify-content-start gap-2'>
                                  <label>Manager Feedback Rating</label>
                                  <div className='feedbackRating star_rating'>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                  </div>
                                </div>
                                <textarea
                                  id='inputState'
                                  className='form-control'
                                ></textarea>
                              </div>
                              <div className='col-md-12 form-group mb-0'>
                                <div className='d-flex justify-content-start gap-2'>
                                  <label>Client`s Feedback Rating </label>
                                  <div className='feedbackRating star_rating'>
                                    <i className='ri-star-fill color_star'></i>
                                    <i className='ri-star-fill color_star'></i>
                                    <i className='ri-star-fill color_star'></i>
                                    <i className='ri-star-fill'></i>
                                    <i className='ri-star-fill'></i>
                                  </div>
                                </div>
                                <textarea
                                  id='inputState'
                                  className='form-control'
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className='offcanvas-footer text-right'>
                    <button type='submit' className='btn btn-primary'>
                      Save
                    </button>
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
export default TraineeFeedBack;
