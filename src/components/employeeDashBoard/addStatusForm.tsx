'use client';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  EmployeeLeaveStaus,
  EmployeeStatus,
  EmployeeStatusProjectModulesListModel,
  EmployeeStatusUpworkProfileListModel,
  ModulesListModelParams,
} from '@/utils/types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import apiService from '@/services/apiService';
import { EmployeeStatusProjectModulesList } from '@/utils/publicApi';
// import { EmployeeStatusProjectModulesList } from '@/utils/publicApi';
import getUser from '@/utils/getUserClientSide';
// import { isValid } from 'date-fns';
const AddStatusForm = ({ setShow, empProjectList, empProfileList }: any) => {
  const router = useRouter();
  const [markAsLeave, setMarkAsLeave] = useState(false);
  const [empProjectModuleList, setEmpProjectModuleList] =
    useState<EmployeeStatusProjectModulesListModel[]>();
  const user: any = getUser();

  const [addModal, setAddModal] = useState(false);
  const [numStatusBoxes, setNumStatusBoxes] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [statusBoxes, setStatusBoxes] = useState<EmployeeStatus[]>([]);
  // const [formData, setFormData] = useState<any>(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const handleClose = () => {
    // setFormData(null);
    setShow(false);
    reset();
    setEmpProjectModuleList([]);
  };


  const {
    register,
    handleSubmit,
    setValue,
    formState: {},
    reset,
    getValues,
  
  } = useForm<EmployeeStatus>();



  const [errors, setErrors] = useState({
    projectID: '',
    moduleId: '',
    profileName: '',
    date: '',
    memo: '',
  });

  const [error, setError] = useState({
    date: '',
  });

  const handleRegistration = async (empStatus: EmployeeStatus) => {
    try {
     
      
      let pushToArray: (EmployeeStatus | EmployeeLeaveStaus)[] = [];

      if (isSubmitClicked) {
        if (!empStatus.markAsLeave) {
          if (validateForm(empStatus)) {
            for (const statusData of statusBoxes) {
              if (!statusData.markAsLeave) {
                statusData.attendanceStatus = null;
                statusData.applicationUsersId = user.id;
                statusData.offlineHours = Number(statusData.offlineHours);
                statusData.upworkHours = Number(statusData.upworkHours);
                statusData.fixedHours = Number(statusData.fixedHours);
                pushToArray.push(statusData);
              }
            }
          
              if (!empStatus.markAsLeave ) {
                empStatus.attendanceStatus = null;
                empStatus.applicationUsersId = user.id;
                empStatus.profileId=4252;
                empStatus.offlineHours = Number(empStatus.offlineHours);
                empStatus.upworkHours = Number(empStatus.upworkHours);
                empStatus.fixedHours = Number(empStatus.fixedHours);
                pushToArray.push(empStatus);
              }
            
         
            await apiService.post(
              '/EmployeeStatus/AddEmployeeStatus',
              pushToArray
            );
            router.refresh();
            handleClose();
          }
        } else {
          if (validateFormforleave(empStatus.date)) {
            const leaveData: EmployeeLeaveStaus = {
              markAsLeave: empStatus.markAsLeave,
              date: empStatus.date,
              applicationUsersId: user.id,
            };
            pushToArray.push(leaveData);
            await apiService.post(
              '/EmployeeStatus/AddEmployeeStatus',
              pushToArray
            );
            router.refresh();
            handleClose();
          }
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const clearError = (field: keyof typeof errors) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleProjectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const projectId = event.target.value;
    if (projectId) {
      clearError('projectID');
    }
    const moduleList: ModulesListModelParams = { id: projectId };
    try {
      const empModuleList = await EmployeeStatusProjectModulesList(moduleList);
      setEmpProjectModuleList(empModuleList || []);
    } catch (error) {
      setEmpProjectModuleList([]);
    }
  };

  const handleDelete = (index: number) => {
    const updatedStatusBoxes = [...statusBoxes];
    updatedStatusBoxes.splice(index, 1);
    setStatusBoxes(updatedStatusBoxes);
  };

  const handleEdit = (index: number) => {
    setIsSubmitClicked(false);
    setEditIndex(index);
    const dataToEdit = statusBoxes[index];
    // setFormData(dataToEdit);

    setValue('projectID', dataToEdit.projectID);
    setValue('moduleId', dataToEdit.moduleId);
    setValue('profileName', dataToEdit.profileName);
    setValue('date', dataToEdit.date);
    setValue('upworkHours', dataToEdit.upworkHours);
    setValue('fixedHours', dataToEdit.fixedHours);
    setValue('offlineHours', dataToEdit.offlineHours);
    setValue('memo', dataToEdit.memo);
    const updatedStatusBoxes = [...statusBoxes];
    updatedStatusBoxes.splice(index, 1);
    setStatusBoxes(updatedStatusBoxes);
  };

  const validateForm = (empStatus: EmployeeStatus) => {
    let isValid = true;
    const newErrors = {
      projectID: '',
      moduleId: '',
      profileName: '',
      date: '',
      memo: '',
    };

  
    for (const box of statusBoxes) {
      if (!box.projectID) {
        isValid = false;
        newErrors.projectID = 'Project ID is required';
      }
      if (!box.moduleId) {
        isValid = false;
        newErrors.moduleId = 'Module ID is required';
      }
      if (!box.profileName) {
        isValid = false;
        newErrors.profileName = 'Profile Name is required';
      }
      if (!box.date) {
        isValid = false;
        newErrors.date = 'Date is required';
      }
      if (!box.memo) {
        isValid = false;
        newErrors.memo = 'Memo is required';
      }
    }

    if (!empStatus.projectID) {
      isValid = false;
      newErrors.projectID = 'Project is required';
    }
    if (!empStatus.moduleId) {
      isValid = false;
      newErrors.moduleId = 'Module is required';
    }
    if (!empStatus.profileName) {
      isValid = false;
      newErrors.profileName = 'Profile Name is required';
    }
    if (!empStatus.date) {
      isValid = false;
      newErrors.date = 'Date is required';
    }
    if (!empStatus.memo) {
      isValid = false;
      newErrors.memo = 'Memo is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateFormforleave = (valiadteDate:any) => {
    let isValid = true;
    const newError = {
      date: '',
    };
    if (!valiadteDate) {
      isValid = false;
      newError.date = 'Date is required';
    }

    setError(newError);
    return isValid;
  };

  const addMoreForm = () => {
    const allFormValues = getValues();
   
    if (validateForm(allFormValues)) {
      if (editIndex !== null) {
        const updatedStatusBoxes = [...statusBoxes];
        updatedStatusBoxes[editIndex] = allFormValues;
        setStatusBoxes(updatedStatusBoxes);
        setEditIndex(null);
      } else {
        setStatusBoxes([...statusBoxes, allFormValues]);
      }
      reset(); 
      setAddModal(true);
      setNumStatusBoxes(numStatusBoxes + 1);
    }
  };

  const handleButtonClick = () => {
    setIsSubmitClicked(true);

  };

  return (
    <>
      <Offcanvas show={true} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Status</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
;          <form
            className='form-row'
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div
              className='offcanvas offcanvas-end ModalW500 show'
              tabIndex={-1}
              id='AddStatusModal'
              aria-labelledby='AddStatusModalLabel'
              aria-modal='true'
              role='dialog'
            >
              <div className='offcanvas-header'>
                <h5 id='AddStatusModalLabel'>Add Status</h5>
              </div>

              {addModal &&
                statusBoxes.map((status, index) => (
                  <div key={index} className='status-box'>
                    <div className='card custom-card status-card'>
                      <div className='card-body'>
                        <div className='d-flex justify-content-between gap-2'>
                          <div className='fs-12'>
                            <p className='fw-semibold mb-1 d-flex align-items-center fs-13'>
                              {status.profileName}
                            </p>
                            <p className='mb-1'>
                              Module :{' '}
                              <span className='mb-1 text-muted'>
                                {status.moduleId
                                  ? status.moduleId
                                  : 'No Module'}
                              </span>
                            </p>
                            <div className='status-left'>
                              <p className='mb-1'>
                                Profile :{' '}
                                <span className='mb-1 text-muted'>
                                  {status.profileName
                                    ? status.profileName
                                    : 'No Profile'}
                                </span>
                              </p>
                              <p className='mb-1'>
                                Date :{' '}
                                <span className='mb-1 text-muted'>
                                  {status.date ? status.date : 'No Date'}
                                </span>
                              </p>
                            </div>
                            <div className='status-right'>
                              <p className='mb-1'>
                                Upwork :{' '}
                                <span className='mb-1 text-muted'>
                                  {status.upworkHours
                                    ? `${status.upworkHours} hrs`
                                    : '00:00 hrs'}
                                </span>
                              </p>
                              <p className='mb-1'>
                                Fixed :{' '}
                                <span className='mb-1 text-muted'>
                                  {status.fixedHours
                                    ? `${status.fixedHours} hrs`
                                    : '00:00 hrs'}
                                </span>
                              </p>
                              <p className='mb-1'>
                                Offline :{' '}
                                <span className='mb-1 text-muted'>
                                  {status.offlineHours
                                    ? `${status.offlineHours} hrs`
                                    : '00:00 hrs'}
                                </span>
                              </p>
                            </div>
                            <p className='mb-1'>
                              Memo :{' '}
                              <span className='mb-1 text-muted'>
                                {status.memo ? status.memo : 'No Memo'}
                              </span>
                            </p>
                          </div>
                          <div>
                            <div className='btn-list d-flex align-items-start'>
                              <button
                                className='btn btn-sm btn-icon btn-wave btn-primary-light'
                                onClick={() => handleEdit(index)}
                              >
                                <i className='bi bi-pencil-square'></i>
                              </button>
                              <button
                                className='btn btn-sm btn-icon btn-wave btn-danger-light me-0'
                                onClick={() => handleDelete(index)}
                              >
                                <i className='bi bi-trash'></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div className='offcanvas-body'>
                <div className='status-repeat-box row'>
                  <label className='mark-leave'>
                    <input
                      type='checkbox'
                      {...register('markAsLeave')}
                      onChange={(e) => setMarkAsLeave(e.target.checked)}
                    />{' '}
                    Mark as Leave
                  </label>
                  <div className='col-md-6 form-group'>
                    <label>Project</label>
                    <span className='astrisk'>*</span>
                    <select
                      id='inputState'
                      className='form-control'
                      {...register('projectID', {})}
                      disabled={markAsLeave}
                      onChange={handleProjectChange}
                    >
                      <option value=''>Select Project</option>
                      {empProjectList?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.projectID && (
                      <div className='validation_error'>
                        <span role='alert'>{errors.projectID}</span>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 form-group'>
                    <label htmlFor='inputState'>Module</label>
                    <span className='astrisk'>*</span>
                    <select
                      id='moduleId'
                      className='form-control'
                      {...register('moduleId')}
                      disabled={markAsLeave}
                      onChange={() => {
                        clearError('moduleId');
                      }}
                    >
                      <option value=''>Select Module</option>
                      {empProjectModuleList?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.moduleId && (
                      <div className='validation_error'>
                        <span role='alert'>{errors.moduleId}</span>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Profile</label>
                    <span className='astrisk'>*</span>
                    <select
                      id='inputState'
                      className='form-control'
                      {...register('profileName')}
                      onChange={() => clearError('profileName')}
                      disabled={markAsLeave}
                    >
                      <option value=''>Select Profile</option>
                      {empProfileList?.map(
                        (item: EmployeeStatusUpworkProfileListModel) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        )
                      )}
                      disabled={markAsLeave}
                    </select>

                    {errors.profileName && (
                      <div className='validation_error'>
                        <span role='alert'>{errors.profileName}</span>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 form-group'>
                    <label htmlFor='inputState'>Date</label>
                    <span className='astrisk'>*</span>
                    <div className='input-group'>
                      <input
                        type='date'
                        className='form-control'
                        {...register('date')}
                        onChange={() => clearError('date')}
                      />
                    </div>
                    {markAsLeave
                      ? error.date && (
                          <div className='validation_error'>
                            <span role='alert'>{error.date}</span>
                          </div>
                        )
                      : errors.date && (
                          <div className='validation_error'>
                            <span role='alert'>{errors.date}</span>
                          </div>
                        )}
                  </div>
                  <div className='col-md-4 form-group mb-0'>
                    <label htmlFor='inputState'>Upwork Hours</label>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        {...register('upworkHours')}
                        disabled={markAsLeave}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 form-group mb-0'>
                    <label htmlFor='inputState'>Fixed Billing Hours</label>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        {...register('fixedHours')}
                        disabled={markAsLeave}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 form-group'>
                    <label htmlFor='inputState'>Non Billing Hours</label>
                    <div className='input-group'>
                      <input
                        type='text'
                        className='form-control'
                        {...register('offlineHours')}
                        disabled={markAsLeave}
                      />
                    </div>
                  </div>
                  <div
                    className='col-md-12 form-group'
                    style={{ marginBottom: '5px' }}
                  >
                    <label>Memo</label>
                    <span className='astrisk'>*</span>
                    <textarea
                      id='inputState'
                      className='form-control'
                      style={{ height: '61px' }}
                      {...register('memo')}
                      disabled={markAsLeave}
                      onChange={() => clearError('memo')}
                    ></textarea>
                    {errors.memo && (
                      <div className='validation_error'>
                        <span role='alert'>{errors.memo}</span>
                      </div>
                    )}
                  </div>
                  &nbsp;
                  <div className='col-md-12 form-group mb-0 testimonial-cards'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='autoSizingCheck2'
                        {...register('updatedClient')}
                        disabled={markAsLeave}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='autoSizingCheck2'
                      >
                        Update DSR To Client
                      </label>
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <a href='#' className='btn-link' onClick={addMoreForm}>
                    <i className='ri-add-line align-middle'></i> Add More
                  </a>
                </div>
              </div>
              <div className='offcanvas-footer text-right'>
                <button
                  className='btn btn-primary'
                  type='submit'
                  onClick={handleButtonClick}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
};

export default AddStatusForm;
