'use client';
import React, { useState } from 'react';
import WorkHandDateFilter from './workInHandDateFilter';
import WorkModuleStatusDropdown from './workModuleStatusDropdown';
import Link from 'next/link';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
type WorkInHandProps = {
  workInHandRes: any;
  projectModuleStatus: any;
  departmentId: string;
};

const WorkInHand = ({
  workInHandRes,
  projectModuleStatus,
  departmentId,
}: WorkInHandProps) => {
  const numberToTimeConversion = (decimalTime: number) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const calculateTotals = (modules: any[]) => {
    let totalApprovedHours = 0;
    let totalBilledHours = 0;
    let totalLeftHours = 0;

    modules.forEach((moduleItem: any) => {
      totalApprovedHours += moduleItem.approvedHours || 0;
      totalBilledHours += moduleItem.billedHours || 0;
      totalLeftHours += moduleItem.leftHours || 0;
    });

    return {
      totalApprovedHours,
      totalBilledHours,
      totalLeftHours,
    };
  };

  const groupedByProject = (workInHandRes?.model || []).reduce(
    (acc: any, item: any) => {
      item.modules.forEach((moduleItem: any) => {
        if (!acc[moduleItem.projectName]) {
          acc[moduleItem.projectName] = [];
        }
        acc[moduleItem.projectName].push(moduleItem);
      });
      return acc;
    },
    {}
  );

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    const sortedData = [...workInHandRes.model].sort((a, b) => {
      const aValue = key.split('.').reduce((obj, k) => obj?.[k], a);
      const bValue = key.split('.').reduce((obj, k) => obj?.[k], b);
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    workInHandRes.model = sortedData;
  };

  return (
    <div id='WorkProgression' role='tabpanel'>
      <div className='card custom-card team_card'>
        <div className='card-header justify-content-between awards_card_header'>
          <div className='card-title'>Work In Hand Report</div>
          <WorkHandDateFilter />
        </div>
        <div className='card-body'>
          <div className='table-responsive theme_table'>
            <table className='table text-nowrap table-hover border table-bordered workInHand_table'>
              <thead>
                <tr>
                  <th onClick={() => handleSort('projectName')}>
                    Project Name{' '}
                    {sortConfig?.key === 'projectName' ? (
                      sortConfig.direction === 'asc' ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </th>
                  <th scope='col' className='module-width'>
                    Module
                  </th>
                  <th scope='col'>Deadline Date</th>
                  <th scope='col'>Approved Hours</th>
                  <th scope='col'>Billed Hours</th>
                  <th scope='col'>Left Hours</th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedByProject).length > 0 &&
                  Object.keys(groupedByProject).map((projectName) => {
                    const modules = groupedByProject[projectName];
                    const {
                      totalApprovedHours,
                      totalBilledHours,
                      totalLeftHours,
                    } = calculateTotals(modules);

                    return (
                      <>
                        {modules.map(
                          (moduleItem: any, moduleItemIndex: number) => (
                            <tr
                              key={`${projectName}-${moduleItemIndex}`}
                              className={
                                moduleItemIndex === 0 ||
                                moduleItem.projectName !==
                                  modules[moduleItemIndex - 1]?.projectName
                                  ? 'mainuser'
                                  : ''
                              }
                            >
                              <Link
                                href={`/projects/${moduleItem.projectId}`}
                                className='btn-link'
                              >
                                {moduleItemIndex === 0 ? projectName : ''}
                              </Link>

                              <td>{moduleItem.moduleName}</td>
                              <td>{moduleItem.deadlineDate}</td>
                              <td className='text-success'>
                                {numberToTimeConversion(
                                  moduleItem.approvedHours || 0
                                )}
                              </td>
                              <td className='text-success text-bold'>
                                <b>
                                  {numberToTimeConversion(
                                    moduleItem.billedHours || 0
                                  )}
                                </b>
                              </td>
                              <td className='text-danger'>
                                {numberToTimeConversion(
                                  moduleItem.leftHours || 0
                                )}
                              </td>
                              <td>
                                <WorkModuleStatusDropdown
                                  projectModuleStatus={projectModuleStatus}
                                  departmentId={departmentId}
                                  selectedStatus={moduleItem.moduleStatus}
                                  moduleId={moduleItem.moduleId}
                                />
                              </td>
                            </tr>
                          )
                        )}
                        <tr className='total_hours' style={{ fontSize: 10 }}>
                          <td colSpan={3}>Total Hours</td>
                          <td>{numberToTimeConversion(totalApprovedHours)}</td>
                          <td className='text-success text-bold'>
                            <b>{numberToTimeConversion(totalBilledHours)}</b>
                          </td>
                          <td className='text-danger'>
                            <b>{numberToTimeConversion(totalLeftHours)}</b>
                          </td>
                          <td></td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkInHand;
