import React from "react";
import Header from "@/components/common/Header/header";
import SideNav from "@/components/common/SideBar/sidebar";
import getUser from "@/utils/getUserServerSide";
import {
  departments,
  managerList,
  teamListByDepartment,
} from "@/utils/publicApi";
import { DepartmentModel, HRPayLoad } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

// Helper function to calculate total experience in months
const calculateTotalExperience = (
  joiningDate: string | null,
  experienceOnJoining: number | null
): number => {
  if (!joiningDate && !experienceOnJoining) return 0;

  let totalMonths = 0;

  if (joiningDate) {
    const joiningDateObj = new Date(joiningDate);
    const currentDate = new Date();
    const monthsFromJoining =
      (currentDate.getFullYear() - joiningDateObj.getFullYear()) * 12 +
      (currentDate.getMonth() - joiningDateObj.getMonth());

    totalMonths += monthsFromJoining;
  }

  if (experienceOnJoining) {
    totalMonths += experienceOnJoining;
  }

  return totalMonths;
};

// Helper function to assign CSS class based on experience
const getDesignationNameClass = (months: number): string => {
  switch (true) {
    case months >= 0 && months < 6:
      return "OtherColor";
    case months >= 6 && months < 24:
      return "traineerColor";
    case months >= 24 && months < 48:
      return "Two_fourColor";
    case months >= 48 && months < 72:
      return "four_sixColor";
    case months >= 72 && months < 96:
      return "six_eightColor";
    case months >= 96 && months < 120:
      return "Eight_tenColor";
    case months >= 120:
      return "tenYear_Color";
    default:
      return "OtherColor";
  }
};

const HRDashBoard = async ({ searchParams }: any) => {
  const user: any = getUser();
  let departmentID: string =
    searchParams.departmentId === "null" ||
    searchParams.departmentId === "" ||
    searchParams.departmentId === undefined ||
    searchParams.departmentId === "undefined"
      ? ""
      : searchParams.departmentId;
  let teamAdminId: string =
    searchParams.teamAdminId === "null" ||
    searchParams.teamAdminId === "" ||
    searchParams.teamAdminId === undefined ||
    searchParams.teamAdminId === "undefined"
      ? ""
      : searchParams.teamAdminId;

  let dashboardList: any;
  let departmentData: DepartmentModel[] = [];
  let getManagerList: any;

  const hrReq: HRPayLoad = {
    departmentId:
      user.role === "Admin" ? Number(departmentID) : Number(departmentID),
    teamAdminId: teamAdminId,
  };
  try {
    dashboardList = await teamListByDepartment(hrReq);
  } catch (error) {}
  try {
    departmentData = await departments();
  } catch (error) {}
  try {
    getManagerList = await managerList(Number(departmentID));
  } catch (error: any) {}

  return (
    <div className="page">
      <div className="page-main">
        <Header
          getManagerList={getManagerList}
          departmentData={departmentData}
        />
        <SideNav />
      </div>
      <div className="main-content app-content mt-0">
        <div className="side-app">
          <div className="main-container container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                <div className="card overflow-hidden form_card top_card">
                  <div className="card-body justify-content-between align-items-center d-flex flex-wrap">
                    <div className="team_colorBox">
                      <ul>
                        <li>
                          <span className="tenYear_bgColor box"></span>10+ years
                        </li>
                        <li>
                          <span className="Eight_tenbgColor box"></span>8-10
                          years
                        </li>
                        <li>
                          <span className="six_eightbgColor box"></span>6-8
                          years
                        </li>
                        <li>
                          <span className="four_sixbgColor box"></span>4-6 years
                        </li>
                        <li>
                          <span className="Two_fourbgColor box"></span>2-4 years
                        </li>
                        <li>
                          <span className="traineerbgColor box"></span>0.6-2
                          years
                        </li>
                        <li>
                          <span className="OtherbgColor box"></span>0-6 months
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
                      <div className="card employee-card" key={team.teamLeadId}>
                        <div className="card-header flex-column">
                          <div className="d-flex justify-content-between w-100">
                            <h4 className="card-title number-font fs-15">
                              {team.teamLeadName}
                            </h4>
                          </div>
                        </div>
                       
                        <div className="card-body">
                          <ul className="list-unstyled crm-top-deals mb-0">
                            {team?.teamLeadId && (
                              <li key={team.teamLeadId}>
                                <div className="d-flex align-items-center flex-wrap">
                                  <div className="profile_image_outer">
                                    {team?.profileImage ? (
                                      <Image
                                        src={`https://3t-api.csdevhub.com/images/${team?.profileImage}`}
                                        className="w-100 h-100 object-cover position-top rounded-pill"
                                        width={20}
                                        height={20}
                                        alt="logo"
                                      />
                                    ) : (
                                      <span className="avatar avatar-sm me-2 avatar-rounded">
                                        <span
                                          style={{
                                            fontSize: "20px",
                                            color: "#00000059",
                                            textTransform: "uppercase",
                                            padding: "19%",
                                          }}
                                        >
                                          {team.teamLeadName.substring(0, 1)}
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex-fill">
                                 
                                    {(() => {
                                      const totalExperience =
                                        calculateTotalExperience(
                                          team.joiningDate,
                                          team.experienceOnJoining 
                                        );
                                      const className =
                                        getDesignationNameClass(
                                          totalExperience
                                        );
                                      return (
                                        <Link
                                          href={`/employees/${team.teamLeadId}`}
                                          className={`fw-semibold mb-0 fs-13 ${className}`}
                                        >
                                          {team.teamLeadName}
                                        </Link>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </li>
                            )}

                            {team.employees.map((employee: any) => {
                              const totalExperience = calculateTotalExperience(
                                employee.joiningDate,
                                employee.experienceOnJoining
                              );

                              const className =
                                getDesignationNameClass(totalExperience);

                              return (
                                <li key={employee.employeeId}>
                                  <div className="d-flex align-items-center flex-wrap">
                                    <div className="profile_image_outer">
                                      {employee.profileImage ? (
                                        <Image
                                          src={`https://3t-api.csdevhub.com/images/${employee.profileImage}`}
                                          className="w-100 h-100 object-cover position-top rounded-pill"
                                          width={20}
                                          height={20}
                                          alt="logo"
                                        />
                                      ) : (
                                        <span className="avatar avatar-sm me-2 avatar-rounded">
                                          <span
                                            style={{
                                              fontSize: "20px",
                                              color: "#00000059",
                                              textTransform: "uppercase",
                                              padding: "19%",
                                            }}
                                          >
                                            {employee.employeeName.substring(
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
                                        className={`fw-semibold mb-0 fs-13 ${className}`}
                                      >
                                        {employee.employeeName}
                                      </Link>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        marginLeft: "38%",
                        marginTop: "3%",
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
