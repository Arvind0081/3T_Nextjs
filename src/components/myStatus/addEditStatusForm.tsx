'use client';
import {
  moduleList,
  addEmployeeStatus,
  updateEmployeeStatus,
  deleteEmployeeStatus,
} from '@/utils/publicApi';
import {
  AddEmployeeStatusFormModel,
  ProjectModuleListModel,
  UpworkProfileListModel,
} from '@/utils/types';
import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import {
  LocalizationProvider,
  MobileTimePicker,
} from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import getUser from '@/utils/getUserClientSide';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
 
const AddEditStatusForm = ({
  show,
  setShow,
  projectsListFromDb,
  upwokProfileListFromDb,
  selectedStatus,
  setSelectedStatus,
}: any) => {
  let user: any = getUser();
  const router = useRouter();
  const [projectModules, setProjectModules] =
    useState<ProjectModuleListModel[]>();
  const [individualStatusList, setIndividualStatusList] = useState<any[]>([]);
  const [addMore, setAddMore] = useState(false);
  const sortedProjects = projectsListFromDb.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name);
  });
 
  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    watch,
    trigger,
    reset,
    setValue,
  } = useForm<AddEmployeeStatusFormModel>();
 
  const handleClose = () => {
    if (selectedStatus) {
      setSelectedStatus([]);
    }
    setShow(false);
    reset();
    clearFormFields();
    setIndividualStatusList([]);
  };
 
  const projectModuleList = async (id: number) => {
    const response = await moduleList(id);
    setProjectModules(response);
  };
 
  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);
 
    // Format time string to HH:mm
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')}`;
    return formattedTime;
  };
 
  useEffect(() => {
    if (selectedStatus) {
      const statusArrayFromDB = selectedStatus.map((status: any) => {
        return {
          ...status,
          upworkHours: numberToTimeConversion(status.upworkHours),
          fixedHours: numberToTimeConversion(status.fixedHours),
          offlineHours: numberToTimeConversion(status.offlineHours),
          date: format(new Date(status.date), 'yyyy-MM-dd'),
        };
      });
 
      setIndividualStatusList(statusArrayFromDB);
    }
  }, [selectedStatus]);
 
  const leave = watch('markAsLeave');
  const project = watch('projectID');
 
  useEffect(() => {
    if (leave) {
      trigger('projectID');
      trigger('moduleId');
      trigger('profileId');
      trigger('date');
      trigger('upworkHours');
      trigger('fixedHours');
      trigger('offlineHours');
      trigger('memo');
      trigger('updatedClient');
    }
  }, [leave, trigger]);
 
  useEffect(() => {
    if (project) {
      projectModuleList(Number(project));
      resetField('moduleId');
    }
  }, [project, resetField]);
 
  const timeToNumberConversion = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    if (hours === 12) {
      let val = hours.toString().padStart(2, '0');
      const timeDecimalString = `${hours === 12 ? 0 : val}.${minutes?.toString().padStart(2, '0')}`;
      return Number(timeDecimalString);
    } else {
      const timeDecimalString = `${hours.toString().padStart(2, '0')}.${minutes?.toString().padStart(2, '0')}`;
      return Number(timeDecimalString);
    }
  };
 
  const convertTimeToForm = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const timeDecimalString = dayjs().hour(hours).minute(minutes);
    return timeDecimalString;
  };
 
  const handleSubmitStatus = async (data: any) => {
    let payload: any[] = [];
 
    const inputData: any = {
      id: data ? data.id : 0,
      applicationUsersId: user.id,
      projectID: Number(data.projectID),
      date: data.date,
      moduleId: data.moduleId,
      profileId: Number(data.profileId),
      memo: data.memo,
      upworkHours: data.upworkHours
        ? format(new Date(data.upworkHours), 'hh:mm')
        : '00:00',
      fixedHours: data.fixedHours
        ? format(new Date(data.fixedHours), 'hh:mm')
        : '00:00',
      offlineHours: data.offlineHours
        ? format(new Date(data.offlineHours), 'hh:mm')
        : '00:00',
      //isSVNUpdated: boolean,
      updatedClient: data.updatedClient,
      markAsLeave: data.markAsLeave,
    };
 
    payload = [...individualStatusList, inputData];
 
    if (addMore && data.id) {
      (inputData.upworkHours = timeToNumberConversion(
        inputData.upworkHours.toString()
      )),
        (inputData.fixedHours = timeToNumberConversion(
          inputData.fixedHours.toString()
        )),
        (inputData.offlineHours = timeToNumberConversion(
          inputData.offlineHours.toString()
        )),
        await updateEmployeeStatus(inputData);
      //router.refresh();
      //  handleClose();
    }
 
    if (!addMore && data.id) {
      (inputData.upworkHours = timeToNumberConversion(
        inputData.upworkHours.toString()
      )),
        (inputData.fixedHours = timeToNumberConversion(
          inputData.fixedHours.toString()
        )),
        (inputData.offlineHours = timeToNumberConversion(
          inputData.offlineHours.toString()
        )),
        await updateEmployeeStatus(inputData);
      router.refresh();
      handleClose();
    }
 
    if (!addMore && data.id == undefined) {
      payload = payload.map((status: any) => {
        return {
          ...status,
          upworkHours: timeToNumberConversion(status.upworkHours.toString()),
          fixedHours: timeToNumberConversion(status.fixedHours.toString()),
          offlineHours: timeToNumberConversion(status.offlineHours.toString()),
        };
      });
      payload = payload.filter((status: any) => status.id === undefined);
 
      await addEmployeeStatus(payload);
      router.refresh();
      handleClose();
    } else {
      setIndividualStatusList(payload);
    }
 
    clearFormFields();
  };
 
  const clearFormFields = () => {
    setValue('projectID', null);
    setValue('moduleId', '');
    setValue('profileId', null);
    setValue('date', '');
    setValue('upworkHours', null);
    setValue('fixedHours', null);
    setValue('offlineHours', null);
    setValue('memo', '');
    setValue('updatedClient', false);
    setValue('markAsLeave', false);
    setValue('id', undefined);
  };
  const handleResetStatus = (data: any, value: any) => {
    const status = {
      ...data,
      upworkHours: convertTimeToForm(data.upworkHours.toString()),
      fixedHours: convertTimeToForm(data.fixedHours.toString()),
      offlineHours: convertTimeToForm(data.offlineHours.toString()),
      date: format(new Date(data.date), 'yyyy-MM-dd'),
    };
    reset(status);
    const updatedData: any = individualStatusList.filter(
      (item, index) => index != value
    );
    setIndividualStatusList(updatedData);
  };
 
  const handleRemoveStatus = async (value: any) => {
    if (selectedStatus) {
      try {
        const id: number = individualStatusList.filter(
          (item, index) => index == value
        )[0].id;
        await deleteEmployeeStatus(id);
        const updatedData: any = individualStatusList.filter(
          (item, index) => index != value
        );
        setIndividualStatusList(updatedData);
        router.refresh();
        handleClose();
      } catch (error) {}
    } else {
      const updatedData: any = individualStatusList.filter(
        (item, index) => index != value
      );
      setIndividualStatusList(updatedData);
    }
  };
 
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="ModalW500"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {selectedStatus ? 'Update Status' : 'Add Status'}
          </Offcanvas.Title>
          <button
            type="button"
            className="btn-close text-reset text-right"
            onClick={() => handleClose()}
          >
            <i className="fe fe-x fs-18"></i>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="card custom-card status-card">
            {individualStatusList &&
              individualStatusList.map((item, index) => (
                <div key={item.id} className="card-body">
                  <div className="d-flex justify-content-between gap-2">
                    <div className="fs-12">
                      <p className="fw-semibold mb-1 d-flex align-items-center fs-13">
                        {
                          sortedProjects?.filter(
                            (project: any) => project.id === item.projectID
                          )[0].name
                        }
                      </p>
                      <p className="mb-1">
                        Module :{' '}
                        <span className="mb-1 text-muted">
                          {item.moduleName
                            ? item.moduleName
                            : projectModules?.filter(
                                (module) => module.id === item.moduleId
                              )[0]?.name}
                        </span>
                      </p>
                      <div className="status-left">
                        <p className="mb-1">
                          Profile :{' '}
                          <span className="mb-1 text-muted">
                            {item.profileName
                              ? item.profileName
                              : upwokProfileListFromDb?.filter(
                                  (upwork: any) => upwork.id === item.profileId
                                )[0].name}
                          </span>
                        </p>
                        <p className="mb-1">
                          Date :{' '}
                          <span className="mb-1 text-muted">{item.date}</span>
                        </p>
                      </div>
                      <div className="status-right">
                        <p className="mb-1">
                          Upwork :{' '}
                          <span className="mb-1 text-muted">
                            {item.upworkHours} hrs
                          </span>
                        </p>
                        <p className="mb-1">
                          Fixed :{' '}
                          <span className="mb-1 text-muted">
                            {item.fixedHours} hrs
                          </span>
                        </p>
                        <p className="mb-1">
                          Offline :{' '}
                          <span className="mb-1 text-muted">
                            {item.offlineHours} hrs
                          </span>
                        </p>
                      </div>
                      <p className="mb-1">
                        Memo :{' '}
                        <span className="mb-1 text-muted">{item.memo}</span>
                      </p>
                    </div>
                    <div>
                      <div className="btn-list d-flex align-items-start">
                        <button
                          onClick={() => handleResetStatus(item, index)}
                          className="btn btn-sm btn-icon btn-wave btn-primary-light"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          onClick={() => handleRemoveStatus(index)}
                          className="btn btn-sm btn-icon btn-wave btn-danger-light me-0"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <form
            className="form-row"
            onSubmit={handleSubmit(handleSubmitStatus)}
          >
            <div>
              <div className="offcanvas-body">
                <div className="status-repeat-box row">
                  <label htmlFor="markAsLeave" className="mark-leave">
                    <input
                      id="markAsLeave"
                      type="checkbox"
                      {...register('markAsLeave')}
                    />{' '}
                    Mark as Leave
                  </label>
                  <div className="col-md-6 form-group">
                    <label htmlFor="projectID">Project</label>
                    <select
                      id="projectID"
                      className="form-control"
                      {...register('projectID', {
                        required: leave ? false : 'Project is required',
                      })}
                      disabled={leave}
                    >
                      <option value="">Select Project</option>
                      {projectsListFromDb?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.projectID && (
                      <div className="validation_error">
                        <span role="alert">{errors.projectID.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="moduleId">Module</label>
                    <select
                      id="moduleId"
                      className="form-control"
                      {...register('moduleId', {
                        required: leave ? false : 'Module is required',
                      })}
                      disabled={leave}
                    >
                      <option value="">Select Module</option>
                      {projectModules?.map((item: ProjectModuleListModel) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.moduleId && (
                      <div className="validation_error">
                        <span role="alert">{errors.moduleId.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="profileId">Profile</label>
                    <select
                      id="profileId"
                      className="form-control"
                      {...register('profileId', {
                        required: leave ? false : 'Profile Name is required',
                      })}
                      disabled={leave}
                    >
                      <option value="">Select Profile</option>
                      {upwokProfileListFromDb?.map(
                        (item: UpworkProfileListModel) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        )
                      )}
                    </select>
                    {errors.profileId && (
                      <div className="validation_error">
                        <span role="alert">{errors.profileId.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="date">Date</label>
                    <div className="input-group">
                      <input
                        type="date"
                        id="date"
                        defaultValue={format(new Date(), 'yyyy-MM-dd')}
                        className="form-control"
                        {...register('date', {
                          required: 'Date is required',
                        })}
                      />
                    </div>
                    {errors.date && (
                      <div className="validation_error">
                        <span role="alert">{errors.date.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 form-group mb-0">
                    <label htmlFor="upworkHours">Upwork Hours</label>
                    <div className="input-group">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="upworkHours"
                          control={control}
                          // rules={{ required:leave?false: 'Upwork Hours is required' }}
                          render={({ field }) => (
                            <MobileTimePicker
                              disabled={leave}
                              value={field.value || null}
                              onChange={field.onChange}
                              className="hideBtn"
                              ampm={true}
                              views={['hours', 'minutes']}
                              format={'HH:mm'}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
 
                    {/* {errors.upworkHours && (
                      <div className='validation_error'>
                        <span role='alert'>{errors.upworkHours.message}</span>
                      </div>
                    )} */}
                  </div>
                  <div className="col-md-4 form-group mb-0">
                    <label htmlFor="fixedHours">Fixed Billing Hours</label>
                    <div className="input-group">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="fixedHours"
                          control={control}
                          render={({ field }) => (
                            <MobileTimePicker
                              disabled={leave}
                              value={field.value || null}
                              onChange={field.onChange}
                              ampm={true}
                              views={['hours', 'minutes']}
                              format={'HH:mm'}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="col-md-4 form-group">
                    <label htmlFor="offlineHours">Non Billing Hours</label>
                    <div className="input-group">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="offlineHours"
                          control={control}
                          render={({ field }) => (
                            <MobileTimePicker
                              disabled={leave}
                              value={field.value || null}
                              onChange={field.onChange}
                              ampm={true}
                              views={['hours', 'minutes']}
                              format={'HH:mm'}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginBottom: '5px' }}
                  >
                    <label htmlFor="memo">Memo</label>
                    <textarea
                      id="memo"
                      className="form-control"
                      style={{ height: '61px' }}
                      {...register('memo', {
                        required: leave ? false : 'Memo is required',
                      })}
                      disabled={leave}
                    ></textarea>
                    {errors.memo && (
                      <div className="validation_error">
                        <span role="alert">{errors.memo.message}</span>
                      </div>
                    )}
                  </div>
                  &nbsp;
                  <div className="col-md-12 form-group mb-0 testimonial-cards">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="updatedClient"
                        {...register('updatedClient')}
                        disabled={leave}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="updatedClient"
                      >
                        Update DSR To Client
                      </label>
                    </div>
                  </div>
                </div>
                {/* {selectedStatus === undefined && ( */}
                <div className="text-right">
                  <input
                    type="submit"
                    onClick={() => setAddMore(true)}
                    value="Add More"
                    className="btn-link"
                  />
                  <i className="ri-add-line align-middle"></i>
                </div>
                {/* )} */}
              </div>
              <div className="offcanvas-footer text-right">
                <input
                  onClick={() => setAddMore(false)}
                  type="submit"
                  value="Submit Status"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
 
export default AddEditStatusForm;