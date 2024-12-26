"use client";
import {
  moduleList,
  addEmployeeStatus,
  updateEmployeeStatus,
  deleteEmployeeStatus,
} from "@/utils/publicApi";
import {
  AddEmployeeStatusFormModel,
  ProjectModuleListModel,
  UpworkProfileListModel,
} from "@/utils/types";
import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useForm, Controller } from "react-hook-form";
import { format, subDays, addDays } from "date-fns";
import {
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import getUser from "@/utils/getUserClientSide";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import toastr from "toastr";
import { Dropdown } from "semantic-ui-react";

const AddEditStatusForm = ({
  show,
  setShow,
  projectsListFromDb,
  upwokProfileListFromDb,
  selectedStatus,
  setSelectedStatus,
  profileDetails,
}: any) => {
  let user: any = getUser();
  const router = useRouter();
  const [projectModulesMap, setProjectModulesMap] = useState<
    Record<number, ProjectModuleListModel[]>
  >({});
  const [individualStatusList, setIndividualStatusList] = useState<any[]>([]);
  const [addMore, setAddMore] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const sortedProjects = projectsListFromDb?.sort((a: any, b: any) => {
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
    setProjectModulesMap({});
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
  };

  const projectModuleList = async (id: number) => {
    const response = await moduleList(id);
    if (response === null || response === undefined) {
      toastr.warning("Please ask your TL to create a module", "Warning");
      return setProjectModulesMap((prev) => ({ ...prev, [id]: [] }));
    }
    setProjectModulesMap((prev) => ({ ...prev, [id]: response }));
  };

  const numberToTimeConversion = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const fractionalHours = decimalTime - hours;
    const minutes = Math.round(fractionalHours * 60);

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      ?.toString()
      .padStart(2, "0")}`;
    return formattedTime;
  };

  useEffect(() => {
    if (selectedStatus) {
      const statusArrayFromDB = selectedStatus.map((status: any) => {
        if (!projectModulesMap[status.projectID]) {
          projectModuleList(status.projectID);
        }
        const formattedDate = format(new Date(status.date), "yyyy-MM-dd");
        setSelectedDate(formattedDate);
        return {
          ...status,
          upworkHours: numberToTimeConversion(status.upworkHours),
          fixedHours: numberToTimeConversion(status.fixedHours),
          offlineHours: numberToTimeConversion(status.offlineHours),
          date: formattedDate,
        };
      });

      setIndividualStatusList(statusArrayFromDB);
    }
  }, [selectedStatus]);

  const leave = watch("markAsLeave");
  const projectId = watch("projectID");

  useEffect(() => {
    if (leave) {
      trigger("projectID");
      trigger("moduleId");
      trigger("profileId");
      trigger("date");
      trigger("upworkHours");
      trigger("fixedHours");
      trigger("offlineHours");
      trigger("memo");
      trigger("updatedClient");
      trigger("isSVNUpdated");
    }
  }, [leave, trigger]);

  useEffect(() => {
    if (projectId && !projectModulesMap[projectId]) {
      projectModuleList(Number(projectId));
      resetField("moduleId");
    }
  }, [projectId, resetField]);

  const timeToNumberConversion = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    if (hours === 12) {
      let val = hours.toString().padStart(2, "0");
      const timeDecimalString = `${hours === 12 ? 0 : val}.${minutes
        ?.toString()
        .padStart(2, "0")}`;
      return Number(timeDecimalString);
    } else {
      const timeDecimalString = `${hours.toString().padStart(2, "0")}.${minutes
        ?.toString()
        .padStart(2, "0")}`;
      return Number(timeDecimalString);
    }
  };

  const convertTimeToForm = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const timeDecimalString = dayjs().hour(hours).minute(minutes);
    return timeDecimalString;
  };

  const handleSubmitStatus = async (data: any) => {
    let payload: any[] = [];

    const inputData: any = {
      id: data ? data.id : 0,
      applicationUsersId: user.id,
      projectID: Number(data.projectID),
      date: selectedDate, // Use selectedDate instead of data.date
      moduleId: data.moduleId,
      profileId: Number(data.profileId),
      memo: data.memo,
      upworkHours: data.upworkHours
        ? format(new Date(data.upworkHours), "hh:mm")
        : "00:00",
      fixedHours: data.fixedHours
        ? format(new Date(data.fixedHours), "hh:mm")
        : "00:00",
      offlineHours: data.offlineHours
        ? format(new Date(data.offlineHours), "hh:mm")
        : "00:00",
      isSVNUpdated: data.isSVNUpdated,
      updatedClient: data.updatedClient,
      markAsLeave: data.markAsLeave,
    };

    payload = [...individualStatusList, inputData];

    if (addMore && data.id) {
      inputData.upworkHours = timeToNumberConversion(
        inputData.upworkHours.toString()
      );
      inputData.fixedHours = timeToNumberConversion(
        inputData.fixedHours.toString()
      );
      inputData.offlineHours = timeToNumberConversion(
        inputData.offlineHours.toString()
      );
      await updateEmployeeStatus(inputData);
    }

    if (!addMore && data.id) {
      inputData.upworkHours = timeToNumberConversion(
        inputData.upworkHours.toString()
      );
      inputData.fixedHours = timeToNumberConversion(
        inputData.fixedHours.toString()
      );
      inputData.offlineHours = timeToNumberConversion(
        inputData.offlineHours.toString()
      );
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
    setValue("projectID", null);
    setValue("moduleId", "");
    setValue("profileId", null);
    setValue("date", selectedDate); // Use selectedDate instead of current date
    setValue("upworkHours", null);
    setValue("fixedHours", null);
    setValue("offlineHours", null);
    setValue("memo", "");
    setValue("isSVNUpdated", false);
    setValue("updatedClient", false);
    setValue("markAsLeave", false);
    setValue("id", undefined);
  };

  const handleResetStatus = (data: any, value: any) => {
    if (!projectModulesMap[data.projectID]) {
      projectModuleList(data.projectID);
    }

    const status = {
      ...data,
      upworkHours: convertTimeToForm(data.upworkHours.toString()),
      fixedHours: convertTimeToForm(data.fixedHours.toString()),
      offlineHours: convertTimeToForm(data.offlineHours.toString()),
      date: data.date,
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow date change if there are no statuses in the list
    if (individualStatusList.length === 0) {
      setSelectedDate(e.target.value);
      setValue("date", e.target.value);
    }
  };

  const projectOptions = (sortedProjects || []).map((project: any) => ({
    key: project.id,
    text: project.name,
    value: project.id,
  }));

  const getModuleOptions = (projectId: number) => {
    const modules = projectModulesMap[projectId] || [];
    return modules.map((module) => ({
      key: module.id,
      text: module.name,
      value: module.id,
    }));
  };

  const getProjectRestrictions = (project: any) => {
    if (!project) return {};

    const { isBilling } = project;

    if (isBilling === 0) {
      return { disable: [] };
    }

    if (isBilling === 1 || isBilling === 2) {
      return { disable: ["offlineHours"] };
    }

    if (isBilling === 3) {
      return { disable: ["upworkHours", "fixedHours"] };
    }

    return {};
  };

  const selectedProject = projectsListFromDb?.find(
    (project: any) => project.id === Number(projectId)
  );
  const { disable } = getProjectRestrictions(selectedProject);

  const today = new Date();
  const lastFiveDays = Array.from({ length: 5 }, (_, index) =>
    format(subDays(today, index), "yyyy-MM-dd")
  );

  const isEditable = profileDetails?.model?.userProfile?.canEditStatus;
  const maxDate = format(today, "yyyy-MM-dd");
  const minDate = isEditable ? undefined : lastFiveDays[4];
  const maxDateForLastFiveDays = isEditable ? undefined : lastFiveDays[0];

  // Date field should be disabled if there are existing statuses
  const isDateDisabled = individualStatusList.length > 0;

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
            {selectedStatus ? "Update Status" : "Add Status"}
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
                        Module :{" "}
                        <span className="mb-1 text-muted">
                          {item.moduleName
                            ? item.moduleName
                            : projectModulesMap[item.projectID]?.filter(
                                (module) => module.id === item.moduleId
                              )[0]?.name}
                        </span>
                      </p>
                      <div className="status-left">
                        <p className="mb-1">
                          Profile :{" "}
                          <span className="mb-1 text-muted">
                            {item.profileName
                              ? item.profileName
                              : upwokProfileListFromDb?.filter(
                                  (upwork: any) => upwork.id === item.profileId
                                )[0].name}
                          </span>
                        </p>
                        <p className="mb-1">
                          Date :{" "}
                          <span className="mb-1 text-muted">{item.date}</span>
                        </p>
                      </div>
                      <div className="status-right">
                        <p className="mb-1">
                          Upwork :{" "}
                          <span className="mb-1 text-muted">
                          {item.upworkHours} hrs
                          </span>
                        </p>
                        <p className="mb-1">
                          Fixed :{" "}
                          <span className="mb-1 text-muted">
                            {item.fixedHours} hrs
                          </span>
                        </p>
                        <p className="mb-1">
                          Offline :{" "}
                          <span className="mb-1 text-muted">
                            {item.offlineHours} hrs
                          </span>
                        </p>
                      </div>
                      <p className="mb-1">
                        Memo :{" "}
                        <span className="mb-1 text-muted">{item.memo}</span>
                      </p>
                      <p className="mb-1">
                        Is DevOps Updated :{" "}
                        <span className="mb-1 text-muted">
                          {item.isSVNUpdated ? "true" : "false"}
                        </span>
                      </p>
                      <p className="mb-1">
                        Update DSR To Client :{" "}
                        <span className="mb-1 text-muted">
                          {item.updatedClient ? "true" : "false"}
                        </span>
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
          <form className="form-row" onSubmit={handleSubmit(handleSubmitStatus)}>
            <div>
              <div className="offcanvas-body">
                <div className="status-repeat-box row">
                  <label htmlFor="markAsLeave" className="mark-leave">
                    <input
                      id="markAsLeave"
                      type="checkbox"
                      {...register("markAsLeave")}
                    />{" "}
                    Mark as Leave
                  </label>
                  <div className="col-md-6 form-group">
                    <label htmlFor="projectID">Project</label>
                    <span className="astrisk">*</span>
                    <Controller
                      name="projectID"
                      control={control}
                      rules={{
                        required: leave ? undefined : "Project is required",
                      }}
                      render={({ field }) => (
                        <Dropdown
                          id="projectID"
                          placeholder="Select Project"
                          fluid
                          selection
                          search
                          options={projectOptions}
                          disabled={leave}
                          value={field.value || ""}
                          onChange={(e, { value }) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.projectID && (
                      <div className="validation_error">
                        <span role="alert">{errors.projectID.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="moduleId">Module</label>
                    <span className="astrisk">*</span>
                    <Controller
                      name="moduleId"
                      control={control}
                      rules={{
                        required: leave ? false : "Module is required",
                      }}
                      render={({ field }) => (
                        <Dropdown
                          id="moduleId"
                          placeholder="Select Module"
                          fluid
                          selection
                          search
                          options={getModuleOptions(Number(projectId))}
                          disabled={leave}
                          value={field.value || ""}
                          onChange={(e, { value }) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.moduleId && (
                      <div className="validation_error">
                        <span role="alert">{errors.moduleId.message}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="profileId">Profile</label>
                    <span className="astrisk">*</span>
                    <select
                      id="profileId"
                      className="form-control"
                      {...register("profileId", {
                        required: leave ? false : "Profile Name is required",
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
                    <span className="astrisk">*</span>
                    <div className="input-group">
                      <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={selectedDate}
                        onChange={handleDateChange}
                        disabled={isDateDisabled || leave}
                        min={minDate}
                        max={isEditable ? maxDate : maxDateForLastFiveDays}
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
                          render={({ field }) => (
                            <MobileTimePicker
                              disabled={disable?.includes("upworkHours") || leave}
                              value={field.value || null}
                              onChange={field.onChange}
                              className="hideBtn"
                              ampm={true}
                              views={["hours", "minutes"]}
                              format={"HH:mm"}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
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
                              disabled={disable?.includes("fixedHours") || leave}
                              value={field.value || null}
                              onChange={field.onChange}
                              ampm={true}
                              views={["hours", "minutes"]}
                              format={"HH:mm"}
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
                              disabled={disable?.includes("offlineHours") || leave}
                              value={field.value || null}
                              onChange={field.onChange}
                              ampm={true}
                              views={["hours", "minutes"]}
                              format={"HH:mm"}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginBottom: "5px" }}
                  >
                    <label htmlFor="memo">Memo</label>
                    <textarea
                      id="memo"
                      className="form-control"
                      style={{ height: "61px" }}
                      {...register("memo", {
                        required: leave ? false : "Memo is required",
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
                        id="isSVNUpdated"
                        {...register("isSVNUpdated")}
                        disabled={leave}
                      />
                      <label className="form-check-label" htmlFor="isSVNUpdated">
                        Is DevOps Updated
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="updatedClient"
                        {...register("updatedClient")}
                        disabled={leave}
                      />
                      <label className="form-check-label" htmlFor="updatedClient">
                        Update DSR To Client
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <input
                    type="submit"
                    onClick={() => setAddMore(true)}
                    value="Add More"
                    className="btn-link"
                  />
                  <i className="ri-add-line align-middle"></i>
                </div>
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