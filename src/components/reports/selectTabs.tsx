'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import getUser from '@/utils/getUserClientSide';

const SelectTabs = ({ activeTabName }: any) => {
  let user: any = getUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('Attendance Report');
  const setActiveName = activeTabName !== '' ? activeTabName : activeTab;

  if (searchParams.get('tab') == null) {
    setActiveTab('');
  }
  const teamAdminId = searchParams.get('teamAdminId');
  const departmentId = searchParams.get('departmentId');

  const switchTab = (e: any) => {
    const buttonText = e.target.innerText;
    setActiveTab(buttonText);
    if (user.role === 'HOD') {
      router.push(`/reports?tab=${buttonText}&teamAdminId=${teamAdminId}`);
    }

    if (user.role === 'Admin' || user.role === 'HR') {
      router.push(
        `/reports?tab=${buttonText}&departmentId=${departmentId}&teamAdminId=${teamAdminId}`
      );
    } else {
      router.push(`/reports?tab=${buttonText}`);
    }
  };

  return (
    <>
    <div className='custm-tabs'>
      <ul className='nav nav-tabs tab-style-1 d-sm-flex d-block mb-0' role='tablist'>
        {user.role === 'HR' ? (
          // HR Role Tabs
          <>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Attendance Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#AttendanceReport'
                aria-current='page'
                aria-selected={setActiveName === 'Attendance Report'}
                role='tab'
                onClick={switchTab}
              >
                Attendance Report
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Employees Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#EmployeesReport'
                aria-selected={setActiveName === 'Employees Report'}
                role='tab'
                onClick={switchTab}
              >
                Employees Report
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Monthly Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#MonthlyReport'
                aria-selected={setActiveName === 'Monthly Report'}
                role='tab'
                onClick={switchTab}
              >
                Monthly Report
              </button>
            </li>
          </>
        ) : (
          // Tabs for All Other Roles
          <>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Attendance Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#AttendanceReport'
                aria-current='page'
                aria-selected={setActiveName === 'Attendance Report'}
                role='tab'
                onClick={switchTab}
              >
                Attendance Report
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Project Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#ProjectReport'
                aria-selected={setActiveName === 'Project Report'}
                role='tab'
                onClick={switchTab}
              >
                Project Report
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Developer Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#DeveloperReport'
                aria-selected={setActiveName === 'Developer Report'}
                role='tab'
                onClick={switchTab}
              >
                Developer Report
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Employees Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#EmployeesReport'
                aria-selected={setActiveName === 'Employees Report'}
                role='tab'
                onClick={switchTab}
              >
                Employees Report
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Work In Hand' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#WorkProgression'
                aria-selected={setActiveName === 'Work In Hand'}
                role='tab'
                onClick={switchTab}
              >
                Work In Hand
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Payment Pending' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#PaymentPending'
                aria-selected={setActiveName === 'Payment Pending'}
                role='tab'
                onClick={switchTab}
              >
                Payment Pending
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Client Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#ClientReport'
                aria-selected={setActiveName === 'Client Report'}
                role='tab'
                onClick={switchTab}
              >
                Client Report
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${setActiveName === 'Full Report' ? 'active' : ''}`}
                data-bs-toggle='tab'
                data-bs-target='#FullReport'
                aria-selected={setActiveName === 'Full Report'}
                role='tab'
                onClick={switchTab}
              >
                Full Report
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  </>
  );
};

export default SelectTabs;
