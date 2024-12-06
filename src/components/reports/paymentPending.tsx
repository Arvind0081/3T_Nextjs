'use client';
import { useState } from 'react';
import PaymentModuleStatusDropdown from './paymentModuleStatusDropdown';
import PaymentStatusDropdown from './paymentStatusDropdown';
import Link from 'next/link';
import PaymentDateFilter from './paymentDateFilter';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
const PaymentPending = ({
  departmentId,
  paymentPendingReports,
  projectModuleStatus,
  projectPaymentsStatus,
  billingTypeFilter,
  billingType,
  hiringStatus,
  projectsHiringFilters,
  // projectStatusFilter,
  param
}: any) => {
  const [selectedBillingType, setSelectedBillingType] = useState('');
  const [selectedHiringType, setSelectedHiringType] = useState('');
  const [selectedStatusType, setSelectedStatusType] = useState('');

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculateTotalUpworkHours = (data: any) => {
    return data?.modulesList.reduce(
      (teamTotal: any, employee: any) => teamTotal + employee.approvedHours,
      0
    );
  };

  const calculateTotalFixedHours = (data: any) => {
    return data?.modulesList.reduce(
      (teamTotal: any, employee: any) => teamTotal + employee.billingHours,
      0
    );
  };

  const totalUpworkHours = (data: any) => {
    return numberToTimeConversion(calculateTotalUpworkHours(data));
  };

  const totalFixedHours = (data: any) => {
    return numberToTimeConversion(calculateTotalFixedHours(data));
  };

  const handleBilllingFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
   
    setSelectedBillingType(event.target.value);
  };
  const handleHiringChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
   
    setSelectedHiringType(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
 
    const value = event.target.value;
    setSelectedStatusType(value);
  };

  const filteredReports = paymentPendingReports
  .map((item: any) => {
 
    const filteredModules = item.modulesList.filter((module: any) => {
      const matchesBillingType =
        selectedBillingType === '0' || !selectedBillingType
          ? true
          : module.billingType === Number(selectedBillingType);

      const matchesHiringType =
        selectedHiringType === '0' || !selectedHiringType
          ? true
          : module.hiringStatus === Number(selectedHiringType);

      const projectStatusType =
        !selectedStatusType || selectedStatusType === 'Module Status'
          ? true
          : module.moduleStatus === selectedStatusType;

      return matchesBillingType && matchesHiringType && projectStatusType;
    });

    if (filteredModules.length > 0) {
      return { ...item, modulesList: filteredModules };
    }

    return null;
  })
  .filter((item: any) => item !== null);




const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({ key: '', direction: null });

const handleSort = (key: string) => {
  let direction: 'asc' | 'desc' | null = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
    direction = null; // Reset sort
  }

  setSortConfig({ key, direction });
};

const sortedReports = [...filteredReports].sort((a: any, b: any) => {
  if (sortConfig.direction === null) return 0; // No sorting
  if (sortConfig.key === 'projectName') {
    const nameA = a.projectName.toLowerCase();
    const nameB = b.projectName.toLowerCase();
    if (nameA < nameB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (nameA > nameB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  }
  return 0;
});


  return (
    <div id='PaymentPending' role='tabpanel'>
      <div className='card custom-card team_card'>
        <div className='card-header justify-content-between awards_card_header'>
          <div className='card-title'>Payment Pending Report</div>
          <div className='filter-right d-flex gap-x-2'>
           
            <div className='selectbox open_selectBox'>
              <div>
                <select
                  className='form-control'
                  onChange={handleBilllingFilter}
                >
                  <option value='0'>Billing Types</option>
                  {billingTypeFilter?.map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='selectbox open_selectBox'>
              <div>
                <select className='form-control' onChange={handleHiringChange}>
                  <option value='0'>Hiring Status</option>
                  {projectsHiringFilters?.map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='selectbox open_selectBox'>
              <div>
                <select className='form-control' onChange={handleStatusChange}>
                  <option value='Module Status'>Module Status</option>
                  {projectModuleStatus?.map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <PaymentDateFilter  param={param}/>
          </div>
        </div>
        {sortedReports?.map((item: any, index: number) => (
          <div key={index} className='card-body'>
            <div className='table-responsive theme_table'>
              <table className='table text-nowrap table-hover border table-bordered'>
                <thead>
                  <tr>
                    <th onClick={() => handleSort('projectName')}>
                      Project Name{' '}
                      {sortConfig.key === 'projectName' ? (
                        sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                      ) : (
                        <FaSort />
                      )}
                    </th>
                    <th scope='col' className='module-width'>Module</th>
                    <th scope='col'>Billing Type</th>
                    <th scope='col'>Hiring Platform</th>
                    <th scope='col'>Deadline Date</th>
                    <th scope='col'>Approved Hours</th>
                    <th scope='col'>Billed Hours</th>
                    <th scope='col'>Module Status</th>
                    <th scope='col'>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {item.modulesList.map((moduleItem: any, moduleIndex: any) => (
                    <tr key={moduleIndex}>
                      <Link href={`/projects/${item.projectId}`} className='btn-link'>
                        {item.projectName}
                      </Link>
                      <td>{moduleItem.moduleName}</td>
                      <td>
                        {billingType.filter((billing: any) => billing.value === moduleItem.billingType).map((value: any) => (
                          <span key={value.text}>{value.text}</span>
                        ))}
                      </td>
                      <td>
                        {hiringStatus.filter((hiring: any) => hiring.value === moduleItem.hiringStatus).map((value: any) => (
                          <span key={value.text}>{value.text}</span>
                        ))}
                      </td>
                      <td>{moduleItem.deadlineDate}</td>
                      <td className='text-success'>{moduleItem.approvedHours}</td>
                      <td className='text-success text-bold'><b>{moduleItem.billingHours}</b></td>
                      <td>
                        <PaymentModuleStatusDropdown
                          projectModuleStatus={projectModuleStatus}
                          departmentId={departmentId}
                          selectedStatus={moduleItem.moduleStatus}
                          moduleId={moduleItem.moduleId}
                        />
                      </td>
                      <td>
                        <PaymentStatusDropdown
                          projectPaymentsStatus={projectPaymentsStatus}
                          departmentId={departmentId}
                          selectedStatus={moduleItem.paymentStatus}
                          moduleId={moduleItem.moduleId}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className='text-bold'>Total Hours</td>
                    <td></td>
                    <td></td>
                    <td>{totalUpworkHours(item)}</td>
                    <td className='text-success text-bold'><b>{totalFixedHours(item)}</b></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPending;
