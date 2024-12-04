
import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Footer from '@/components/common/Footer/footer';
import Header from '@/components/common/Header/header';
import {AttendanceListModel, TeamStatusModel } from '@/utils/types';
import {TeamStatusList, attendanceListFromDB} from '@/utils/publicApi';
import { format } from 'date-fns';
import TeamStatusTable from '@/components/teamStatus/teamStatusTable';


const TeamStatus=async({searchParams}:any)=>{

   const selectedDate = searchParams.date ?? format(new Date(), 'yyyy-MM-dd');

    let teamStatus:TeamStatusModel[]=[];
   let attendanceList:AttendanceListModel[]=[];
    const payLoad={
        'filterByDate':selectedDate,
    };
    try {
        teamStatus=  await TeamStatusList(payLoad);
    } catch (error) {
        
    }

    try {
        attendanceList= await attendanceListFromDB();
    } catch (error) {
        
    }

    return(
        <>
            <div className='app sidebar-mini ltr light-mode'>
                <div className='page'>
                    {/* <!-- app-Header --> */}
                    <Header />
                    {/* <!--APP-SIDEBAR--> */}
                    <SideNav />
                    {/* <!--app-content open--> */}
                    <div className="main-content app-content mt-0">
                    <div className="side-app">
               
           <TeamStatusTable teamStatus={teamStatus} payLoad={payLoad} attendanceList={attendanceList}/>
   
   
   </div>


               {/* <!-- CONTAINER END --> */}
            </div>
         </div>
         

                {/* FOOTER  */}
                <Footer />
            </div>
        </>
    )
}

export default TeamStatus;