'use client';
import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { DepartmentModel, MyProfileDetails, Technology } from '@/utils/types';
import { useForm, Controller } from 'react-hook-form';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { UpdateUserProfile } from '../common/constant';
import { Dropdown } from 'semantic-ui-react';

const EditProfileForm = ({
  department,
  designation,
  userProfileDetail,
  technologies,
  setShow,
  show,
}: any) => {
  const router = useRouter();
  const handleClose = () => setShow(false);

  const { control, register, handleSubmit, reset, formState: { errors } } =
    useForm<MyProfileDetails>();
  const [combinedTechnologies, setCombinedTechnologies] = useState<
    Technology[]
  >([]);

  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend('webgl');
      await cocoSsd.load();
    };
    loadModel();
  }, []);

  useEffect(() => {
    // Combine technologies with skills from userProfileDetail
    if (userProfileDetail?.skills) {
      const existingSkills = userProfileDetail.skills.split(',');
      const additionalTechnologies = existingSkills
        .filter(
          (skill: any) => !technologies.some((tech: any) => tech.name === skill)
        )
        .map((skill: any) => ({ id: skill, name: skill }));
      setCombinedTechnologies([...technologies, ...additionalTechnologies]);
    } else {
      setCombinedTechnologies(technologies);
    }
  }, [userProfileDetail, technologies]);

  const memberOptions = combinedTechnologies?.map((member: Technology) => ({
    key: member.id,
    text: member.name,
    value: member.name,
  }));

  const handleRegisteration = async (data: MyProfileDetails) => {

    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('FirstName', data.firstName);
    formData.append('LastName', data.lastName);
    formData.append('Email', data.email);
    formData.append('skypeMail', data.skypeMail || '');
    formData.append('DepartmentId', data.departmentId.toString());
    formData.append('Designation', data.designation);
    formData.append('skills', data.skills.join(','));
    formData.append('JoiningDate', data.joiningDate);
    formData.append('PhoneNumber', data.phoneNumber);
    formData.append('EmployeeNumber', data.employeeNumber);
    formData.append('Address', data.address);

    await apiService.put(`${UpdateUserProfile}`, formData);
    reset();
    handleClose();
    router.refresh();
  };

  useEffect(() => {
    if (userProfileDetail) {
      const formattedProfileDetail = {
        ...userProfileDetail,
        joiningDate: userProfileDetail.joiningDate
          ? userProfileDetail.joiningDate.split('T')[0]
          : '',
        skills: userProfileDetail.skills
          ? userProfileDetail.skills.split(',')
          : [],
      };
      reset(formattedProfileDetail);
    }
  }, [userProfileDetail, reset]);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            className='status-repeat-box row m-0'
            onSubmit={handleSubmit(handleRegisteration)}
          >
            <div className='col-md-6 form-group'>
              <label htmlFor='name'>
                First Name
                <span className='astrisk'>*</span>
              </label>
              <input
                id='name'
                type='text'
                className='form-control'
                {...register('firstName', {
                    required: 'first Name is required'
                  })}
              />
               {errors.firstName && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.firstName.message}</span>
                  </div>
                )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='name'>
                Last Name
                <span className='astrisk'>*</span>
              </label>
              <input
                id='lastName'
                type='text'
                className='form-control'
                {...register('lastName', {required: 'Last Name is required'})}
              />
               {errors.lastName && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.lastName.message}</span>
                  </div>
                )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='name'>
                Email
                <span className='astrisk'>*</span>
              </label>
              <input
                id='email'
                type='text'
                className='form-control'
                {...register('email', {required: 'Email is required'})}
              />
                      {errors.email && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.email.message}</span>
                  </div>
                )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='name'>
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
                {...register('departmentId', {required: 'Department is required'})}
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
                 {errors.departmentId && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.departmentId.message}</span>
                  </div>
                )}
              </select>
              
            </div>
            <div className='col-md-6 form-group'>
              <label htmlFor='designation'>
                Designation
                <span className='astrisk'>*</span>
              </label>
              <select
                id='designation'
                className='form-control form-select select2'
                {...register('designation',{required: 'Designation is required'})}
              >
                <option value='' disabled>
                  Select a designation
                </option>
                {designation?.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
                 {errors.designation && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.designation.message}</span>
                  </div>
                )}
              </select>
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
              <label htmlFor='joiningDate'>
                Date Of Joining
                <span className='astrisk'>*</span>
              </label>
              <input
                id='joiningDate'
                type='date'
                className='form-control'
                {...register('joiningDate',{required: 'joining Date is required'})}
              />
               {errors.joiningDate && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.joiningDate.message}</span>
                  </div>
                )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='tel'>
                Phone Number
                <span className='astrisk'>*</span>
              </label>
              <input
                id='name'
                type='text'
                className='form-control'
                {...register('phoneNumber', {required: 'PhoneNumber is required'})}
              />
               {errors.phoneNumber && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.phoneNumber.message}</span>
                  </div>
                )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='name'>
                Employee Number
                <span className='astrisk'>*</span>
              </label>
              <input
                id='name'
                type='text'
                className='form-control'
                {...register('employeeNumber', {required: 'EmployeeNumber is required'})}
                disabled
              />
               {errors.employeeNumber && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.employeeNumber.message}</span>
                  </div>
                )}
            </div>

            <div className='col-md-6 form-group'>
              <label htmlFor='name'>
                Address
                <span className='astrisk'></span>
              </label>
              <input
                id='name'
                type='text'
                className='form-control'
                {...register('address', {})}
              />
              
            </div>

            <div className='offcanvas-footer text-right'>
              <input type='submit' value='Submit' className='btn btn-primary' />
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EditProfileForm;
