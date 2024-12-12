import EditButton from '@/components/myProfile/editButton';
import AddButton from '@/components/myProfile/addProjectButton';
import AddTool from '@/components/myProfile/addToolButton';
import EditProjectButton from '@/components/myProfile/editProjectButton';
import ProjectDeleteButton from '@/components/myProfile/projectDeleteButton';
import Image from 'next/image';
import Link from 'next/link';
// import {
//   ReactElement,
//   JSXElementConstructor,
//   ReactNode,
//   ReactPortal,
//   AwaitedReactNode,
//   Key,
// } from 'react';
import EditToolButton from './editToolButton';
import ToolDeleteButton from './toolDeleteButton';
import UpdateProfileImage from './updateProfileImage';
import getUser from '@/utils/getUserServerSide';
import UpdateEmail from './updateEmail';

const ProfileDetail = ({
  profileDetails,
  designation,
  department,
  projectDetails,
  technologies,
  project,
  userTool,
}: any) => {
  const user: any = getUser();

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

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
    count: badgeCounts[badgeImage],
  }));

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
    <div className='main-container container-fluid profile-page'>
      <div className='row'>
        <div className='col-xxl-4 col-xl-12'>
          <div className='card custom-card overflow-hidden'>
            <div className='card-body p-0'>
              <div className='d-sm-flex align-items-top p-4 border-bottom-0 main-profile-cover'>
                <div className=''>
                  <UpdateProfileImage profileDetails={profileDetails} />
                </div>
                <div className='flex-fill main-profile-info'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <h6 className='fw-semibold mb-1 text-fixed-white'>
                      {profileDetails?.model?.userProfile.firstName}
                      &nbsp; {profileDetails?.model?.userProfile.lastName}
                    </h6>
                    <EditButton
                      id={profileDetails?.model?.userProfile.id}
                      designation={designation}
                      department={department}
                      technologies={technologies}
                    />
                  </div>
                  <p className='mb-1 text-fixed-white op-8'>
                    {profileDetails?.model?.userProfile.designation}(
                    {profileDetails?.model?.userProfile.departmentName})
                  </p>
                  <p className='fs-12 mb-1 op-8 text-fixed-white'>
                    <span className='me-3'>
                      Employee Id:{' '}
                      {profileDetails?.model?.userProfile.employeeNumber}
                    </span>
                  </p>
                  <p className='fs-12 mb-2 op-8 text-fixed-white'>
                    <span className='me-3'>
                      Date of Joining:{' '}
                      {profileDetails?.model?.userProfile.joiningDate
                        ? new Date(
                            profileDetails.model?.userProfile.joiningDate
                          ).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </p>
                  <p className='fs-12 mb-1 op-8 text-fixed-white'>
                    <span className='me-3'>
                      Total Experience:{' '}
                      {profileDetails?.model?.userProfile.joiningDate &&
                      profileDetails?.model?.userProfile.experienceOnJoining
                        ? calculateCombinedExperience(
                            profileDetails?.model?.userProfile.joiningDate,
                            parseInt(
                              profileDetails?.model?.userProfile
                                .experienceOnJoining
                            ) || 0
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
                  {user?.role !== 'Project Manager' && user?.role !== 'HOD' && (
                    <div className='d-flex mb-2'>
                      <div className='me-4'>
                        <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                          {profileDetails?.model?.userProfile.projects}
                        </p>
                        <p className='mb-0 fs-11 op-8 text-fixed-white'>
                          Projects
                        </p>
                      </div>
                      <div className='me-4'>
                        <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                          {numberToTimeConversion(
                            profileDetails?.model?.userProfile.upworkHours
                          )}
                        </p>
                        <p className='mb-0 fs-11 op-8 text-fixed-white'>
                          Upwork
                        </p>
                      </div>
                      <div className='me-4'>
                        <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                          {numberToTimeConversion(
                            profileDetails?.model?.userProfile.fixedHours
                          )}
                        </p>
                        <p className='mb-0 fs-11 op-8 text-fixed-white'>
                          Fixed
                        </p>
                      </div>

                      <div className='me-4'>
                        <p className='fw-bold fs-20 text-fixed-white text-shadow mb-0'>
                          {numberToTimeConversion(
                            profileDetails?.model?.userProfile.offlineHours
                          )}
                        </p>
                        <p className='mb-0 fs-11 op-8 text-fixed-white'>
                          Offline
                        </p>
                      </div>
                    </div>
                  )}
                  {user.role !== 'HOD' &&
                    user.role !== 'HR' &&
                    user.role !== 'Project Manager' && (
                      <Link
                        href={`/profile/${profileDetails?.model?.userProfile.id}`}
                      >
                        <div className='btn btn-white btn-wave'>
                          <i className='bi bi-file-bar-graph'></i>
                          Performance Report{' '}
                        </div>
                      </Link>
                    )}
                </div>
              </div>

              <div className='p-4 border-bottom border-block-end-dashed'>
                <p className='fs-15 mb-2 me-4 fw-semibold'>
                  Contact Information
                </p>
                <div className='text-muted'>
                  <div className='align-items-center d-flex mb-2'>
                    <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                      <i className='bi bi-envelope-fill'></i>
                    </span>
                    <UpdateEmail profileDetails={profileDetails} />
                  </div>
                  <div className='align-items-center d-flex mb-2'>
                    <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                      <i className='bi bi-telephone-fill'></i>
                    </span>
                    {profileDetails?.model?.userProfile.phoneNumber}
                  </div>
                  <div className='align-items-center d-flex mb-2'>
                    <span className='avatar avatar-sm avatar-rounded me-2 bg-light text-muted'>
                      <i className='bi bi-geo-alt'></i>
                    </span>
                    {profileDetails?.model?.userProfile.address}
                  </div>
                </div>
              </div>

              <div className='p-4 border-bottom border-block-end-dashed'>
                <p className='fs-15 mb-2 me-4 fw-semibold'>Skills:</p>
                <div>
                  {profileDetails?.model?.userProfile.skills
                    ?.split(',')
                    .map((skill: string, index: number | null | undefined) => (
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
          {user.role !== 'HR' && (
            <div className='row'>
              <div className='col-xl-12 col-xl-'>
                <div className='card custom-card'>
                  <div className='card-header justify-content-between'>
                    <div className='card-title'>
                      {profileDetails?.model?.userProfile.firstName}
                      `s Projects
                    </div>
                    <AddButton
                      id={profileDetails?.model?.userProfile.id}
                      projectDetails={projectDetails}
                      technologies={technologies}
                    />
                  </div>
                  <div className='card-body'>
                    <ul className='list-group'>
                      {project?.map(
                        (
                          project: {
                            projectName:
                              | string
                              | number
                              | null
                              | undefined;
                            technology: any;
                            description:
                              | string
                              | number
                              | null
                              | undefined;
                            liveUrl:
                              | string
                              | number
                              | null
                              | undefined;
                            id: {
                              toString: () => string;
                            };
                          },
                          index: number | null | undefined
                        ) => (
                          <li
                            key={index}
                            className='d-flex gap-2 justify-content-between list-group-item'
                          >
                            <div>
                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  Project :
                                </div>
                                <span>{project?.projectName}</span>
                              </div>
                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  Technology :
                                </div>
                                <span>
                                  {
                                    technologies?.filter(
                                      (item: { id: number }) =>
                                        item.id === Number(project.technology)
                                    )[0]?.name
                                  }
                                </span>
                              </div>
                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  Description :
                                </div>
                                <span>{project.description}</span>
                              </div>
                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  Production Url :
                                </div>
                                <span>{project.liveUrl}</span>
                              </div>

                              <div className='d-flex align-items-start line-text'>
                                <EditProjectButton
                                  id={project.id.toString()}
                                  projectDetails={projectDetails}
                                  technologies={technologies}
                                />
                                <ProjectDeleteButton
                                  id={project.id.toString()}
                                />
                              </div>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className='card custom-card'>
                  <div className='card-header justify-content-between'>
                    <div className='card-title'>Your Tools</div>
                    <AddTool
                      id={profileDetails?.model?.userProfile.id}
                      technologies={technologies}
                    />
                  </div>
                  <div className='card-body'>
                    <ul className='list-group'>
                      {userTool?.map(
                        (
                          tool: {
                            description:
                              | string
                              | number
                              | null
                              | undefined;
                            technology: any;
                            networkUrl:
                              | string
                              | number
                              | null
                              | undefined;
                            localUrl:
                              | string
                              | number
                              | null
                              | undefined;
                            id: {
                              toString: () => string;
                            };
                          },
                          index: number | null | undefined
                        ) => (
                          <li
                            key={index}
                            className='d-flex gap-2 justify-content-between list-group-item'
                          >
                            <div>
                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  {' '}
                                  Technology:{' '}
                                </div>
                                <span>{tool?.technology}</span>
                              </div>

                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  {' '}
                                  Network URL:{' '}
                                </div>
                                <span>{tool.networkUrl}</span>
                              </div>
                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  {' '}
                                  Local URL:{' '}
                                </div>
                                <span>{tool.localUrl}</span>
                              </div>
                              <div className='d-flex align-items-start line-text'>
                                <div className='me-2 fw-semibold nowrap'>
                                  {' '}
                                  Description:{' '}
                                </div>
                                <span>{tool?.description}</span>
                              </div>

                              <div className='d-flex align-items-start line-text'>
                                <EditToolButton
                                  id={tool.id.toString()}
                                  userTool={userTool}
                                  technologies={technologies}
                                />
                                <ToolDeleteButton id={tool.id.toString()} />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
