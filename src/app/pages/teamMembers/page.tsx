'use server';
import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import Image from 'next/image';
import UserBackground from '/public/assets/images/users/user-bg.jpg';
import { TeamMemberModel, TeamMemberParam } from '@/utils/types';
import { TeamMemberList } from '@/utils/publicApi';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

const TeamMembers = async ({ searchParams }: any) => {
  let teamAdminId: string = searchParams.teamAdminId ?? '';

  let data: TeamMemberParam = {
    teamAdminId: teamAdminId,
  };

  let teamMember: TeamMemberModel[] = [];
  try {
    const { results } = await TeamMemberList(data);
    teamMember = results.map((record: any) => {
      const badgeMap: any = {};
      record.badges.forEach((badge: any) => {
        const uniqueBadgeId = badge.badgeId;
        if (badgeMap[uniqueBadgeId]) {
          badgeMap[uniqueBadgeId].count += 1;
        } else {
          badgeMap[uniqueBadgeId] = { ...badge, count: 1 };
        }
      });
      record.badges = Object.values(badgeMap);
      return record;
    });
  } catch (error) {}

  return (
    <>
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
                    <div className='d-flex flex-wrap align-items-center justify-content-between '>
                      <div className='card-title mb-2'>Team Members</div>
                      <div className='d-flex align-items-center'>
                        <div className='input-group mb-2'>
                          <div className='search_box'>
                            <i className='ri-search-line'></i>
                            <input
                              className='form-control'
                              type='text'
                              placeholder='Search Here'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='all-users-details '>
                  <div className='row'>
                    {teamMember &&
                      teamMember?.map((member: TeamMemberModel) => (
                        <div
                          key={member.id}
                          className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-12'
                        >
                          <div className='card custom-card team-member-card'>
                            <div className='teammember-cover-image'>
                              <Image
                                src={UserBackground}
                                className='card-img-top'
                                alt='background'
                              />
                              <span className='avatar avatar-xl avatar-rounded'>
                                <Image
                                  src={`https://3t-api.csdevhub.com/images/${member?.profileImageName}`}
                                  width={20}
                                  height={20}
                                  alt='profileImage'
                                />
                              </span>
                              <div className='team-member-star'>
                                {member.badges?.map((badge: any) => (
                                  <div key={badge.id} className='star-img'>
                                    <Image
                                      src={`data:image/jpeg;base64,${badge.badgeImage}`}
                                      width={50}
                                      height={50}
                                      alt={badge.badgeName}
                                    />
                                    <span className='count'>{badge.count}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className='card-body p-0'>
                              <div className='d-flex flex-wrap align-item-center mt-sm-0 mt-5 justify-content-between border-bottom border-block-end-dashed p-3'>
                                <div className='team-member-details flex-fill'>
                                  <p className='mb-0 fw-semibold fs-16 text-truncate'>
                                    <Link href={`/employees/${member.id}`}>
                                      {member.firstName} {member.lastName}
                                    </Link>
                                  </p>
                                  <p className='mb-0 fs-12 text-muted text-break'>
                                    {member.email}
                                  </p>
                                </div>
                              </div>
                              <div className='team-member-stats d-sm-flex justify-content-evenly'>
                                <div className='text-center p-3 my-auto'>
                                  <p className='fw-semibold mb-0'>
                                    Member Since
                                  </p>
                                  <span className='text-muted fs-12'>
                                    {formatDistanceToNow(
                                      new Date(member.joiningDate),
                                      { addSuffix: false }
                                    )}
                                  </span>
                                </div>
                                <div className='text-center p-3 my-auto'>
                                  <p className='fw-semibold mb-0'>Projects</p>
                                  <span className='text-muted fs-12'>
                                    {member.projectCount}
                                  </span>
                                </div>
                                <div className='text-center p-3 my-auto'>
                                  <p className='fw-semibold mb-0'>Position</p>
                                  <span className='text-muted fs-12'>
                                    {member.designation}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
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

export default TeamMembers;
