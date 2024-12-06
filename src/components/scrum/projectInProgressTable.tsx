'use client'
import React, { useState,useEffect } from 'react';
import ProgressDetails from '@/components/scrum/progressDetails';
import ModuleDetailsButton from '@/components/scrum/ModuleDetailsButton';
import ScrumDateFilter from '@/components/dashboard/scrumDateFilter';
import Link from 'next/link';
import { ScrumTeamProjectsResponseModel } from '@/utils/types';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { scrumTeamProjects } from '@/utils/publicApi';
import {Pagination} from 'semantic-ui-react';

const ProgressInProjectTable = ({ payLoad }: any) => {

  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' |string}>({ key: '', direction: '' });
  const [teamProjects,setTeamProjects]=useState<ScrumTeamProjectsResponseModel[]>([]);
  const [pageNumber,setPageNumber]=useState(1);
  const pageSize=10;
  const state = {
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
};


const totalPages = () => {

  let totalPagesCount =teamProjects? teamProjects.length / pageSize:0;
  totalPagesCount = totalPagesCount % 1 === 0 ? totalPagesCount : Math.ceil(totalPagesCount);

  return totalPagesCount;
};

const handlePaginationChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,{ activePage }:any) =>{
 
  setPageNumber(activePage);

};  

  const fetchTeamProjects=async()=>{
    try {
      const response = await scrumTeamProjects(payLoad);
      setTeamProjects(response);
  } catch (error) {}
  };


  useEffect(()=>{
    fetchTeamProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[payLoad]);

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const totalOfProjectsUpworkHours = () => {
    return numberToTimeConversion(
      teamProjects
        .map((item: ScrumTeamProjectsResponseModel) => item.upworkHours)
        .reduce((a: number, b: number) => a + b, 0)
    );
  };

  const totalOfProjectsFixedHours = () => {
    return numberToTimeConversion(
      teamProjects
        .map((item: ScrumTeamProjectsResponseModel) => item.fixedHours)
        .reduce((a: number, b: number) => a + b, 0)
    );
  };

  const totalOfProjectsBilledHours = () => {
    return numberToTimeConversion(
      teamProjects
        .map((item: ScrumTeamProjectsResponseModel) => item.upworkHours + item.fixedHours)
        .reduce((a: number, b: number) => a + b, 0)
    );
  };

  const totalOfProjectsNonBilledHours = () => {
    return numberToTimeConversion(
      teamProjects
        .map((item: ScrumTeamProjectsResponseModel) => item.nonBillableHours)
        .reduce((a: number, b: number) => a + b, 0)
    );
  };

  // Sorting logic
  const sortedProjects = () => {
    if(teamProjects){

      let sortedData = [...teamProjects];
      const { key, direction } = sortConfig;
  
      if (key) {
        sortedData.sort((a:any, b:any) => {
          const aValue = a[key];
          const bValue = b[key];
  
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction === 'asc' ? aValue - bValue : bValue - aValue;
          } else if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
          return 0;
        });
      }
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return sortedData.slice(startIndex, endIndex)
     
    }
  
  };

 
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const startRecord = (pageNumber - 1) * pageSize + 1;
  const endRecord = Math.min(pageNumber * pageSize, teamProjects?.length);

  return (
    <div className="col-xl-9">
      <div className="card custom-card">
        <div className="card-header justify-content-between items-center">
          <div className="card-title">Project in Progress</div>
          <div className="filter-right d-flex gap-x-2">
            <ScrumDateFilter data={payLoad} />
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive theme_table">
            <table className="table text-nowrap table-hover border table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="project-width" onClick={() => requestSort('projectName')}>
                    Project Name  {sortConfig.key !== 'projectName'?<FaSort /> :(sortConfig.key === 'projectName' && sortConfig.direction === 'asc')?  <FaSortDown />  : <FaSortUp />  }
     
      
                  </th>
                  <th scope="col" onClick={() => requestSort('clientName')}>
                    Client Name {sortConfig.key !== 'clientName'?<FaSort /> :(sortConfig.key === 'clientName' && sortConfig.direction === 'asc')?   <FaSortDown />  : <FaSortUp /> }
                  </th>
                  <th scope="col" onClick={() => requestSort('upworkHours')}>
                    Upwork Hours {sortConfig.key !== 'upworkHours'?<FaSort /> :(sortConfig.key === 'upworkHours' && sortConfig.direction === 'asc')?   <FaSortDown />  : <FaSortUp /> }
                  </th>
                  <th scope="col" onClick={() => requestSort('fixedHours')}>
                    Fixed Billing Hours {sortConfig.key !== 'fixedHours'?<FaSort /> :(sortConfig.key === 'fixedHours' && sortConfig.direction === 'asc')?   <FaSortDown />  : <FaSortUp /> }
                  </th>
                  <th scope="col" onClick={() => requestSort('billedHours')}>
                    Billed Hours {sortConfig.key !== 'billedHours'?<FaSort /> :(sortConfig.key === 'billedHours' && sortConfig.direction === 'asc')?   <FaSortDown />  : <FaSortUp /> }
                  </th>
                  <th scope="col" onClick={() => requestSort('nonBillableHours')}>
                    Non Billable Hours {sortConfig.key !== 'nonBillableHours'?<FaSort /> :(sortConfig.key === 'nonBillableHours' && sortConfig.direction === 'asc')?   <FaSortDown />  : <FaSortUp /> }
                  </th>
                  <th scope="col">Details</th>
                  <th scope="col">Module Details</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects()?.map((project: ScrumTeamProjectsResponseModel) => (
                  <tr key={project.projectId}>
                    <td>
                      <Link href={`/projects/${project.projectId}`}>{project.projectName}</Link>
                    </td>
                    <td>{project.clientName}</td>
                    <td>{numberToTimeConversion(project.upworkHours)}</td>
                    <td>{numberToTimeConversion(project.fixedHours)}</td>
                    <td className="text-success text-bold">
                      <b>{numberToTimeConversion(project.upworkHours + project.fixedHours)}</b>
                    </td>
                    <td className="text-danger">{numberToTimeConversion(project.nonBillableHours)}</td>
                    <td>
                      <ProgressDetails id={project.projectId} payLoad={payLoad} />
                    </td>
                    <td>
                      <ModuleDetailsButton id={project.projectId} payLoad={payLoad} />
                    </td>
                  </tr>
                ))}
              </tbody>
              {teamProjects?.length > 0 && (
                <tfoot>
                  <tr>
                    <td className="text-bold">Total </td>
                    <td></td>
                    <td>{totalOfProjectsUpworkHours()}</td>
                    <td>{totalOfProjectsFixedHours()}</td>
                    <td className="text-success text-bold">
                      <b>{totalOfProjectsBilledHours()}</b>
                    </td>
                    <td className="text-danger">{totalOfProjectsNonBilledHours()}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              )}
            </table>
            {!teamProjects?.length && <p>No record found.</p>}
          </div>
        </div>
        {teamProjects?.length && <div className="card-footer">
          <div className="d-flex align-items-center">
            <div>   Showing {startRecord} to {endRecord} of {teamProjects?.length} Entries </div>
            <div className="ms-auto">
              {/* Pagination controls can be added here if needed */}
              <Pagination
            activePage={pageNumber}
            onPageChange={handlePaginationChange}
            size='mini'
            totalPages={totalPages()}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={state.showEllipsis ? undefined : null}
            firstItem={state.showFirstAndLastNav ? undefined : null}
            lastItem={state.showFirstAndLastNav ? undefined : null}
            prevItem={state.showPreviousAndNextNav ? undefined : null}
            nextItem={state.showPreviousAndNextNav ? undefined : null}
          />
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default ProgressInProjectTable;
