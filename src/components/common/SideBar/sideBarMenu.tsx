'use client';
import React from 'react';
import Link from 'next/link';
import SideBarSettings from './sideBarSetting';
import { getCookie} from 'cookies-next';

import { usePathname, useSearchParams } from 'next/navigation';
const SideBarMenu = ({ user }: any) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const tabName = 'Attendance Report';
  const tab = 'Search Invoice';
  const teamAdminId = searchParams.get('teamAdminId')??  getCookie('manager')?.toString();
  const compairRole = (array: string[]) => {
    if (user) {
      if (array.includes(user.role)) {
        return true;
      } else {
        return false;
      }
    }
  };
  // const compareDesignation=(array: string[])=>{
  //   if(user){
  //     if(array.includes(user.designation)){
  //       return true;
  //     }else{
  //       return false;
  //     }
  //   }
  // };

  return (
    <div className='main-sidemenu'>
      <div className='slide-left disabled' id='slide-left'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='#7b8191'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z' />
        </svg>
      </div>
      <ul className='side-menu'>
        {compairRole(['Project Manager', 'HOD', 'Employee', 'BDM', 'HR','Admin']) && (
          <li className='sub-category'>
            <h3>Main</h3>
          </li>
        )}
  {compairRole(['Admin']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/adminDepartment' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/adminDepartment'
            >
              <i className='side-menu__icon bx bx-home'></i>
              <span className='side-menu__label'>All Departments</span>
            </Link>
          </li>
        )}
         {compairRole(['Admin']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/dashBoard' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/dashBoard?departmentId=1005'
            >
              <i className='side-menu__icon bx bx-home'></i>
              <span className='side-menu__label'>Dashboard</span>
            </Link>
          </li>
        )}

        {compairRole(['Project Manager', 'HOD']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/dashBoard' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/dashBoard'
            >
              <i className='side-menu__icon bx bx-home'></i>
              <span className='side-menu__label'>Dashboard</span>
            </Link>
          </li>
        )}
        {compairRole(['Employee', 'BDM']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/employeeDashBoard' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/employeeDashBoard'
            >
              <i className='side-menu__icon bx bx-video'></i>
              <span className='side-menu__label'>DashBoard</span>
            </Link>
          </li>
        )}
        {compairRole(['Team Lead']) && (
          <Link
            className={`side-menu__item has-link ${pathName == '/teamLeadDashBoard' ? 'active' : ''} `}
            data-bs-toggle='slide'
            href='/teamLeadDashBoard'
          >
            <i className='side-menu__icon bx bx-video'></i>
            <span className='side-menu__label'>DashBoard</span>
          </Link>
        )}

        {compairRole(['HR']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/hrDashBoard' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/hrDashBoard'
            >
              <i className='side-menu__icon bx bx-video'></i>
              <span className='side-menu__label'>DashBoard</span>
            </Link>
          </li>
        )}

        {compairRole([
          'Project Manager',
          'Employee',
          'Team Lead',
          'BDM',
          'HR',
          'HOD',
        ]) && (
          <li className='sub-category'>
            <h3>Pages</h3>
          </li>
        )}
        {compairRole(['Project Manager', 'HOD']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/reports' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href={compairRole(['HOD'])?`/reports?tab=${tabName}&teamAdminId=${teamAdminId}`:`/reports?tab=${tabName}`}
            >
              <i className='side-menu__icon bx bx-archive-in'></i>
              <span className='side-menu__label'>Reports</span>
            </Link>
          </li>
        )}
        {compairRole(['Project Manager', 'HOD']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/employees' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href={compairRole(['HOD'])?`/employees?teamAdminId=${teamAdminId}`:'/employees'}
            >
              <i className='side-menu__icon bx bx-user'></i>
              <span className='side-menu__label'>Team Members</span>
            </Link>
          </li>
        )}
        {compairRole(['HR']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/hrReports' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/hrReports?departmentId=1014'
            >
              <i className='side-menu__icon bx bx-video'></i>
              <span className='side-menu__label'>Reports</span>
            </Link>
          </li>
        )}
        {compairRole(['HR']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/hrEmployeesBoard' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/hrEmployeesBoard'
            >
              <i className='side-menu__icon bx bx-video'></i>
              <span className='side-menu__label'>Team Members</span>
            </Link>
          </li>
        )}

        {compairRole(['Employee', 'Team Lead', 'BDM']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/myStatus' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/myStatus'
            >
              <i className='side-menu__icon bx bx-briefcase-alt-2'></i>
              <span className='side-menu__label'>My Status</span>
            </Link>
          </li>
        )}
        {compairRole(['Team Lead']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/teamStatus' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/teamStatus'
            >
              <i className='side-menu__icon bx bx-briefcase-alt-2'></i>
              <span className='side-menu__label'>Team Status</span>
            </Link>
          </li>
        )}

        {compairRole(['Project Manager', 'HOD','Admin']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/managerToDo' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href={compairRole(['HOD'])?`/managerToDo?teamAdminId=${teamAdminId}`:'/managerToDo'}
            >
              <i className='side-menu__icon bx bx-briefcase-alt-2'></i>
              <span className='side-menu__label'>{'Team`s To-Do`s'}</span>
            </Link>
          </li>
        )}

        {compairRole(['Team Lead']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/teamToDo' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/teamToDo'
            >
              <i className='side-menu__icon bx bx-briefcase-alt-2'></i>
              <span className='side-menu__label'>{'Team`s To-Do`s'}</span>
            </Link>
          </li>
        )}
        {compairRole(['Project Manager', 'HOD', 'Team Lead', 'BDM']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/projects' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href={compairRole(['HOD'])?`/projects?teamAdminId=${teamAdminId}`:'/projects'}
            >
              <i className='side-menu__icon bx bx-briefcase-alt-2'></i>
              <span className='side-menu__label'>Projects</span>
            </Link>
          </li>
        )}
        {compairRole(['Team Lead']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/teamMembers' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/teamMembers'
            >
              <i className='side-menu__icon bx bxs-user-detail'></i>
              <span className='side-menu__label'>Team Members</span>
            </Link>
          </li>
        )}
        {compairRole(['Project Manager', 'HOD', 'BDM']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/upworkprofile' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href={'/upworkprofile'}
            >
              <i className='side-menu__icon bx bxs-user-detail'></i>
              <span className='side-menu__label'>Billing Profile</span>
            </Link>
          </li>
        )}
        {compairRole(['Project Manager', 'HOD', 'BDM']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/clients' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href={'/clients'}
            >
              <i className='side-menu__icon bx bx-home'></i>
              <span className='side-menu__label'>Clients</span>
            </Link>
          </li>
        )}
        {compairRole(['Project Manager', 'HOD']) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/invoices' ? 'active' : ''} `}
              data-bs-toggle='slide'
              // href='/invoices'
              href={`/invoices?tabs=${tab}`}
            >
              <i className='side-menu__icon bx bx-video'></i>
              <span className='side-menu__label'>Invoice</span>
            </Link>
          </li>
        )}

        {compairRole([
          'Project Manager',
          'Employee',
         'Team Lead',
          'BDM',
          'HR',
          'HOD',
          'Admin'
        ]) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/allUsers' ? 'active' : ''} `}
              data-bs-toggle='slide'
           
              href={'/allUsers'}
            >
              <i className='side-menu__icon bx bx-video'></i>
              <span className='side-menu__label'>All Users</span>
            </Link>
          </li>
        )}

        {compairRole([
          'Project Manager',
          'Employee',
          'Team Lead',
          'BDM',
          'HR',
          'HOD',
        ]) && (
          <li className='sub-category'>
            <h3>General</h3>
          </li>
        )}
        {compairRole([
          'Project Manager',
          'Employee',
          'Team Lead',
          'BDM',
          'HR',
          'HOD',
        ]) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/profile' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/profile'
            >
              <i className='side-menu__icon bx bx-user-circle'></i>
              <span className='side-menu__label'>My profile</span>
            </Link>
          </li>
        )}
        {compairRole([
          'Project Manager',
          'Employee',
          'Team Lead',
          'BDM',
          'HOD',
        ]) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/checklist' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/checklist'
            >
              <i className='side-menu__icon bx bx-filter'></i>
              <span className='side-menu__label'>QA Checklist</span>
            </Link>
          </li>
        )}
        {compairRole([
          'Project Manager',
          'Employee',
          'Team Lead',
          'BDM',
          'HOD',
        ]) && (
          <li className='slide'>
            <Link
              className={`side-menu__item has-link ${pathName == '/helpvideos' ? 'active' : ''} `}
              data-bs-toggle='slide'
              href='/helpvideos'
            >
              <i className='side-menu__icon bx bx-video'></i>
              <span className='side-menu__label'>Help Videos</span>
            </Link>
          </li>
        )}

        {compairRole(['Project Manager', 'HOD']) && <SideBarSettings />}
      </ul>
      <div className='slide-right' id='slide-right'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='#7b8191'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z' />
        </svg>
      </div>
    </div>
  );
};
export default SideBarMenu;
