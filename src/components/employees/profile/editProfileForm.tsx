'use client';

import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  DepartmentModel,
  EmployeeProfileDetails,
  Technology,
} from '@/utils/types';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import '@tensorflow/tfjs-backend-webgl';
import apiService from '@/services/apiService';
import { Dropdown } from 'semantic-ui-react';

const EditProfileForm = ({
  department,
  designation,
  setShow,
  show,
  empStatus,
  data,
  technologies,
}: any) => {
  const router = useRouter();
  const handleClose = () => setShow(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeProfileDetails>();
  const [combinedTechnologies, setCombinedTechnologies] = useState<
    Technology[]
  >([]);

  useEffect(() => {
    if (data?.skills) {
      const existingSkills = data.skills.split(',');
      const additionalTechnologies = existingSkills
        .filter(
          (skill: any) => !technologies.some((tech: any) => tech.name === skill)
        )
        .map((skill: any) => ({ id: skill, name: skill }));
      setCombinedTechnologies([...technologies, ...additionalTechnologies]);
    } else {
      setCombinedTechnologies(technologies);
    }
  }, [data, technologies]);

  useEffect(() => {
    if (data) {
      const formattedProfileDetail = {
        ...data,
        joiningDate: data.joiningDate ? data.joiningDate.split('T')[0] : '',
        skills: data.skills ? data.skills.split(',') : [], // Ensure skills is an array
      };
      reset(formattedProfileDetail);
    }
  }, [data, reset]);

  const memberOptions = combinedTechnologies?.map((member: Technology) => ({
    key: member.id,
    text: member.name,
    value: member.name,
  }));

  const handleRegistration = async (formData: EmployeeProfileDetails) => {
    const updatedFormData = {
      ...formData,
      canEditStatus: formData.canEditStatus === 'true',
      skills: formData.skills?.join(','), // Convert skills array to comma-separated string
    };

    try {
      await apiService.put(
        '/Employee/UpdateEmployeeProfileDetails',
        updatedFormData
      );
      router.refresh();
      handleClose();
    } catch (error) {
      console.error('Error occurred during Update Employee Profile:', error);
    }
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            className='status-repeat-box row m-0'
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className='col-md-6 form-group'>
              <label htmlFor='firstName'>
                First Name
                <span className='astrisk'>*</span>
              </label>
              <input
                id='firstName'
                type='text'
                className='form-control'
                {...register('firstName', {
                  required: 'first Name is required',
                })}
              />
              {errors.firstName && (
                <div className='validation_error'>
                  <span role='alert'>{errors.firstName.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='lastName'>
                Last Name
                <span className='astrisk'>*</span>
              </label>
              <input
                id='lastName'
                type='text'
                className='form-control'
                {...register('lastName', { required: 'last Name is required' })}
              />
              {errors.lastName && (
                <div className='validation_error'>
                  <span role='alert'>{errors.lastName.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='email'>
                Email
                <span className='astrisk'>*</span>
              </label>
              <input
                id='email'
                type='text'
                className='form-control'
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <div className='validation_error'>
                  <span role='alert'>{errors.email.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='skypeMail'>
                Skype
                <span className='astrisk'></span>
              </label>
              <input
                id='skypeMail'
                type='text'
                className='form-control'
                {...register('skypeMail')}
              />
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='departmentId'>
                Department
                <span className='astrisk'>*</span>
              </label>
              <select
                id='departmentId'
                className='form-control form-select select2'
                {...register('departmentId', {
                  required: 'Department is required',
                })}
                disabled
              >
                <option value='' disabled>
                  Select a department
                </option>
                {department?.map((item: DepartmentModel) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <div className='validation_error'>
                  <span role='alert'>{errors.departmentId.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='designation'>
                Designation
                <span className='astrisk'>*</span>
              </label>
              <select
                id='designation'
                className='form-control form-select select2'
                {...register('designation', {
                  required: 'Designation is required',
                })}
              >
                <option value='' disabled>
                  Select a designation
                </option>
                {designation?.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.designation && (
                <div className='validation_error'>
                  <span role='alert'>{errors.designation.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='isActive'>
                Status
                <span className='astrisk'>*</span>
              </label>
              <select
                id='isActive'
                className='form-control form-select select2'
                {...register('isActive', { required: ' Status is required' })}
              >
                {empStatus.model?.map((item: any) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
              {errors.isActive && (
                <div className='validation_error'>
                  <span role='alert'>{errors.isActive.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='canEditStatus'>
                Can Edit Status
                <span className='astrisk'>*</span>
              </label>
              <select
                id='canEditStatus'
                className='form-control form-select select2'
                {...register('canEditStatus')}
              >
                <option value='false'>No</option>
                <option value='true'>Yes</option>
              </select>
              {/* {errors.canEditStatus && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.canEditStatus.message}</span>
                  </div>
                )} */}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='phoneNumber'>
                Phone Number
                <span className='astrisk'>*</span>
              </label>
              <input
                id='phoneNumber'
                type='text'
                className='form-control'
                {...register('phoneNumber', {
                  required: 'PhoneNumber is required',
                })}
              />
              {errors.phoneNumber && (
                <div className='validation_error'>
                  <span role='alert'>{errors.phoneNumber.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='joiningDate'>
                Date Of Joining
                <span className='astrisk'>*</span>
              </label>
              <input
                id='joiningDate'
                type='date'
                className='form-control'
                {...register('joiningDate', {
                  required: 'joining Date is required',
                })}
              />
              {errors.joiningDate && (
                <div className='validation_error'>
                  <span role='alert'>{errors.joiningDate.message}</span>
                </div>
              )}
            </div>

            <div className='col-md-12 form-group'>
              <label htmlFor='employeeList'>Skills</label>
              <Controller
                name='skills'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    id='Skills'
                    placeholder='Select Skills'
                    fluid
                    multiple
                    selection
                    search
                    options={memberOptions}
                    onChange={(e, { value }) => field.onChange(value)}
                    value={field.value || []}
                    allowAdditions
                    onAddItem={(e, { value }) => {
                      setCombinedTechnologies((prev: any) => [
                        ...prev,
                        { id: value, name: value },
                      ]);
                    }}
                  />
                )}
              />
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='address'>
                Address
                <span className='astrisk'></span>
              </label>
              <input
                id='address'
                type='text'
                className='form-control'
                {...register('address')}
              />
            </div>

            <div className='text-right mt-10'>
              <button className='btn btn-primary' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EditProfileForm;
