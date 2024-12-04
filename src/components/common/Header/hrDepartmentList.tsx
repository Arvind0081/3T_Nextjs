'use client';
import Department from '@/components/hrDashBoard/departmentDropdown';
import { usePathname } from 'next/navigation';
const HRDepartmentList = ({ getDepartment, getManagerList,param }: any) => {
  const url = usePathname();
  const isValidUrl =
    url == '/hrEmployeesBoard'
      ? true
      : url == '/hrReports'
        ? true
        : url == '/hrDashBoard'
          ? true
            : url == '/dashBoard'
              ? true
              : false;

  return (
    <>
      {isValidUrl && (
        <Department
          getDepartment={getDepartment}
          getManagerList={getManagerList}
          param={param}
        />
      )}
    </>
  );
};
export default HRDepartmentList;
