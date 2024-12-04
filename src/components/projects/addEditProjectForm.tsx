'use client';
import apiService from '@/services/apiService';
import {
  BillingTypeModel,
  ClientModel,
  HiringModel,
  StatusModel,
  Technology,
  addEditProjectFormValue,
  applicationDomainModel,
} from '@/utils/types';
import React, {useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useForm,Controller  } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import getUser from '@/utils/getUserClientSide';
import { Dropdown } from 'semantic-ui-react';
import { departments, salesPersonList, teamLeadAndBDM } from '@/utils/publicApi';
import toastr from 'toastr';

const ProjectAddEditForm = ({
  addEdit,
  setAddEdit,
  selectedProject,
  setSelectedProject,
  hiringType,
  clientList,
  projectStatusData,
  billingType,applicationDomain,technologies
}: any | null) => {
  const router = useRouter();
  const token: any = getUser();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,watch,setValue 
  } = useForm<addEditProjectFormValue>({
    defaultValues: {
     
      departmentIds:[Number(token?.departmentId)],
    
    }
  });

  const [departmentOptions,setDepartmentOptions]=useState<any[]>([]);
  const [salesPerson,setSalesPerson]=useState<any[]>([]);
  const [members,setMembers]=useState<any[]>([]);
  const [showMore,setShowMore]=useState(false);
  const [combinedDomains,setCombinedDomains]=useState<applicationDomainModel[]>([]);
  const [combinedTechnologies,setCombinedTechnologies]=useState<Technology[]>([]);

const departmentIDs=watch('departmentIds');
const interDepartmentStatus=watch('interDepartment');
const sortedClientList = clientList.sort((a: any, b: any) =>
  a.name.localeCompare(b.name)
);


useEffect(() => {
 
  // if (departmentIDs.length === 0) {
  //   setValue('interDepartment', false);
  // }
  if (departmentIDs && departmentIDs.length === 1) {
    setValue('interDepartment', false);
  }
  if (departmentIDs && departmentIDs.length > 1) {
    setValue('interDepartment', true);
  }
 
}, [departmentIDs, setValue]);

useEffect(() => {
  if (!interDepartmentStatus) {
    setValue('departmentIds',[Number(token.departmentId)]);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [interDepartmentStatus, setValue]);

const getSalesPersons=async(id:number)=>{
  const response:any = await salesPersonList(id);
  const filteredResponse= showMore?response:response.filter((item:any)=>item.departmentId===token.departmentId);
 const options= filteredResponse?.flatMap((department:any) => [
  { key: department.departmentId, text: department.departmentName, value: department.departmentId, disabled: true }, // Department as a disabled option
  ...department.salesPersons.map((person:any) => ({
    key: person.id,
    text: person.name,
    value: person.id,
  }))
])
 const showMoreOption=!showMore?[{
  key: 'Show More',
  text: 'Show More',
  value: 'Show More',
}]:[];

let selectedOption=[];
if(selectedProject && !showMore){
  const selectedSalesPerson= response.filter((item:any)=>item.departmentId===token.departmentId)?.flatMap((department:any) => [
    // { key: department.departmentId, text: department.departmentName, value: department.departmentId, disabled: true }, // Department as a disabled option
    ...department.salesPersons.filter((person:any) => person.id===selectedProject.salesPerson)
  ]);

  if(selectedSalesPerson.length>0){
    selectedOption=[];
  }
  else{
    const selectedSalesPersonFromAnotherDept= response.filter((item:any)=>item.departmentId!==token.departmentId)?.flatMap((department:any) => [
      // { key: department.departmentId, text: department.departmentName, value: department.departmentId, disabled: true }, // Department as a disabled option
      ...department.salesPersons.filter((person:any) => person.id===selectedProject.salesPerson)
    ]);

    selectedOption=selectedSalesPersonFromAnotherDept.map((person:any) => ({
      key: person.id,
      text: person.name,
      value: person.id,
    }));
  }
  
}
  setSalesPerson([...selectedOption,...options,...showMoreOption]);
};

useEffect(()=>{
getSalesPersons(0);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[showMore,selectedProject]);

useEffect(()=>{
  if (selectedProject?.applicationDomains) {
    const existingDomains = selectedProject.applicationDomains.split(', ');
    const additionalDomains = existingDomains
        .filter((domain :any)=> !applicationDomain.some((item:any) => item.domainType === domain))
        .map((domain:any) => ({ id: domain, name: domain }));
        setCombinedDomains([...applicationDomain, ...additionalDomains]);
} else {
  setCombinedDomains(applicationDomain);
}
 
},[selectedProject,applicationDomain]);

const applicationDomainOption =combinedDomains?.map((item:applicationDomainModel) => ({
  key: item.id,
  text: item.domainType,
  value: item.domainType,
}));

useEffect(() => {
  // Combine technologies with skills from selectedProject
  if (selectedProject?.skills) {
      const existingSkills = selectedProject.skills.split(',');
      const additionalTechnologies = existingSkills
          .filter((skill :any)=> !technologies.some((tech:any) => tech.name === skill))
          .map((skill:any) => ({ id: skill, name: skill }));
      setCombinedTechnologies([...technologies, ...additionalTechnologies]);
  } else {
      setCombinedTechnologies(technologies);
  }
}, [selectedProject, technologies]);


  const technologyOption = combinedTechnologies?.map((member: Technology) => ({
    key: member.id,
    text: member.name,
    value: member.name
}));


const getMembers=async()=>{
 
  const response:any = await teamLeadAndBDM(departmentIDs);
if (response) {
setMembers(response);
}
};

useEffect(()=>{
  getMembers();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[departmentIDs]);

const handleMoreSalesPerson=()=>{
  setShowMore(true);
 // getSalesPersons(0);
};

const selectedOption = watch('salesPerson');

useEffect(()=>{
  if(selectedOption==='Show More'){
    handleMoreSalesPerson();
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
},[selectedOption]);

  const getDepartments=async()=>{

    const response=await departments();
    const options = response?.map((item:any) => ({
      key: item.id,
      text: item.name,
      value: item.id
    }));
    setDepartmentOptions(options);
        
  };

  useEffect(()=>{
      getDepartments();
  },[]);

  useEffect(() => {
  
    if (selectedProject) {
      const updatedSelectedProject = {
        ...selectedProject,
        skills: selectedProject.skills ? selectedProject.skills.split(',') : [],
        applicationDomains:selectedProject.applicationDomains ? selectedProject.applicationDomains.split(', ') : [],
      };
      reset(updatedSelectedProject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  const handleAddEditProject = async (data: addEditProjectFormValue) => {
  
    const payLoad = {
      ...data,
      id: selectedProject ? selectedProject?.id : 0,
      clientId: Number(data.clientId),
      // name: clientList.filter(
      //   (client: ClientModel) => client.id === Number(data.clientId)
      // )[0].name,
      createdBy: selectedProject ? selectedProject.createdBy : token.id,
      updatedBy: selectedProject ? token.id : '',
      createdTime: selectedProject ? selectedProject?.createdTime : new Date(),
      isBilling: Number(data.isBilling),
      hiringStatus: Number(data.hiringStatus),
      isActive: selectedProject ? selectedProject?.isActive : 0,
      projectStatus: Number(data.projectStatus),
      invoiceProjectID: selectedProject
        ? selectedProject?.invoiceProjectID
        : '',
        departmentId: Number(token.departmentId),
       // salesPerson:data.salesPerson,
      skills: data.skills ? data.skills.join(',') : '',
      applicationDomains: data.applicationDomains ? data.applicationDomains.join(',') : '',
    };

    if (data?.id) {
      await apiService.put('/Project/UpdateProject', payLoad);
      router.refresh();
      handleHideCanvas();
    } else {
      await apiService.post('/Project/AddProject', payLoad);
      router.refresh();
      handleHideCanvas();
    }
  };

  const handleHideCanvas = () => {
    setAddEdit(false);
    if (selectedProject) setSelectedProject(null);
    reset();
    setShowMore(false);
  };

   // Options for the dropdown
  const memberOptions:any[] = members.flatMap((member:any) => {
    const departmentOptions:any[] = [];
  
    // Department Header
    departmentOptions.push({
      key: `${member.department}-header`,
      text: member.department,
      value: null,
      disabled: true
    });
    

     // Manager Header
     departmentOptions.push({
      key: `${member.department}-manager-heading`,
      text: 'Managers:',
      value: null,
      disabled: true
    });
  
    // Manager
    departmentOptions.push(
      ...member.manager.map((item:any) => ({
        key: item.id,
        text: item.name,
        value: item.id
      }))
    );
  
    // Team Leads Header
    departmentOptions.push({
      key: `${member.department}-team-leads-heading`,
      text: 'Team Leads:',
      value: null,
      disabled: true
    });
  
    // Team Leads
    departmentOptions.push(
      ...member.teamLead.map((lead:any) => ({
        key: lead.id,
        text: lead.name,
        value: lead.id
      }))
    );
  
    // BDMs Header
    departmentOptions.push({
      key: `${member.department}-bdm-heading`,
      text: 'BDMs:',
      value: null,
      disabled: true
    });
  
    // BDMs
    departmentOptions.push(
      ...member.bdm.map((bdm:any) => ({
        key: bdm.id,
        text: bdm.name,
        value: bdm.id
      }))
    );
  
    return departmentOptions;
  });

  return (
    <Offcanvas show={addEdit} onHide={() => handleHideCanvas()} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {selectedProject ? 'Update Project' : 'Add New Project'}
        </Offcanvas.Title>
        <button
          type='button'
          className='btn-close text-reset text-right'
          onClick={() => handleHideCanvas()}
        >
          <i className='fe fe-x fs-18'></i>
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form
          className='status-repeat-box row m-0'
          onSubmit={handleSubmit(handleAddEditProject)}
        >
          <div className='col-md-12 form-group'>
            <label htmlFor='name'>Project Name</label>
            <input
              id='projectName'
              type='text'
              className='form-control'
              {...register('name', {
                required: 'Project Name is required',
              })}
            />
            {errors.name && (
              <div className='validation_error'>
                <span role='alert'>{errors.name.message}</span>
              </div>
            )}
          </div>
         { selectedProject &&  <div className='col-md-6 form-group'>
            <label htmlFor='invoiceProjectID'>Project Invoice ID</label>
            <input
              id='invoiceProjectID'
              type='text'
              className='form-control'
              {...register('invoiceProjectID', {
                required: 'Invoice ID is required',
              })}
            />
            {errors.invoiceProjectID && (
              <div className='validation_error'>
                <span role='alert'>{errors.invoiceProjectID.message}</span>
              </div>
            )}
          </div>}
          <div className='col-md-6 form-group'>
            <label htmlFor='hiringStatus'>Hiring Status</label>
            <select
              id='hiringStatus'
              className='form-control'
              {...register('hiringStatus', {
                required: 'Hiring Status is required',
              })}
            >
              <option value=''> Select</option>
              {hiringType?.map((item: HiringModel) => (
                <option key={item.value} value={item.value}>
                  {' '}
                  {item.text}
                </option>
              ))}
            </select>
            {errors.hiringStatus && (
              <div className='validation_error'>
                <span role='alert'>{errors.hiringStatus.message}</span>
              </div>
            )}
          </div>
          <div className='col-md-6 form-group'>
            <label htmlFor='clientId'>Client Name</label>
            <select
              id='clientId'
              className='form-control'
              {...register('clientId', {
                required: 'Client Name is required',
              })}
            >
              <option value=''> Select</option>
              {sortedClientList?.map((item: ClientModel) => (
                <option key={item.id} value={item.id}>
                  {' '}
                  {item.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <div className='validation_error'>
                <span role='alert'>{errors.clientId.message}</span>
              </div>
            )}
          </div>
          <div className='col-md-6 form-group'>
            <label htmlFor='projectStatus'>Status</label>
            <select
              id='projectStatus'
              className='form-control'
              {...register('projectStatus', {
                required: 'Status is required',
              })}
            >
              <option value=''> Select</option>
              {projectStatusData?.map((item: StatusModel) => (
                <option key={item.value} value={item.value}>
                  {' '}
                  {item.text}
                </option>
              ))}
            </select>
            {errors.projectStatus && (
              <div className='validation_error'>
                <span role='alert'>{errors.projectStatus.message}</span>
              </div>
            )}
          </div>
          <div className='col-md-6 form-group'>
            <label htmlFor='isBilling'>Billing Type</label>
            <select
              id='isBilling'
              className='form-control'
              {...register('isBilling', {
                required: 'Billing Type is required',
              })}
            >
              <option value=''> Select</option>
              {billingType?.map((item: BillingTypeModel) => (
                <option key={item.value} value={item.value}>
                  {' '}
                  {item.text}
                </option>
              ))}
            </select>
            {errors.isBilling && (
              <div className='validation_error'>
                <span role='alert'>{errors.isBilling.message}</span>
              </div>
            )}
          </div>
          <div className='col-md-6 form-group'>
            <label htmlFor='productionUrl'>Production Url</label>
            <input
              id='productionUrl'
              type='text'
              className='form-control'
              {...register('productionUrl')}
            />
          </div>
          <div className='col-md-6 form-group' >
  <label htmlFor='salesPerson'>Sale Person</label>
  <Controller
    name="salesPerson"
    control={control}
    rules={{ required: 'Sales Person is required' }}
    render={({ field }) => (
      <Dropdown
        id='salesPerson'
        placeholder='Select'
        fluid
        selection
        options={salesPerson} 
        onChange={(e, { value }) => field.onChange(value)}
        value={field.value || ''}
      />
    )}
  />
  {errors.salesPerson && (
    <div className='validation_error'>
      <span role='alert'>{errors.salesPerson.message}</span>
    </div>
  )}
</div>
          <div className='col-md-6 form-group'>
            <label htmlFor='stageUrl'>Dev/Stage Url</label>
            <input
              id='stageUrl'
              type='text'
              className='form-control'
              {...register('stageUrl')}
            />
          </div>
          <div className='col-md-12 form-group'>
            <label htmlFor='employeeList'>Project Assign List </label>
            <Controller
          name="employeeList"
          control={control}
         // rules={{ required: 'Member is required' }}
          render={({ field }) => (
            <Dropdown
              id='employeeList'
              placeholder='Select members'
              fluid
              multiple
              selection
              options={memberOptions}
              onChange={(e, { value }) => field.onChange(value)}
              value={field.value || []}
            />
          )}
        />
            {/* {errors.employeeList && (
              <div className='validation_error'>
                <span role='alert'>{errors.employeeList.message}</span>
              </div>
            )} */}
          </div>

          <div className='col-md-6 form-group' >
  <label htmlFor='skills'>Technology Set</label>
  <Controller
    name="skills"
    control={control}
    rules={{ required: 'Minimum 3 skills are required',
      validate: (value) => value.length >= 3 || 'You must select at least 3 skills',
     }}
    render={({ field }) => (
      <Dropdown
        id='skills'
        placeholder='Select'
        fluid
        selection
        search
        multiple
        options={technologyOption} 
        onChange={(e, { value }) => field.onChange(value)}
        value={field.value || []} // Ensure value is always an array
        allowAdditions
        onAddItem={(e, { value }) => {
            setCombinedTechnologies((prev:any) => [...prev, { id: value, name: value }]);
        }}
      />
    )}
  />
  {errors.skills && (
    <div className='validation_error'>
      <span role='alert'>{errors.skills.message}</span>
    </div>
  )}
</div>

          <div className='col-md-6 form-group' >
  <label htmlFor='applicationDomains'>Application Domains</label>
  <Controller
    name="applicationDomains"
    control={control}
    rules={{ required: 'Domain is required' }}
    render={({ field }) => (
      <Dropdown
        id='applicationDomains'
        placeholder='Select'
        fluid
        selection
        search
        multiple
        options={applicationDomainOption} 
        onChange={(e, { value }) => field.onChange(value)}
        value={field.value || ''}
        allowAdditions
        onAddItem={(e, { value }) => {
            setCombinedDomains((prev:any) => [...prev, { id: value, name: value }]);
        }}
      />
    )}
  />
  {errors.applicationDomains && (
    <div className='validation_error'>
      <span role='alert'>{errors.applicationDomains.message}</span>
    </div>
  )}
</div>
          
     
          {/* <div className='col-md-6 form-group'>
            <label htmlFor='salesPerson'>Assign Sale Person</label>
            <select
              id='salesPerson'
              className='form-control'
              {...register('salesPerson', {
                required: 'Sales Person is required',
              })}

            >
              <option value=''> Select</option>
              {salesPerson?.map((department:any,index:number) => (
                    <optgroup key={index} label={department.departmentName}>
                        {department.salesPersons.map((person:any) => (
                            <option key={person.id} value={person.id}>{person.name}</option>
                        ))}
                    </optgroup>
                ))}
                {showMore && <option value='Show More'>Show More</option>}
            </select>
           
            {errors.isBilling && (
              <div className='validation_error'>
                <span role='alert'>{errors.isBilling.message}</span>
              </div>
            )}
          </div> */}
         
          <div className="col-md-12 form-group">
            <label htmlFor='interDepartment' className="custom-control custom-checkbox mb-0">                                     
            <input
              id='interDepartment'
              type="checkbox"
              className='custom-control-input'
              {...register('interDepartment')}
            />
            <span className="custom-control-label">Inter Departmental</span>
                                        </label>
                                    </div>
            <div className='col-md-12 form-group'>
            <label htmlFor='departmentIds'>Department List </label>
            <Controller
          name="departmentIds"
          control={control}
          rules={{ required: 'Department is required'}}
          render={({ field }) => (
            <Dropdown
              id='departmentIds'
              placeholder='Select department'
              fluid
              multiple
              selection
              disabled={!interDepartmentStatus}
              options={departmentOptions}
               //onChange={(e, { value }) => field.onChange(value)}
              onChange={(e, { value }) => {
                // Ensure `value` is always an array
                const newValue = Array.isArray(value) ? value : [value];
                if(!newValue?.includes(Number(token.departmentId))){
                  toastr.error('Default Department cannot be removed', '', { timeOut: 1000 });
                }

                const updatedValue = newValue?.includes(Number(token.departmentId)) ? newValue : [Number(token.departmentId),...newValue];
                field.onChange(updatedValue);
              }}
              value={field.value || []}
            />
          )}
        />
            {errors.departmentIds && (
              <div className='validation_error'>
                <span role='alert'>{errors.departmentIds.message}</span>
              </div>
            )}
          </div>
          <div className='col-md-12 form-group'>
            <label htmlFor='description'>Description </label>
            <textarea
              id='description'
              className='form-control h50'
              {...register('description', {
                required: 'Description is required',
              })}
            ></textarea>
            {errors.description && (
              <div className='validation_error'>
                <span role='alert'>{errors.description.message}</span>
              </div>
            )}
          </div>
          <div className='col-md-12 form-group'>
            <label htmlFor='notes'>Important Notes </label>
            <textarea
              id='notes'
              className='form-control h100'
              {...register('notes')}
            ></textarea>
          </div>
          <div className='offcanvas-footer text-right'>
            <input
              type='submit'
              value={selectedProject ? ' Update' : 'Add Project'}
              className='btn btn-primary'
            />
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ProjectAddEditForm;
