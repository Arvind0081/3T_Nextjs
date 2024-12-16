'use client'
import React,{useState,useEffect} from 'react'; 
import { HiringModel ,ProjectProductivityPayloadModel, TeamMembersInProjectModel } from '@/utils/types';
import EditAssignedTeam from '@/components/projects/editAssignedTeam';
import ProductivityGraph from '@/components/projects/productivityGraph';
import ProjectBillingHistory from '@/components/projects/projectBillingHistory';
import { format } from 'date-fns';
import { projectAssignedToEmployee, projectBillingHistoryDetails, projectProductivity } from '@/utils/publicApi';
import getUser from '@/utils/getUserClientSide';

const ProjectDetail=({projectId,projectModels,projectStatusData,hiringType}:any)=>{

   let token:any;
   token = getUser();
   
    const [showMore,setShowMore]=useState(false);
    const [productivityValue,setProdeuctivityValue]=useState('');
   const [projectBillingHistoryArray,setProjectBillingHistoryArray]=useState<any[]>([]);
 
    const [projectAssignedDetails,setProjectAssignedDetails]=useState<TeamMembersInProjectModel[]>([]);
    const toggleShowMore=()=>{
        setShowMore(!showMore);
    };

    useEffect(()=>{
    
      fetchProductivity();
      fetchProjectBillingHistory();
      fetchProjectAssignedDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const fetchProductivity=async()=>{
   
      try {
         const payload: ProjectProductivityPayloadModel = {
            id: projectId,
            departmentId: Number(token?.departmentId),
          };

       const response = await projectProductivity(payload);
       if(response){
         const value=response?.productivity?(response?.productivity).toFixed(2):0;
            setProdeuctivityValue(value);
        }
      
       } catch (error) {}
    };

    const fetchProjectBillingHistory=async()=>{
  
       try {
         const response = await projectBillingHistoryDetails(Number(projectId));
                setProjectBillingHistoryArray(response);
        } catch (error) {console.log(error);}

    };

    const fetchProjectAssignedDetails=async ()=>{

      try {
         const payload: ProjectProductivityPayloadModel = {
            id: projectId,
            departmentId: Number(token?.departmentId),
          };

         const response = await projectAssignedToEmployee(payload);
 
         if(response){
            setProjectAssignedDetails(response);
         }
       } catch (error) {}

    };

   

   
 

    return(
        <div className="row">
        <div className="col-sm-6">
           <div className="card custom-card card_sm projectdetail_infoContent">
              <div className="card-body">
                 <div className="row gy-3">
                    <div className="projectdetail_info leftbox">
                       <div className="project-detail-maincard">
                          <div className="align-items-start d-flex gap-1"><span
                             className="fw-semibold text-muted nowrap">Assigned to :</span>  {projectModels.assignedTo}
                             <EditAssignedTeam
                               projectName={projectModels?.name}
                               clientName={projectModels.clientName}
                               departmentId={projectModels.projectDepartmentIds}
                               projectAssignedDetails={projectAssignedDetails}
                               projectId={projectId}
                             /></div>
                          <p className="align-items-start d-flex gap-1"><span
                                className="fw-semibold text-muted nowrap">Creation Date :</span> {format( new Date(projectModels?.createdTime), 'dd MMM yyyy')}
                          </p>
                          <p className="align-items-start d-flex gap-1"><span
                                className="fw-semibold text-muted nowrap">Created by :</span> {' '}{projectModels?.createdByUser}</p>
                          <p className="align-items-start d-flex gap-1"><span
                                className="fw-semibold text-muted nowrap">Client Name :</span> {projectModels?.clientName}</p>
                          <p className="align-items-start d-flex gap-1"><span
                                className="fw-semibold text-muted nowrap">Profile Name :</span> </p>
                          <p className="align-items-start d-flex gap-1"><span
                                className="fw-semibold text-muted nowrap">Status :</span> <span
                                className="badge bg-success">  {projectStatusData?.filter((item:any) => item.value == projectModels.projectStatus )[0].text}</span> </p>  
                       </div>                                         
                    </div>
                    <div className="projectdetail_graph rightBox">
                       <ProductivityGraph value={productivityValue} />
                    </div>
                   
                       {showMore && <div className="projectDetail_show project-detail-maincard" style={{display: 'block'}}>
                          <p className="align-items-start d-flex gap-1"><span className="fw-semibold text-muted nowrap">Note :</span> {projectModels?.notes}</p>
                          <p className="align-items-start d-flex gap-1"><span className="fw-semibold text-muted nowrap">Production Url :</span> 
                          <a href={projectModels?.productionUrl}>{projectModels?.productionUrl} </a></p>
                          <p className="align-items-start d-flex gap-1"><span
                                className="fw-semibold text-muted nowrap">Dev Url :</span> <a href={projectModels?.stageUrl}>{projectModels?.stageUrl}</a></p>
                          <p className="align-items-start d-flex gap-1"><span
                                className="fw-semibold text-muted nowrap">Hiring Platform:</span>{hiringType.filter((item:HiringModel)=>item.value===projectModels.hiringStatus)[0]?.text}
                          </p>
                          <p className="align-items-start d-flex gap-1"><span
                             className="fw-semibold text-muted nowrap">Billing Hours:</span>{Number(projectModels?.projectFixedHours) + Number(projectModels?.projectUpworkHours)}
                          </p>
                          <p className="align-items-start d-flex gap-1"><span
                             className="fw-semibold text-muted nowrap">Description :</span><span> {projectModels.description}<a href="javascript:void();" className="fs-13">ReadMore</a></span></p>
                       </div>}
                       <div>
                          <div>
                            {!showMore &&<p className="show_more fw-semibold mb-0" onClick={toggleShowMore}>Show More <i className="bx bx-chevrons-down fs-18 align-middle"></i> </p>}
                            {showMore &&<p className="show_less fw-semibold mb-0" style={{display: 'block'}} onClick={toggleShowMore}>Show Less <i className="bx bx-chevrons-up fs-18 align-middle"></i> </p>}
                           </div>
                        </div>
                   
                 </div>
              </div>
           </div>
        </div>
        <div className="col-sm-6 card_sm">
           <div className="card custom-card">
              <div className="card-header">
                 <div className="card-title">Project Billing History</div>
              </div>
              <div className="card-body">
                 {projectBillingHistoryArray.length>0 ? <ProjectBillingHistory projectBillingHistory={projectBillingHistoryArray}/>: <span>No Record Found.</span>}
              </div>
           </div>
        </div>
     </div>
    )
}

export default ProjectDetail;