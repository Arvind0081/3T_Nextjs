import Header from '@/components/common/Header/header';
import SideNav from '@/components/common/SideBar/sidebar';
import { departments, hrMonthlyReports, hrReports, managerList, scrumTeamBioMetric } from '@/utils/publicApi';
import { AttendenceFormValue, DepartmentModel } from '@/utils/types';
import getUser from '@/utils/getUserServerSide';

import Reports from '@/components/hrReports/reports';

const HRReports = async ({ searchParams }: any) => {
    //startDate and endDate only for monthlyreports
    let user:any = getUser();
    let startDate = searchParams.startDate;
    let endDate = searchParams.endDate;
    let managerId = searchParams.managerId;

    const hrDepSelected = searchParams?.departmentId;

    let dateStr = searchParams?.month;
    let pageSize: any = searchParams?.size ?? 10;
    let currentPage: any = searchParams?.page ?? 1;
    // let search: any = searchParams?.search ?? '';
    let searchQuery = searchParams?.search ?? '';
    let departmentID = searchParams?.departmentId;

    let monthlyReports: any;
    let hrReportList: any;
    let departmentData: DepartmentModel[] = [];
    let getManagerList: any;
    let bioMetricAttendance:any[]=[];
    if (dateStr == undefined) {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
        dateStr = `${year}-${month}`;
    }
    let [year, month] = dateStr.split('-');
    let roleDepartmentID = searchQuery
    ? 0
    : hrDepSelected != undefined
      ? hrDepSelected
      : user.departmentId;
    const attendence: AttendenceFormValue = {
        DepartmentId: Number(roleDepartmentID),
        Month: startDate ?? month,
        Year: endDate ?? year,
        PageNumber: currentPage,
        PageSize: pageSize,
        SearchValue: searchQuery,
        designations: '',
        IsActive: 0,
        TeamAdminId:managerId??''
    };

    let payLoad:any={
        teamLeadId:'',
        month: Number(month),
        year: Number(year),
        departmentId:Number(departmentID),
        teamAdminId:managerId,
        empID:''
    }

    try {
        hrReportList = await hrReports(attendence);
    } catch (error) {}
    try {
        monthlyReports = await hrMonthlyReports(attendence);
       
    } catch (error) {}
  try {
        departmentData = await departments();
    } catch (error) {}
    try {
        getManagerList = await managerList(departmentID);
   
    } catch (error: any) {}

    try {
        bioMetricAttendance= await scrumTeamBioMetric(payLoad);
    } catch (error) {}

    return (
        <>
            <div className="app sidebar-mini ltr light-mode">
                <div className="page">
                    <div className="page-main">
                         <Header getManagerList={getManagerList} departmentData={departmentData} param={attendence}/>

                        <SideNav />
                        <div className="main-content app-content mt-0">
                            <div className="side-app">
                                <div className="main-container container-fluid">
                                    <Reports
                                        hrReportList={hrReportList}
                                        monthlyReports={monthlyReports}
                                        bioMetricAttendance={bioMetricAttendance}
                                        param={attendence}
                                        payLoad={payLoad}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default HRReports;
