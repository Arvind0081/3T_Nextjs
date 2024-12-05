'use client';
import React, { useState,useEffect } from 'react';
import DateFilter from '@/components/reports/attendanceDateFilter';
import ExportExcel from '@/components/hrReports/exportExcel';

import AttendanceReportPagination from '@/components/reports/attendanceReportPagination';
import { Modal} from 'react-bootstrap';
import { format } from 'date-fns';
import { finalAttendanceStatus,attendanceStatusClass} from '@/utils/finalAttendanceStatus'; 

const AttendanceReport = ({ attendanceReportList,param,bioMetricAttendance }: any) => {

  const [show,setShow]=useState(false);
  const [bioMetric,setBioMetric]=useState<any>({});
  const [individualEmp,setIndividualEmp]=useState<any>({});
  const [attendance,setAttendance]=useState<any[]>([]);
  // const totalCount = attendanceReportList?.totalCount || 0;


  const showingRecordCount = () => {
    const Count=((param.pageNo -1)* param.pageSize + Math.ceil(attendanceReportList?.results?.length))<=attendanceReportList?.totalCount?((param.pageNo -1)* param.pageSize + Math.ceil(attendanceReportList?.results?.length)):attendanceReportList?.totalCount;

    return Count ;
};

const attendanceFormat=()=>{
   // Add weekend information (Saturday, Sunday) to the attendance array
 attendanceReportList?.results.map((item:any) => 

    item.attendanceReports.map((record:any)=>{
    
      const date = new Date(param.year, param.month-1, record.day); // Use the year 2024, and the month 0 (January)
      const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  
      if (dayOfWeek === 6) {
        // If it's Saturday
        record.attendanceStatus = 'H';
      } else if (dayOfWeek === 0) {
        // If it's Sunday
        record.attendanceStatus = 'H';
      }
  }

    ));
    
   setAttendance(attendanceReportList?.results);
};
 
useEffect(()=>{
  attendanceFormat();
   // eslint-disable-next-line react-hooks/exhaustive-deps
},[param.year, param.month,param.pageNo]);

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  // Extract the time in HH:MM format
//   const extractTime=(time:string)=>{
//     const date = new Date(time);

// const hours = date.getHours().toString().padStart(2, '0');
// const minutes = date.getMinutes().toString().padStart(2, '0');

// return `${hours}:${minutes}`;
//   };

  const handleBiometric=(biometricObj:any,empObj:any)=>{
       
    setShow(true);
    setBioMetric(biometricObj);
    setIndividualEmp(empObj);
};

const dateTimeFormat=(dateTimeString:string)=>{
  const date = new Date(dateTimeString);

  // Format the date as YYYY-MM-DD
const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' gives 'YYYY-MM-DD' format

// Format the time as HH:MM AM/PM
const formattedTime = date.toLocaleTimeString('en-US', {
hour: 'numeric',
minute: 'numeric',
hour12: true,
});

// Combine date and time
return `${formattedDate} ${formattedTime}`;

};

const handleClose=()=>{
  setShow(false);
};

const dateFormat=(dateString:string)=>{
  if(dateString){
      return  format(dateString, 'yyyy-MM-dd')
  }
};

const convertMinutesToTime=(minutes:number)=> {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  // Pad the hours and minutes with leading zeros if necessary
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(mins).padStart(2, '0');
  return `${paddedHours}:${paddedMinutes}`;
};

const bioMetricAttendanceStatus=(bioMetricAttendance:any,item:any,index:number)=>{
  return bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.statusCode==='A'?'Ab':bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.statusCode
 };

  return (
    <>
      <div
        className='tab-pane active show'
        id='AttandanceReport'
        role='tabpanel'
      >
        <div className='card custom-card team_card'>
          <div className='card-header justify-content-between awards_card_header'>
            <div className='card-title'>Attendance</div>
            <div className='filter-right d-flex gap-x-2'>
              <div className='align-items-end d-flex gap-x-2 selectbox'>
                <div className='input-group date-selectbox'>
                  <DateFilter  param={param}/>
                </div>
              </div>
              <div className='btn-list mt-md-0 mt-2'>
                <ExportExcel />
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='table-responsive attendance_table'>
              <table className='border-primary hours-table table table-bordered text-nowrap attendance_layout'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    {attendanceReportList?.results[0]?.attendanceReports.map(
                      (data: any, index: any) => (
                        <th scope='col' key={index}>
                          {data.day}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((item: any) => (
                    <tr key={item.employeeNumber}>
                        <th><h3 className='userName'>{item.employeeName}</h3> <h3 className='EMP_no'>{item.employeeNumber}</h3> </th>
                     

                      {item.attendanceReports.map((employeeDetail: any,index:number) => (
                        <td className='present' key={employeeDetail.day}>
                          { employeeDetail.attendanceStatus === null ? (
                           <div className='holiday'>
                                --
                            </div>
                          ) : employeeDetail.attendanceStatus === 'H' ? (
                           <div className='holiday'>
                                {employeeDetail.attendanceStatus}
                            </div>
                          ) : (
                            <div className='attendance_status_info'>
                            <div
                              className={`main_attendance_status  ${attendanceStatusClass(finalAttendanceStatus(employeeDetail,bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]))}`}
                            >

                              {finalAttendanceStatus(employeeDetail,bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index])}
                              {/* {
                                employeeDetail.attendanceStatus
                              } */}
                            </div>

                              <div className='_BM_attendance'>
                                      <div className={`attendance_status_3t ${attendanceStatusClass(employeeDetail.attendanceStatus)}`}>
                                        <span className='attendance_info threeT_info'>
                                          3t
                                        </span>
                                        <span className='attendance_status  threeT__attendance'>
                                          {
                                            employeeDetail.attendanceStatus
                                          }
                                        </span>
                                        <span className='attendance_time threeT-time'>
                                        {employeeDetail.attendanceStatus!==null?numberToTimeConversion(employeeDetail.dayHours):'--'}
                                        </span>
                                      </div>
                                      <div className={`attendance_status_bm ${attendanceStatusClass(bioMetricAttendanceStatus(bioMetricAttendance,item,index))}`} onClick={(e)=>{bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.inTime ? handleBiometric(bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index],item):e.preventDefault()}}>
                                        <span className='attendance_info threeT_info'>
                                          BM
                                        </span>
                                        <span className='attendance_status  threeT__attendance'>
                                        {bioMetricAttendanceStatus(bioMetricAttendance,item,index)}
                                          {/* {bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.statusCode==='A'?'Ab':bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.statusCode} */}
                                        </span>
                                        <span className='attendance_time threeT-time'>
                                        {/* {bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.inTime ? <span>{extractTime(bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.inTime)} to {extractTime(bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.outTime)}</span>:'--'}  */}
                                        {bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.duration ? <span>{convertMinutesToTime(bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.duration)}</span>:'--'} 
                                        </span>
                                      </div>
                                    </div>
                             
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='card-footer'>
                <div className='d-flex align-items-center pagination_layout'>
                  <div>
                    Total Showing Entries {showingRecordCount()} out of{' '}
                    {attendanceReportList?.totalCount ?? 0}
                    <i className='bi bi-arrow-right ms-2 fw-semibold'></i>
                  </div>

                  <div className='ms-auto'>
                    <nav>
                      <AttendanceReportPagination
                        totalRecords={attendanceReportList?.totalCount}
                        data={param}
                      />
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} backdrop='static' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Biometric Detail</Modal.Title>
          <button aria-label="Close" className="btn-close position-absolute"
                                 data-bs-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        </Modal.Header>
        <Modal.Body>
        <div className="BM_attendance_modalcontent">
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Employee Name:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{individualEmp.employeeName}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Employee Number:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{bioMetric?.employeeCode}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Attendance Date:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{dateFormat(bioMetric?.attendanceDate)}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Status Code:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{bioMetric?.statusCode}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Duration:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{bioMetric?.duration}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Duration Time:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{convertMinutesToTime(bioMetric?.duration)}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>In Time:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{dateTimeFormat(bioMetric?.inTime)}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Out Time:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{dateTimeFormat(bioMetric?.outTime)}</p>
                                    </div>
                                 </div>
                                 <div className="mainflex_box">
                                    <div className="leftBox">
                                       <p><strong>Punch Record:</strong></p>
                                    </div>
                                    <div className="rightBox">
                                       <p>{bioMetric?.punchRecords}</p>
                                    </div>
                                 </div>
                              </div>

        </Modal.Body>
       
      </Modal>
    </>
  );
};
export default AttendanceReport;
