import apiService from '@/services/apiService';
import { AddProjectModuleFormValues, ModuleStatusModel } from '@/utils/types';
import React, { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
const AddEditProjectModule=({projectId,addModule,setAddModule,selectedProjectModule,setSelectedProjectModule,projectModuleStatus,projectPaymentsStatus}:any)=>{

const router =useRouter();
const today = new Date();
const deadLineDate =format(new Date(today.setDate(today.getDate() + 6)), 'yyyy-MM-dd');
const approvalDate = format(new Date(), 'yyyy-MM-dd');

let defaultValues:AddProjectModuleFormValues = {
    id: '',
    name: '',
    projectId: 0,
    estimatedHours: null,
    deadline: deadLineDate,
    approvalDate: approvalDate,
    paymentStatus: '',
    approvedBy: '',
    moduleStatus: 'Open',
    moduleNotes: ''
};

    const { register, handleSubmit,formState: { errors },watch,reset,trigger} = useForm<AddProjectModuleFormValues>({defaultValues});

    const approvedHours =watch('estimatedHours');
    useEffect(() => {
        if (selectedProjectModule) {
            reset(selectedProjectModule);
         }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProjectModule]);

    useEffect(()=>{
        if(approvedHours){
            trigger('estimatedHours')
        }
      
    },[approvedHours,trigger]);

    const handleHideCanvas=()=>{
        setAddModule(false);
         if(selectedProjectModule) setSelectedProjectModule(null);
          reset();
    };

    const handleAddEditModule = async (data: AddProjectModuleFormValues) => {

        const payloadData={...data,
            id:data?data?.id:'',
            projectId: projectId,
            estimatedHours:Number(data.estimatedHours),
        }

             if(data?.id){
                await apiService.put('/ProjectModule/UpdateProjectModule', payloadData);
                router.refresh();
                handleHideCanvas();
                     
             }else{
                 await apiService.post('/ProjectModule/AddProjectModule', payloadData);
                 router.refresh();
                 handleHideCanvas();
             }  
    };

    return(
        <Offcanvas show={addModule} onHide={handleHideCanvas} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedProjectModule ?'Update Project Module':'Add New Module'}</Offcanvas.Title>
          <button
                                            type='button'
                                            className='btn-close text-reset text-right'
                                            onClick={handleHideCanvas}
                                        >
                                            <i className='fe fe-x fs-18'></i>
                                        </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="offcanvas-body">
                                 <form className="status-repeat-box row m-0"  onSubmit={handleSubmit(handleAddEditModule)}>
                                    <div className="col-md-6 form-group">
                                    <label htmlFor='name'>
                                                    Name
                                                </label>
                                                <input
                                                    id='name'
                                                    type='text'
                                                    className='form-control'
                                                    {...register('name', {
                                                      required: 'Module Name is required',
                                                       })}
                                                        />
                                         {errors.name && (
                                                   <div className='validation_error'>
                                                           <span role='alert'>
                                                             {errors.name.message}
                                                              </span>
                                                           </div>
                                                          )}
                                    </div>
                                    <div className="col-md-6 form-group">
                                    <label htmlFor='estimatedHours'>
                                    Approved Hours
                </label>
                <input
                    id='estimatedHours'
                    className='form-control'
                    type='number'
                    {...register('estimatedHours', {
                        required:
                            'Approved Hours are required',
                        min: {
                            value: 0,
                            message:
                                'Approved Hours must be above 0',
                        },
                    })}
                />
                {errors.estimatedHours && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {
                                errors.estimatedHours
                                    .message
                            }
                        </span>
                    </div>
                )}
                                       </div>
                                       <div className="col-md-6 form-group">
                                       <label htmlFor='deadline'>
                                       DeadLine
                    <span className='tootip_content'>
                        <i
                            className='ri-question-fill'
                            data-bs-placement='top'
                            data-bs-toggle='tooltip-primary'
                            title='Lorem Ipsum'
                        ></i>
                    </span>
                  
                </label>
                <input
                    id='deadline'
                    type='date'
                    className='form-control'
                    {...register('deadline')}
                />
                                       </div>
                                       <div className="col-md-6 form-group">
                                       <label htmlFor='approvalDate'>
                                       Approval Date
                    <span className='tootip_content'>
                        <i
                            className='ri-question-fill'
                            data-bs-placement='top'
                            data-bs-toggle='tooltip-primary'
                            title='Lorem Ipsum'
                        ></i>
                    </span>
                  
                </label>
                <input
                    id='approvalDate'
                    type='date'
                    className='form-control'
                    {...register('approvalDate', {
                        required: 'Approval Date is required',
                         })}
                />  {errors.approvalDate && (
                    <div className='validation_error'>
                            <span role='alert'>
                              {errors.approvalDate.message}
                               </span>
                            </div>
                           )}
                                       </div>
                                    <div className="col-md-6 form-group">
                                    <label htmlFor='moduleStatus'>
                                    Module Status
                </label>
                <select
                    id='moduleStatus'
                    className='form-control form-select select2'
                    {...register('moduleStatus', {
                        required: 'Module Status is required',
                         })}
                >
                    <option value=''>
                        Select
                    </option>

                    {projectModuleStatus.map(
                        (item: ModuleStatusModel) => (
                            <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.text}
                            </option>
                        )
                    )}
                </select>
                {errors.moduleStatus && (
                    <div className='validation_error'>
                            <span role='alert'>
                              {errors.moduleStatus.message}
                               </span>
                            </div>
                           )}
                                    </div>
                                    <div className="col-md-6 form-group">
                                    <label htmlFor='paymentStatus'>
                                    Payment Status
                </label>
                <select
                    id='paymentStatus'
                    className='form-control form-select select2'
                    {...register('paymentStatus')}
                >
                    <option value=''>
                        Select
                    </option>

                    {projectPaymentsStatus.map(
                        (item: ModuleStatusModel) => (
                            <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.text}
                            </option>
                        )
                    )}
                </select>
                                       </div>
                                    <div className="col-md-12 form-group">
                                    <label htmlFor='moduleNotes'>
                                    Notes
                                                </label>
                                                <textarea
                                                    id='moduleNotes'
                                                    className='form-control h100'
                                                    {...register('moduleNotes')}
                                                        />
                                          
                                    </div>
                                    <div className="offcanvas-footer text-right">
                                 <input
                type='submit'
                value='Submit' className="btn btn-primary" />
                              </div>
                                 </form>
                              </div>
                             
                           
        </Offcanvas.Body>
      </Offcanvas>
    )
}
export default AddEditProjectModule;