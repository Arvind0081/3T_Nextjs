"use client";
import React, { useState, useEffect } from "react";
import AddStatusButton from "@/components/myStatus/addStatusButton";
import Link from "next/link";
import Image from "next/image";
import PerformanceChart from "./performanceChart";
import { useRouter } from "next/navigation";
import { addToDoList } from "@/utils/publicApi";
import { AddToDoPayloadModel } from "@/utils/types";
import { Modal } from "react-bootstrap";
import { format } from "date-fns";
import SixMonthProductivity from "./employeeProductivitygraph";

const Dashboard = ({
  dashboardList,
  empProjectList,
  empProfileList,
  user,
  assignedTask,
  bioMetricAttendance,
  dateStr,
  productivityPercentage,
  profileDetails,
}: any) => {
  const [currentMonth, setCurrentMonth] = useState("");
  const router = useRouter();
  const [toDo, setToDo] = useState(assignedTask);
  const [show, setShow] = useState(false);
  const [bioMetric, setBioMetric] = useState<any>({});

  useEffect(() => {
    setCurrentMonth(dateStr);
  }, [dateStr]);

  const handleMonthChange = (e: any) => {
  
    const month = e.target.value;
    setCurrentMonth(month);
    router.push(`/employeeDashBoard?month=${month}`);
  };

  const handleToDoList = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    setToDo(e.target.value);
    const payload: AddToDoPayloadModel = {
      toDo: e.target.value,
      assignedToId: id,
    };

    await addToDoList(payload);
  };

  const badgeCounts = dashboardList?.employeeBadges?.reduce(
    (acc: any, badge: any) => {
      const key = badge.badgeImage; // Use badgeImage as the key
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

  const uniqueBadges = Array.from(
    new Set(
      dashboardList?.employeeBadges?.map((badge: any) => badge.badgeImage)
    )
  ).map((badgeImage: any) => ({
    badgeImage,
    count: badgeCounts[badgeImage],
  }));

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  };

  const extractTime = (time: string) => {
    const date = new Date(time);
    // Extract the time in HH:MM format
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleBiometric = (biometricObj: any) => {
    setShow(true);
    setBioMetric(biometricObj);
  };

  const handleClose = () => {
    setShow(false);
  };

  const dateFormat = (dateString: string) => {
    if (dateString) {
      return format(dateString, "yyyy-MM-dd");
    }
  };

  const convertMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    // Pad the hours and minutes with leading zeros if necessary
    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(mins).padStart(2, "0");
    return `${paddedHours}:${paddedMinutes}`;
  };

  const dateTimeFormat = (dateTimeString: string) => {
    const date = new Date(dateTimeString);

    // Format the date as YYYY-MM-DD
    const formattedDate = date.toLocaleDateString("en-CA"); // 'en-CA' gives 'YYYY-MM-DD' format

    // Format the time as HH:MM AM/PM
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Combine date and time
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="main-content app-content mt-0">
      <div className="side-app">
        <div className="main-container container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="card overflow-hidden form_card top_card">
                <div className="card-body justify-content-between align-items-center d-flex flex-wrap">
                  <div className="filter-left">
                    <div className="selectbox">
                      <p className="fw-semibold mb-2">Select Month</p>
                      <div className="input-group">
                        <input
                          type="month"
                          className="form-control"
                          value={currentMonth}
                          onChange={handleMonthChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="btn-list mt-md-0 mt-2 filter-right">
                    <AddStatusButton
                      projectsListFromDb={empProjectList}
                      upwokProfileListFromDb={empProfileList}
                      profileDetails={profileDetails}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card custom-card team_card">
                <div className="card-header justify-content-between awards_card_header">
                  <div className="card-title">
                    Attendance For{" "}
                    {new Date(currentMonth).toLocaleString("default", {
                      month: "long",
                    })}
                  </div>
                  <div className="dashboard-awards top_card_awards mb-4">
                    {uniqueBadges.map((badge, index) => (
                      <div key={index} className="mr-3 relative">
                        <Image
                          src={`data:image/png;base64,${badge.badgeImage}`} // Ensure the correct MIME type (png or jpeg)
                          width={150}
                          height={150}
                          alt={`award_${index}`}
                        />
                        {badge.count > 1 && (
                          <div className="absolute top-[-8px] right-[-6px] bg-red-600 text-white text-xs px-1 py-0.9 rounded">
                            {badge.count}
                          </div>
                        )}
                      </div>
                    ))}
                    {/* <Link className="header-brand1" href="/profile">
                      View All
                    </Link> */}
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive attendance_table">
                    <table className="border-primary hours-table table table-bordered text-nowrap attendance_layout">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          {dashboardList?.attendanceList?.map(
                            (_: any, index: number) => (
                              <th scope="col" key={index + 1}>
                                {index + 1}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{user.unique_name}</th>
                          {dashboardList?.attendanceList?.map(
                            (attendance: any, index: number) => (
                              <td key={index} className="present">
                                {attendance.attendanceStatus ? (
                                  <div className="attendance_status_info">
                                    <div
                                      className={`attendance_status Present_status ${
                                        attendance.attendanceStatus === "Ab"
                                          ? "red"
                                          : ""
                                      }`}
                                    >
                                      {attendance.attendanceStatus}
                                    </div>
                                    {attendance.attendanceStatus !== "H" && (
                                      <div className="_BM_attendance">
                                        <div className="attendance_status_3t">
                                          <span className="threeT_info">
                                            3t
                                          </span>
                                          <span className="threeT__attendance">
                                            {attendance.attendanceStatus}
                                          </span>
                                          <span className="threeT-time">
                                            {attendance.attendanceStatus !==
                                            "--"
                                              ? numberToTimeConversion(
                                                  attendance.dayHours
                                                )
                                              : ""}
                                          </span>
                                        </div>
                                        <div
                                          className="attendance_status_bm bg-white"
                                          onClick={(e) => {
                                            bioMetricAttendance[index]?.inTime
                                              ? handleBiometric(
                                                  bioMetricAttendance[index]
                                                )
                                              : e.preventDefault();
                                          }}
                                        >
                                          <span className="BM_info">BM</span>
                                          <span className="BM__attendance bg-white">
                                            {bioMetricAttendance[index]
                                              ?.statusCode === "A"
                                              ? "Ab"
                                              : bioMetricAttendance[index]
                                                  ?.statusCode}
                                          </span>
                                          <span className="threeT-time">
                                            {bioMetricAttendance[index]
                                              ?.inTime ? (
                                              <span>
                                                {convertMinutesToTime(
                                                  bioMetricAttendance[index]
                                                    ?.duration
                                                )}
                                              </span>
                                            ) : (
                                              "--"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  // Show -- when attendanceStatus is null
                                  <div className="attendance_status_info">
                                    <div className="attendance_status Present_status">
                                      --
                                    </div>
                                  </div>
                                )}
                              </td>
                            )
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6">
              <div className="card custom-card">
                <div className="card-header justify-content-between">
                  <div className="card-title">
                    Your{" "}
                    {new Date(currentMonth).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    Month Performance Chart
                  </div>
                </div>
                <PerformanceChart dashboardList={dashboardList} />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card custom-card team_card">
                    <div className="card-header justify-content-between">
                      <div className="card-title">To do`s </div>
                    </div>
                    <div className="card-body">
                      <textarea
                        onBlur={(e) => handleToDoList(e, user.id)}
                        placeholder="To-Do`s"
                        className="form-control h100 resize-none"
                      >
                        {toDo}
                      </textarea>
                    </div>
                  </div>

                  <div className="card custom-card team_card">
                    <div className="card-header justify-content-between">
                      <div className="card-title">My Showcase Projects</div>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0 showcase-project-list">
                        {dashboardList?.userProjects?.map(
                          (project: any, index: number) => (
                            <li className="warning" key={index}>
                              {project.name}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card custom-card team_card">
                    <div className="card-header justify-content-between">
                      <div className="card-title">
                        Last 6 Months Productivity{" "}
                      </div>
                    </div>
                    <div className="card-body">
                      <SixMonthProductivity value={productivityPercentage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal show={show} backdrop="static" onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Biometric Detail</Modal.Title>
              <button
                aria-label="Close"
                className="btn-close position-absolute"
                data-bs-dismiss="modal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body>
              <div className="BM_attendance_modalcontent">
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Employee Name:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{user.unique_name}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Employee Number:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{bioMetric?.employeeCode}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Attendance Date:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{dateFormat(bioMetric?.attendanceDate)}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Status Code:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{bioMetric?.statusCode}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Duration:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{bioMetric?.duration}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Duration Time:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{convertMinutesToTime(bioMetric?.duration)}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>In Time:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{dateTimeFormat(bioMetric?.inTime)}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Out Time:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{dateTimeFormat(bioMetric?.outTime)}</p>
                  </div>
                </div>
                <div className="mainflex_box">
                  <div className="leftBox">
                    <p>
                      <strong>Punch Record:</strong>
                    </p>
                  </div>
                  <div className="rightBox">
                    <p>{bioMetric?.punchRecords}</p>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
