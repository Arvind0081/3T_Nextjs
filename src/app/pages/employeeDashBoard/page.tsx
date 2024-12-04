import React from 'react';
import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import { EmployeeDashboard, EmployeeStatusProjectList, EmployeeStatusUpworkProfileList, individualToDo, scrumTeamBioMetric } from '@/utils/publicApi';
import { AttendenceEmp, EmployeeStatusProjectListModel } from '@/utils/types';
import Dashboard from '@/components/employeeDashBoard/dashboard';
import getUser from '@/utils/getUserServerSide';
import Footer from '@/components/common/Footer/footer';



const EmployeeDashBoard = async ({searchParams}:any) => {
  let user: any =  getUser();
  let dateStr= searchParams?.month ;
 let assignedTask:string='';
  if (dateStr == undefined) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
    dateStr = `${year}-${month}`;
  }
  
  let [year, month] = dateStr.split('-');
   let  dashboardList=[] ;
   let bioMetricAttendance:any[]=[];
let empProjectList: EmployeeStatusProjectListModel[]=[] ;
let empProfileList: any[]=[] ;
  const attendence: AttendenceEmp = {
    Month: month,
    Year: year,
   
  };

  let payLoad:any={
    teamLeadId:'',
    month: Number(month),
    year: Number(year),
    departmentId:Number(user.departmentId),
    teamAdminId:'',
    empID:user.id
}
try {
  
   dashboardList = await EmployeeDashboard(attendence);
} catch (error:any) {
  
}
try {
  
  empProjectList = await EmployeeStatusProjectList();
 
} catch (error:any) {
  
}
try {
  
  empProfileList = await EmployeeStatusUpworkProfileList();
} catch (error:any) {

}

try {
  const response =await individualToDo();
  assignedTask=response?.name
} catch (error) {
  
}

try {
  bioMetricAttendance= await scrumTeamBioMetric(payLoad);
} catch (error) {}

  return (
    <div className='page'>  
      <div className='page-main'>
        <Header />
        <SideNav />

        <div className='jumps-prevent'></div>
         <Dashboard dashboardList={dashboardList} empProjectList={empProjectList} empProfileList={empProfileList} user={user} assignedTask={assignedTask} bioMetricAttendance={bioMetricAttendance} dateStr={dateStr}/>
        
      </div>
      <Footer/>
    </div>
  );
};

export default EmployeeDashBoard;
