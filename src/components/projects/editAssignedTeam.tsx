'use client'
import { teamLeadAndBDM, updateProjectMembers } from '@/utils/publicApi';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect}  from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

const AssignedTeam=({projectName,clientName,departmentId,projectAssignedDetails,projectId}:any)=>{

    const [show,setShow]=useState(false);
    const [managerTeam,setManagerTeam]=useState<any[]>([]);
const [baTeam,setBATeam]=useState<any[]>([]);
const [leadTeam,setLeadTeam]=useState<any[]>([]);
const initialMemberOFProjects=projectAssignedDetails?projectAssignedDetails?.map((record: { employeeId: string; })=>record.employeeId):[];
const [selectedMemberId,setSelectedMemberId]=useState<string[]>([]);

const router=useRouter();
    const handleHideCanvas=()=>{
        setShow(false);
        setSelectedMemberId(initialMemberOFProjects);
    };
const handleEdit=async()=>{
   try {
      const res = await teamLeadAndBDM(departmentId);

let managerTeams :any[]= [];
let bdmTeams :any[]= [];
let leadTeams :any[] = [];

res.map(department => {
  managerTeams.push(department.manager);
  bdmTeams.push(department.bdm);
  leadTeams.push(department.teamLead);
});

setManagerTeam(managerTeams.flatMap(item=>item));
setBATeam(bdmTeams.flatMap(item=>item));
setLeadTeam(leadTeams.flatMap(item=>item));
      setShow(true);
    } catch (err) {} 
    
};

const handleSelection =(e: React.ChangeEvent<HTMLInputElement>)=>{
  
   if(selectedMemberId?.includes(e.target.value)){
      let filter=  selectedMemberId?.filter((item:any)=>item !==e.target.value);
      setSelectedMemberId(filter);
    }else{
      setSelectedMemberId([...selectedMemberId,e.target.value]);
    }
   
  };

  const handleUpdate=async()=>{
const data={
   projectId: [Number(projectId)],
   employeeId: selectedMemberId
 };
await updateProjectMembers(data);
setShow(false);
router.refresh();
  };
  useEffect(()=>{
   setSelectedMemberId(initialMemberOFProjects)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[projectAssignedDetails]);


    return(
      <div className='filter-right d-flex'>

<button className="btn-xs-badge btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light" onClick={handleEdit}>
  <i className="bi bi-pencil-square"></i>
</button>
<Offcanvas show={show} onHide={()=>handleHideCanvas()} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{projectName} - {clientName}</Offcanvas.Title>
          <button
                                            type='button'
                                            className='btn-close text-reset text-right'
                                            onClick={() => handleHideCanvas()}
                                        >
                                            <i className='fe fe-x fs-18'></i>
                                        </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="offcanvas-body">
        <label>Manager</label>
                              <div className="status-repeat-box row m-0 Assigned_content">
                                 { managerTeam && managerTeam.map((item)=>(
                                    <div key ={item.id} className="col-md-6 form-group">
                                       <label className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" value={item.id} checked={selectedMemberId?.includes(item.id)} onChange={(e)=>handleSelection(e)}/>
                                          <span className="custom-control-label">{item.name}</span>
                                    </label>
                                 </div>
                                 )) }
                                 </div>

          <label>BA</label>
                              <div className="status-repeat-box row m-0 Assigned_content">
                                 { baTeam && baTeam.map((item)=>(
                                    <div key ={item.id} className="col-md-6 form-group">
                                       <label className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" value={item.id} checked={selectedMemberId?.includes(item.id)} onChange={(e)=>handleSelection(e)}/>
                                          <span className="custom-control-label">{item.name}</span>
                                    </label>
                                 </div>
                                 )) }
                                 </div>

                                 <label>Team Lead</label>
                              <div className="status-repeat-box row m-0 Assigned_content">
                                 { leadTeam && leadTeam.map((item)=>(
                                    <div key ={item.id} className="col-md-6 form-group">
                                       <label className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" value={item.id} checked={selectedMemberId?.includes(item.id)} onChange={(e)=>handleSelection(e)}/>
                                          <span className="custom-control-label">{item.name}</span>
                                    </label>
                                 </div>
                                 )) }
                                 </div>
                           </div>
                           <div className="offcanvas-footer text-right">
                              <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update Team</button>
                           </div>
                                       
                                   
                                    
        </Offcanvas.Body>
      </Offcanvas>

      </div>

    )
}
export default AssignedTeam;