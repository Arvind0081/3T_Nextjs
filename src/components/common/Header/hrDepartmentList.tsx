'use client';
import Department from '@/components/hrDashBoard/departmentDropdown';
import { usePathname } from 'next/navigation';

const HRDepartmentList = ({ getDepartment, getManagerList, param }: any) => {
  const url = usePathname();

  const isValidUrl = [
    '/hrEmployeesBoard',
    '/hrReports',
    '/hrDashBoard',
    '/dashBoard',
    '/reports',
    '/employees',
    '/projects',
    '/upworkprofile',
    '/managerToDo',
    '/assignTeam',
    '/clients',
    '/invoices',
    '/allUsers',
    '/assignBadge'
  ].includes(url);

  return (
    <>
      {isValidUrl && (
        <Department
          getDepartment={getDepartment}
          getManagerList={url === '/upworkprofile' ? null : getManagerList} // Disable manager dropdown for `/upworkprofile`
          param={param}
          isUpworkProfile={url === '/upworkprofile' || url === '/clients' || url ==='/invoices' || url==='/allUsers' || url==='/assignBadge'} // Pass a flag for `/upworkprofile`
        />
      )}
    </> 
  );
};

export default HRDepartmentList;
