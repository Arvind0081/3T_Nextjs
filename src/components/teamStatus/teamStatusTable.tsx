'use client'
import { AttendanceListModel, TeamStatusModel, UpdateTeamAttendancePayLoadModel } from '@/utils/types';
import React,{useState,useEffect} from 'react'
import HeaderCheckBox from './headerCheckBox';
import TableCheckBox from './tableCheckBox';
import DateFilter from './dateFilter';
import WarningEmailButton from './warningEmailButton';
import { updateTeamberAttendance } from '@/utils/publicApi';
import { useRouter } from 'next/navigation';

const TeamStatusTable=({teamStatus,payLoad,attendanceList}:any)=>{
const router =useRouter();
    const [allCheckedEmployes,setAllCheckedEmployes]=useState<boolean>(false);
const [checkedEmployes,setCheckedEmployes]=useState<any[]>([]);
    const numberToTimeConversion=(decimalTime:any)=>{
        const hours = Math.floor(decimalTime);
        const fractionalHours = decimalTime - hours;
        const minutes = Math.round(fractionalHours * 60);
      
        // Format time string to HH:mm
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formattedTime;
      };

      const totalUpworkHours=()=>{
          return numberToTimeConversion(
              teamStatus
                .map((item: TeamStatusModel) => item.upworkHours)
                .reduce((a: number, b: number) => a + b, 0)
            );
      };
  
  const totalFixedHours=()=>{
      return numberToTimeConversion(
          teamStatus
            .map((item: TeamStatusModel) => item.fixedHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
  };
  
  const totalBillingHours=()=>{
      return numberToTimeConversion(
          teamStatus
            .map((item: TeamStatusModel) => item.billingHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
  };
  
  const totalNonBillingHours=()=>{
      return numberToTimeConversion(
          teamStatus
            .map((item: TeamStatusModel) => item.nonBillableHours)
            .reduce((a: number, b: number) => a + b, 0)
        );
  };
 
  const handleAllCheckedEmployes=(value:any)=>{
    const data=teamStatus?.map((item:TeamStatusModel)=>item.id);
    if(value){
        setCheckedEmployes(data);
    }else{
        setCheckedEmployes([]);
    }
    
    setAllCheckedEmployes(value);
  }

  const handleCheckboxChange=(id:any)=>{
        const employee=checkedEmployes.includes(id);
        if(employee){
            setCheckedEmployes(checkedEmployes.filter((item:any)=>item!==id));
        }else{
            setCheckedEmployes([...checkedEmployes,id]);
        }
  }
  useEffect(()=>{
    if(checkedEmployes.length===0){
        setAllCheckedEmployes(false);
    }
  },[checkedEmployes])

  const entriesCount=()=>{
    let count =teamStatus?.map((item:any)=>item.id);
    count=new Set(count);
    count=[...count];
    return count.length;

  }

  const handleUpdateAttendance=async(status:any)=>{

    const data:UpdateTeamAttendancePayLoadModel={
        empId: checkedEmployes,
        filterByDate:payLoad.filterByDate,
        attendanceStatus: status
      }
      try {
        await updateTeamberAttendance(data);
        setCheckedEmployes([])
        router.refresh();
      } catch (error) {
        
      }

  }

  const getClass = (value:string) => {
    switch (value) {
      case 'P':
        return 'btn-success-light';
      case 'AB':
        return 'btn-danger-light';
      case 'L':
        return 'btn-primary-light';
      case 'HA':
        return 'btn-warning-light';
        case 'HL':
        return 'btn-info-light';
      default:
        return '';
    }
  };
  const checkPresent=(data:any)=>{
    const totalHours = data.upworkHours + data.fixedHours + data.nonBillableHours;
  return totalHours;
  };

  const displayAttendance = (data:any) => {
    switch (data.attendance) {
      case 'AB':
        return 'Abscent';
      case 'L':
        return 'Leave';
      case 'HA':
        return 'Half Abscent';
        case 'HL':
        return 'Half Leave';
      default:
       const wages= checkPresent(data);
       if(wages>8){
            return 'Present';
       }else{
        return '';
       }
      
    }
  };

    return(
        <div className="main-container container-fluid">
   
        <div className="row">
            <div className="col-xl-12">
                <div className="card custom-card">
                    <div className="card-header justify-content-between items-center">
                     <div className="attendance_buttons mb-3">
                     {checkedEmployes.length>0 && attendanceList.map((item:AttendanceListModel)=>(
                        <button key={item.value} type="button" className={`btn ${getClass(item.text)} btn-wave text-center justify-content-center`} onClick={()=>handleUpdateAttendance(item.value)}>{item.text}</button>
                      
                     )) }
                           </div>
                        <div className="filter-right d-flex gap-x-2 mb-0">
                            <DateFilter payLoad={payLoad}/>
                           
                            <div className="btn-list mt-md-0 mt-3">
                            {checkedEmployes.length>0 &&<WarningEmailButton data={checkedEmployes} setCheckedEmployes={setCheckedEmployes}/>}
                            </div>
                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="table-responsive theme_table">
                            <table className="table text-nowrap table-hover border table-bordered employeeStatus_table lastStatus_table">
                                <thead>
                                    <tr>
                                        <th scope="checkBox">
                                            <label className="custom-control custom-checkbox mb-0 ms-3">
                                               <HeaderCheckBox allCheckedEmployes={allCheckedEmployes} handleAllCheckedEmployes={handleAllCheckedEmployes}/>
                                            </label>
                                        </th>
                                        <th scope="col">Employee Name</th>
                                        <th scope="col" className="project-width">Project Name</th>
                                        <th scope="col">Client Name</th>
                                        <th scope="col" className="module-width">Module</th>
                                        <th scope="col" className="profile-width">Profile</th>
                                        <th scope="col" className="memo-width">Memo </th>
                                        <th scope="col">Upwork Hours</th>
                                        <th scope="col">Fixed Billing Hours</th>
                                        <th scope="col">Billing Hours</th>
                                        <th scope="col">Non Billable Hours</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamStatus?.map((item:TeamStatusModel,index:number,teamStatus:TeamStatusModel[])=>(<tr key={item.id}   className={
                                             index === 0
                                               ? 'mainuser'
                                               : teamStatus[index].name !==
                                               teamStatus[index - 1].name
                                                 ? 'mainuser'
                                                 : ''
                                           }>
                                        <td scope="checkBox">
                                            <label className="custom-control custom-checkbox mb-0 ms-3">
                                                <TableCheckBox id={item.id} checkedEmployes={checkedEmployes} handleCheckboxChange={handleCheckboxChange}/>
                                            </label>
                                        </td>
                                        <td>
                                        <a
                                      href={`/employees/${item.id}`}
                                      >
                                        {item.name}{' '}

                                      </a>
                                      </td>
                                        {/* <td>{item.name}</td> */}
                                        <td>{item.projectName}</td>
                                        <td>{item.clientName}</td>
                                        <td>{item.moduleName}</td>
                                        <td>{item.profileName}</td>
                                        <td>{item.memo}</td>
                                        <td>{numberToTimeConversion(item.upworkHours)}</td>
                                        <td>{numberToTimeConversion(item.fixedHours)}</td>
                                        <td className="text-success text-bold"><b>{numberToTimeConversion(item.billingHours)}</b></td>
                                        <td className="text-danger">{numberToTimeConversion(item.nonBillableHours)}</td>
                                        <td>{displayAttendance(item)}</td>
                                       
                                    </tr>))}
                                 
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="text-bold">Total </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{totalUpworkHours()}</td>
                                        <td className="text-bold">{totalFixedHours()}</td>
                                        <td className="text-bold">{totalBillingHours()}</td>
                                        <td className="text-danger">{totalNonBillingHours()}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex align-items-center">
                            <div> Showing {entriesCount()} Entries <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                            </div>
                            <div className="ms-auto">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TeamStatusTable;