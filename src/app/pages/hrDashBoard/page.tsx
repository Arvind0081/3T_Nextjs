import React from 'react';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';

import {
    departments,
    managerList,
    teamListByDepartment,
} from '@/utils/publicApi';
import { DepartmentModel, HRPayLoad } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

const HRDashBoard = async ({ searchParams }: any) => {
    let departmentID = searchParams?.departmentId ?? 1;
    let managerId = searchParams?.managerId ?? '';

   

    let dashboardList: any;
    let departmentData: DepartmentModel[] = [];
    let getManagerList: any;

    const hrReq: HRPayLoad = {
        departmentId: Number(departmentID),
        teamAdminId: managerId ?? '',
    };
    try {
        dashboardList = await teamListByDepartment(hrReq);
       

    } catch (error) {}
    try {
        departmentData = await departments();
   

    } catch (error) {}
    try {
        getManagerList = await managerList(departmentID);

    } catch (error: any) {}

    const getDesignationNameClass = (designation: string) => {
        switch (designation) {
            case 'Trainee':
                return 'Trainee_color';
            case 'Team Leader':
                return 'TeamLead_color';
            case 'Software Engineer':
                return 'SoftwareEng_color';
            case 'Jr. Software Engineer':
                return 'JrEng_color';
            case 'Sr. Software Engineer':
                return 'SrEngbg_color';
            // Add other designations as needed
            default:
                return 'Other_color';
        }
    };
    return (
        <div className="page">
            <div className="page-main">
                <Header getManagerList={getManagerList} departmentData={departmentData} />
                <SideNav />
            </div>
            <div className="main-content app-content mt-0">
                <div className="side-app">
                    <div className="main-container container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                                <div className="card overflow-hidden form_card top_card">
                                    <div className="card-body justify-content-between align-items-center d-flex  flex-wrap">
                                        <div className="filter-left d-flex gap-x-2">
                                          
                                        </div>

                                        <div className="team_colorBox">
                                            <ul>
                                                <li>
                                                    <span className="TeamLeadbg_color box"></span>
                                                    Team Lead
                                                </li>
                                                <li>
                                                    <span className="SoftwareEngbg_color box"></span>
                                                    Software Engineer
                                                </li>
                                                <li>
                                                    <span className="SrEngbg_color box"></span>
                                                    Sr. Senior Engineer
                                                </li>
                                                <li>
                                                    <span className="JrEngbg_color box"></span>
                                                    Jr. Software Engineer
                                                </li>
                                                <li>
                                                    <span className="Traineebg_color box"></span>
                                                    Trainee/Stipend
                                                </li>
                                                <li>
                                                    <span className="Otherbg_color box"></span>
                                                    Others
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="employee_list">
                                    {dashboardList != undefined ? (
                                        dashboardList?.map((team: any) => (
                                            <div
                                                className="card employee-card"
                                                key={team.teamLeadId}
                                            >
                                                <div className="card-header flex-column">
                                                    <div className="d-flex justify-content-between w-100">
                                                        <h4 className="card-title number-font fs-15">
                                                            {team.teamLeadName}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="custm_progress ">
                                                    <div className="progress progress-xs">
                                                        <div
                                                            className="progress-bar bg-success"
                                                            style={{
                                                                width: '65%',
                                                            }}
                                                        ></div>
                                                        <div
                                                            className="progress-bar bg-danger"
                                                            style={{
                                                                width: '35%',
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <ul className="list-unstyled crm-top-deals mb-0">
                                                        {team?.teamLeadId && (
                                                            <li
                                                                key={
                                                                    team.teamLeadId
                                                                }
                                                            >
                                                                <div className="d-flex align-items-center flex-wrap">
                                                                    <div className="profile_image_outer">
                                                                        {team?.profileImage ? (
                                                                            <Image
                                                                                src={`https://3t-api.csdevhub.com/images/${team?.profileImage}`}
                                                                                className="w-100 h-100 object-cover position-top rounded-pill "
                                                                                width={
                                                                                    20
                                                                                }
                                                                                height={
                                                                                    20
                                                                                }
                                                                                alt="logo"
                                                                            />
                                                                        ) : (
                                                                            <span className="avatar avatar-sm me-2 avatar-rounded">
                                                                                <span
                                                                                    style={{
                                                                                        fontSize:
                                                                                            '20px',
                                                                                        color: '#00000059',
                                                                                        textTransform:
                                                                                            'uppercase',
                                                                                        padding:
                                                                                            '19%',
                                                                                    }}
                                                                                >
                                                                                    {team.teamLeadName.substring(
                                                                                        0,
                                                                                        1
                                                                                    )}
                                                                                </span>
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-fill">
                                                                        <Link
                                                                            href={`/employees/${team.teamLeadId}`}
                                                                            className="fw-semibold mb-0 fs-13 TeamLead_color"
                                                                        >
                                                                            {
                                                                                team.teamLeadName
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )}
                                                        {team.employees.map(
                                                            (employee: any) => (
                                                                <li
                                                                    key={
                                                                        employee.employeeId
                                                                    }
                                                                >
                                                                    {employee.employeeName && (
                                                                        <div className="d-flex align-items-center flex-wrap">
                                                                            <div className="profile_image_outer">
                                                                                {employee.profileImage ? (
                                                                                    <Image
                                                                                        src={`https://3t-api.csdevhub.com/images/${employee.profileImage}`}
                                                                                        className="w-100 h-100 object-cover position-top rounded-pill "
                                                                                        width={
                                                                                            20
                                                                                        }
                                                                                        height={
                                                                                            20
                                                                                        }
                                                                                        alt="logo"
                                                                                    />
                                                                                ) : (
                                                                                    <span className="avatar avatar-sm me-2 avatar-rounded">
                                                                                        <span
                                                                                            style={{
                                                                                                fontSize:
                                                                                                    '20px',
                                                                                                color: '#00000059',
                                                                                                textTransform:
                                                                                                    'uppercase',
                                                                                                padding:
                                                                                                    '19%',
                                                                                            }}
                                                                                        >
                                                                                            {team.teamLeadName.substring(
                                                                                                0,
                                                                                                1
                                                                                            )}
                                                                                        </span>
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <div className="flex-fill">
                                                                                <Link
                                                                                    href={`/employees/${employee.employeeId}`}
                                                                                    className={`fw-semibold mb-0 fs-13 ${getDesignationNameClass(employee.designation)}`}
                                                                                >
                                                                                    {
                                                                                        employee.employeeName
                                                                                    }
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                marginLeft: '38%',
                                                marginTop: '3%',
                                            }}
                                        >
                                            <p>No record found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRDashBoard;