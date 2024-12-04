'use client'
import React,{useState} from 'react';
import Notes from '@/components/projects/notesButton';
import ProjectStatusDropdown from '@/components/projects/changeProjectStatusDropdown';
import DeleteProjectButton from '@/components/projects/deleteProjectButton';
import EditProjectButton from '@/components/projects/editProjectButton';
import UploadFiles from '@/components/projects/uploadProjectFiles';
import DownloadFiles from '@/components/projects/downloadProjectFiles';
import Link from 'next/link';
import { format } from 'date-fns';
import {useRouter,usePathname} from 'next/navigation';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const ProjectTable=({allProjects,billingType,hiringType,projectStatusData,clientList,data,applicationDomain,technologies}:any)=>{

    const router=useRouter();
    const url=usePathname();

    const [sortConfig, setSortConfig] = useState({
        key: data.sortColumn || '',
        direction: data.sortOrder || 'asc',
      });
    
      const handleSort = (key: string) => { 
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        setSortConfig({ key, direction });
    
        return router.push(`${url}/?page=${data.pageNumber}&size=${data.pageSize}&status=${data.projectStatus}&search=${data.searchValue}&startDate=${data.startDate}&endDate=${data.endDate}&hiringStatus=${data.hiringStatus}&bilingType=${data.bilingType}&teamAdminId=${data.teamAdminId}&sortColumn=${key}&sortOrder=${direction}`);
   
      };

    return(
        <div className='table-responsive theme_table'>
                                                    <table className='table text-nowrap table-hover border table-bordered'>
                                                        <thead>
                                                            <tr>
                                                                <th scope='col'  onClick={() => handleSort('id')}>
                                                                    Project Id
                                                                    {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? (<FaSortDown />) : (<FaSortUp />)) : (<FaSort />)}
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='project-width'
                                                                    onClick={() => handleSort('name')}
                                                                >
                                                                    Project Name
                                                                    {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? (<FaSortDown />) : (<FaSortUp />)) : (<FaSort />)}
                                                                </th>
                                                                <th scope='col'   onClick={() => handleSort('description')}>
                                                                    Description
                                                                    {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? (<FaSortDown />) : (<FaSortUp />)) : (<FaSort />)}
                                                                </th>
                                                                <th scope='col'   onClick={() => handleSort('clientName')}>
                                                                    Client Name
                                                                    {sortConfig.key === 'clientName' ? (sortConfig.direction === 'asc' ? (<FaSortDown />) : (<FaSortUp />)) : (<FaSort />)}
                                                                </th>
                                                                <th scope='col'  onClick={() => handleSort('notes')}>
                                                                    Notes
                                                                    {sortConfig.key === 'notes' ? (sortConfig.direction === 'asc' ? (<FaSortDown />) : (<FaSortUp />)) : (<FaSort />)}
                                                                 </th>
                                                                <th scope='col'   onClick={() => handleSort('createdTime')}>
                                                                    Created Date
                                                                    {sortConfig.key === 'createdTime' ? (sortConfig.direction === 'asc' ? (<FaSortDown />) : (<FaSortUp />)) : (<FaSort />)}
                                                                </th>
                                                                <th scope='col'  >
                                                                Billing Type
                                                                </th>
                                                                <th scope='col' >
                                                                Hiring Status
                                                                </th>
                                                                <th scope='col'>
                                                                    Docs
                                                                </th>
                                                                <th scope='col'>
                                                                    Actions
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='w200'
                                                                >
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allProjects.map(
                                                                (project:any) => (
                                                                    <tr key={project.id}>
                                                                        <td className='text-nowrap'>
                                                                            {
                                                                                project.id
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <Link
                                                                                href={`/projects/${project.id}`}
                                                                                className='btn-link text-normal'
                                                                            >
                                                                                {
                                                                                    project.name
                                                                                }
                                                                            </Link>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                project.description
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                project.clientName
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                           <Notes id={project.id} />
                                                                        </td>
                                                                        <td>
                                                                           {format(new Date(project.createdTime), 'yyyy-MM-dd')}
                                                                        </td>
                                                                        <td>
                                                                           {billingType?.filter((item: { value: number; })=>item.value==project.isBilling)[0]?.text}
                                                                        </td>
                                                                        <td>
                                                                           {hiringType?.filter((item: { value: number; })=>item.value==project.hiringStatus)[0]?.text}
                                                                        </td>
                                                                        <td>
                                                                            <div className='align-items-start d-flex fs-15 gap-2'>
                                                                               <UploadFiles id={project.id}/>
                                                                               <DownloadFiles id={project.id} />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className='align-items-start d-flex fs-15 gap-2'>
                                                                               <EditProjectButton id={ project.id}  projectStatusData={projectStatusData} hiringType={hiringType} billingType={billingType} clientList={clientList} applicationDomain={applicationDomain} technologies={technologies}/>
                                                                               <DeleteProjectButton id={project.id} />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            {' '}
                                                                           <ProjectStatusDropdown id={project.id} projectStatusData={projectStatusData} projectStatus={project.projectStatus}/>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                            
                                                        </tbody>
                                                    </table>
                                                </div>

    )
}

export default ProjectTable;
