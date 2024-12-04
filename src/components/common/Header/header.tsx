import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { managerList, userProfileDetails } from '@/utils/publicApi';
import ProfileSection from './profileSection';
import ToggleSideMenu from './toggleSideMenu';
import HRDepartmentList from './hrDepartmentList';
import getUser from '@/utils/getUserServerSide';
import AdminPagesList from './adminPagesList';
// import FilterManager from '@/components/hod/filterManager';


const Header = async ({ getManagerList, departmentData,param }: any) => {
  let user: any = getUser();

  let getManagerListHOD: any;

  try {
    getManagerListHOD = await managerList(user.departmentId);
  } catch (error: any) {}

  const details = await userProfileDetails();

  return (
    <div className='app-header header sticky' style={{ marginBottom: '-58px' }}>
      <div className='container-fluid main-container'>
        <div className='d-flex'>
          <ToggleSideMenu />
          &nbsp;
          {user.role === 'Admin' || user.role === 'HR' ? (
    <HRDepartmentList
    getDepartment={departmentData}
    getManagerList={getManagerList}
    param={param}
  />
) : (
  details?.model?.userProfile.departmentName + ' Department'
)}
          <Link className='logo-horizontal' href='#'>
            <Image
              src='https://design.csdevhub.com/3tDesign/assets/images/brand/logo-white.png'
              className='header-brand-img desktop-logo'
              width={20}
              height={20}
              alt='logo'
            />
            <Image
              src='https://design.csdevhub.com/3tDesign/assets/images/brand/logo-dark.png'
              className='header-brand-img light-logo1'
              width={20}
              height={20}
              alt='logo'
            />
          </Link>
           {user.role == 'HOD' && <AdminPagesList list={getManagerListHOD}/>}
           {/* <FilterManager list={getManagerListHOD} /> */}
          <div className='d-flex order-lg-2 ms-auto header-right-icons'>
            <button
              className='navbar-toggler navresponsive-toggler d-lg-none ms-auto'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent-4'
              aria-controls='navbarSupportedContent-4'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon fe fe-more-vertical'></span>
            </button>
            <div className='navbar navbar-collapse responsive-navbar p-0'>
              <div
                className='collapse navbar-collapse'
                id='navbarSupportedContent-4'
              >
                <div className='d-flex order-lg-2'>
                  <div className='dropdown d-lg-none d-flex'>
                    <a className='nav-link icon' data-bs-toggle='dropdown'>
                      <i className='fe fe-search'></i>
                    </a>
                    <div className='dropdown-menu header-search dropdown-menu-start'>
                      <div className='input-group w-100 p-2'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Search....'
                        />
                        <div className='input-group-text btn btn-primary'>
                          <i className='fa fa-search' aria-hidden='true'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='dropdown d-flex notifications'>
                    <a className='nav-link icon' data-bs-toggle='dropdown'>
                    <i className="bi bi-bell"></i>
                      <span className='pulse'></span>
                    </a>
                    <div className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile-dropdown'>
                      <div className='drop-heading border-bottom'>
                        <div className='d-flex'>
                          <h6 className='mt-1 mb-0 fs-16 fw-semibold text-dark'>
                            Notifications
                          </h6>
                        </div>
                      </div>
                      <div className='notifications-menu'>
                        <a
                          className='dropdown-item d-flex'
                          href='notify-list.html'
                        >
                          <div className='me-3 notifyimg bg-primary brround box-shadow-primary'>
                            <i className='fe fe-mail'></i>
                          </div>
                          <div className='mt-1 wd-80p'>
                            <h5 className='notification-label mb-1'>
                              New Application received
                            </h5>
                            <span className='notification-subtext'>
                              3 days ago
                            </span>
                          </div>
                        </a>
                        <a
                          className='dropdown-item d-flex'
                          href='notify-list.html'
                        >
                          <div className='me-3 notifyimg bg-secondary brround box-shadow-secondary'>
                            <i className='fe fe-check-circle'></i>
                          </div>
                          <div className='mt-1 wd-80p'>
                            <h5 className='notification-label mb-1'>
                              Project has been approved
                            </h5>
                            <span className='notification-subtext'>
                              2 hours ago
                            </span>
                          </div>
                        </a>
                        <a
                          className='dropdown-item d-flex'
                          href='notify-list.html'
                        >
                          <div className='me-3 notifyimg bg-success brround box-shadow-success'>
                            <i className='fe fe-shopping-cart'></i>
                          </div>
                          <div className='mt-1 wd-80p'>
                            <h5 className='notification-label mb-1'>
                              Your Product Delivered
                            </h5>
                            <span className='notification-subtext'>
                              30 min ago
                            </span>
                          </div>
                        </a>
                        <a
                          className='dropdown-item d-flex'
                          href='notify-list.html'
                        >
                          <div className='me-3 notifyimg bg-pink brround box-shadow-pink'>
                            <i className='fe fe-user-plus'></i>
                          </div>
                          <div className='mt-1 wd-80p'>
                            <h5 className='notification-label mb-1'>
                              Friend Requests
                            </h5>
                            <span className='notification-subtext'>
                              1 day ago
                            </span>
                          </div>
                        </a>
                      </div>
                      <div className='dropdown-divider m-0'></div>
                      <a
                        href='notify-list.html'
                        className='dropdown-item text-center p-3 text-muted'
                      >
                        View all Notification
                      </a>
                    </div>
                  </div>
                  <ProfileSection profileDetails={details} />
                  <div className='dropdown d-flex header-settings'>
                    <Link
                      href='#'
                      className='nav-link icon'
                      data-bs-toggle='sidebar-right'
                      data-target='.sidebar-right'
                    >
                      <i className='fe fe-align-right'></i>
                    </Link>
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

export default Header;
