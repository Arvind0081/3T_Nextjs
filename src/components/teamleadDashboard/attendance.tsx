'use client'
import React,{useState} from 'react';
import { Modal} from 'react-bootstrap';
import { format } from 'date-fns';

const TeamLeadAttendance=({monthName,response,bioMetricAttendance}:any)=>{

    const [show,setShow]=useState(false);
    const [bioMetric,setBioMetric]=useState<any>({});
    const [individualEmp,setIndividualEmp]=useState<any>({});

    const handleBiometric=(biometricObj:any,empObj:any)=>{
       
        setShow(true);
        setBioMetric(biometricObj);
        setIndividualEmp(empObj);
    }

    const handleClose=()=>{
        setShow(false);
    }

    const extractTime=(time:string)=>{
        const date = new Date(time);
    // Extract the time in HH:MM format
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
      }

      const numberToTimeConversion = (decimalTime: any) => {
        const hours = Math.floor(decimalTime);
        const fractionalHours = decimalTime - hours;
        const minutes = Math.round(fractionalHours * 60);
    
        // Format time string to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
      };

      const dateFormat=(dateString:string)=>{
        if(dateString){
            return  format(dateString, 'yyyy-MM-dd')
        }
      }

      const convertMinutesToTime=(minutes:number)=> {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        // Pad the hours and minutes with leading zeros if necessary
        const paddedHours = String(hours).padStart(2, '0');
        const paddedMinutes = String(mins).padStart(2, '0');
        return `${paddedHours}:${paddedMinutes}`;
      }

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

      }

    return(
        <>
         <div className='row'>
                    <div className='col-sm-12'>
                      <div className='card custom-card team_card'>
                        <div className='card-header justify-content-between awards_card_header'>
                          <div className='card-title'>
                            Attendance For {monthName}
                          </div>
                        </div>
                        <div className='card-body'>
                          <div className='table-responsive attendance_table'>
                            <table className='border-primary hours-table table table-bordered text-nowrap attendance_layout'>
                              <thead>
                                <tr>
                                  <th scope='col'>Name</th>
                                  {response &&
                                    response[0]?.employeeAttendance.map(
                                      (data: any) => (
                                        <th scope='col' key={data.day}>
                                          {data.day}
                                        </th>
                                      )
                                    )}
                                </tr>
                              </thead>
                              <tbody>
                                {response &&
                                  response.map((item: any) => (
                                    <tr key={item.employeeName}>
                                      <th>{item.employeeName}</th>
                                      {item?.employeeAttendance?.map(
                                        (employeeDetail: any,index:number) => (
                                          <td
                                            className={
                                              employeeDetail.attendanceStatus
                                            }
                                            key={employeeDetail.day}
                                          >
                                            {employeeDetail.attendanceStatus ===
                                            'H' ? (
                                              <div className='attendance_status_info'>
                                                <div className='attendance_status Present_status'>
                                                  {
                                                    employeeDetail.attendanceStatus
                                                  }
                                                </div>
                                              </div>
                                            ) : (
                                              <div className='attendance_status_info'>
                                                <div
                                                  className={`attendance_status Present_status ${employeeDetail.attendanceStatus === 'Ab' ? 'red' : ''}`}
                                                >
                                                  {
                                                    employeeDetail.attendanceStatus
                                                  }
                                                </div>

                                                <div className='_BM_attendance'>
                                                  <div className='attendance_status_3t'>
                                                    <span className='threeT_info'>
                                                      3t
                                                    </span>
                                                    <span className='threeT__attendance'>
                                                      {
                                                        employeeDetail.attendanceStatus
                                                      }
                                                    </span>
                                                    <span className='threeT-time'>
                                                    {employeeDetail.attendanceStatus!=='--'?numberToTimeConversion(employeeDetail.totalHours):''}
                                                    </span>
                                                  </div>
                                                  <div className='attendance_status_bm bg-white' onClick={(e)=>{bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.inTime ? handleBiometric(bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index],item):e.preventDefault()}}>
                                                    <span className='BM_info'>
                                                      BM
                                                    </span>
                                                    <span className='BM__attendance bg-white'>
                                                      {bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.statusCode==='A'?'Ab':bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.statusCode}
                                                    </span>
                                                    <span className='threeT-time'>
                                                    {bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.inTime ? <span>{extractTime(bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.inTime)} to {extractTime(bioMetricAttendance?.filter((emp:any)=>emp.employeeCode===item.employeeNumber)[index]?.outTime)}</span>:'--'} 
                                                    
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </td>
                                        )
                                      )}
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
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
    )
}

export default TeamLeadAttendance;