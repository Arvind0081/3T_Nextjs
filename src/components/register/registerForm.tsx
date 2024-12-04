'use client'
import {useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
 import { RegiserFormValues} from '@/utils/types';
 import apiService from '@/services/apiService';
import {DepartmentModel,DesignationModel} from '@/utils/types';
import {useRouter} from 'next/navigation';
//import Link from 'next/link';
import { designations } from '@/utils/publicApi';

const RegisterForm=({departmentData}:any)=>{

    const router=useRouter();
    // const [acceptTerms,setAcceptTerms]=useState<boolean>(false);
    // const [acceptTermsError,setAcceptTermsError]=useState<boolean>(false);
    const [designationData,setDesignationData]=useState<DesignationModel[]>([]);
    const { register, handleSubmit,formState: { errors },watch,reset,trigger} = useForm<RegiserFormValues>();


   // Watch password field value
  const password = watch('password');
  const phonenumber=watch('phoneNumber');
  const month=watch('month');
  const year=watch('year');
  const department =watch('departmentId');

  const handleRegisteration = async (data: RegiserFormValues) => {
// if(acceptTerms){
    const formData = new FormData();
    formData.append('FirstName', data.firstName);
    formData.append('LastName', data.lastName);
    formData.append('ProfileImage', data?.profileImage[0]);
    formData.append('Email', data.email);
    formData.append('PhoneNumber', data.phoneNumber);
    formData.append('Password', data.password);
    formData.append('DepartmentId',data.departmentId.toString());
    formData.append('Designation', data.designation);
    formData.append('EmployeeNumber', data.employeeNumber);
    formData.append('Address', data.address);
    formData.append('ExperienceOnJoining',(Number(data.month) + Number(data.year)*12).toString());
    formData.append('JoiningDate', data.joiningDate);
  try {
 
    await apiService.post('/Account/Register', formData);
         reset();
         router.push('/');
  } catch (error) {}
     
//   }else{
//     setAcceptTermsError(true);
//   }
};

useEffect(()=>{
    if(phonenumber){
        trigger('phoneNumber')
    }
    if(month){
        trigger('month')
    }
    if(year){
        trigger('year')
    }
    if(department){
        getDesignations(Number(department));
    }else{
        setDesignationData([]);
    }
},[phonenumber, month,year,department,trigger]);

const getDesignations=async(id:number)=>{
    try {
     const response  = await designations(id);
     setDesignationData(response);
    } catch (error) {
        
    }
}

    return(
        <form
        className='form-row'
        onSubmit={handleSubmit(handleRegisteration)}
    >
        <div className='form-row FlexFields'>
            <div className='form-group relative'>
                <label htmlFor='firstName'>
                    First Name
                    <span className='astrisk'>*</span>
                </label>
                <input
                    id='firstName'
                    type='text'
                    className='form-control'
                    {...register('firstName', {
                        required: 'First Name is required',
                    })}
                />
                {errors.firstName && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.firstName.message}
                        </span>
                    </div>
                )}
            </div>
            <div className='form-group'>
                <label htmlFor='lastName'>
                    Last Name
                    <span className='astrisk'>*</span>
                </label>
                <input
                    id='lastName'
                    type='text'
                    className='form-control'
                    {...register('lastName', {
                        required: 'Last Name is required',
                    })}
                />
                {errors.lastName && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.lastName.message}
                        </span>
                    </div>
                )}
            </div>
        </div>
        <div className='form-row FlexFields'>
            <div className='form-group'>
                <label htmlFor='email'>
                    Email <span className='astrisk'>*</span>
                </label>
                <input
                    type='email'
                    id='email'
                    className='form-control'
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                                'Entered value does not match email format',
                        },
                    })}
                />
                {errors.email && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.email.message}
                        </span>
                    </div>
                )}
            </div>
            <div className='form-group'>
                <label htmlFor='phoneNumber'>
                    Phone Number
                    <span className='astrisk'>*</span>
                </label>
                <input
                    id='phoneNumber'
                    type='tel'
                    className='form-control'
                    {...register('phoneNumber', {
                        required:
                            'Phone Number is required',
                        maxLength: {
                            value: 10,
                            message:
                                'Phone number must be exactly 10 digits',
                        },
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message:
                                'Phone number must contain only numbers',
                        },
                        // pattern: {
                        //     value: /^\+91[0-9]{10}$/,
                        //     message: 'Phone number must start with +91 and be followed by exactly 10 digits',
                        // },
                    })}
                   
                />
                {errors.phoneNumber && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.phoneNumber.message}
                        </span>
                    </div>
                )}
            </div>
        </div>
        <div className='form-row FlexFields'>
            <div className='form-group'>
                <label htmlFor='password'>
                    Password{' '}
                    <span className='astrisk'>*</span>
                </label>
                <input
                    id='password'
                    type='password'
                    className='form-control'
                    {...register('password', {
                        required: 'Password is required',
                    })}
                />
                {errors.password && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.password.message}
                        </span>
                    </div>
                )}
            </div>
            <div className='form-group'>
                <label htmlFor='confirmPassword'>
                    Confirm Password
                    <span className='astrisk'>*</span>
                </label>
                <input
                    id='confirmPassword'
                    type='password'
                    className='form-control'
                    {...register('confirmPassword', {
                        required:
                            'Confirm Password is required',
                            validate: value =>
                                value === password || 'Passwords do not match'
                    })}
                />
                {errors.confirmPassword && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.confirmPassword.message}
                        </span>
                    </div>
                )}
            </div>
        </div>
        <div className='form-row FlexFields'>
            <div className='form-group'>
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
                >
                    <option value=''>
                        Select Department
                    </option>

                    {departmentData.map(
                        (item: DepartmentModel) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        )
                    )}
                </select>
                {errors.departmentId && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.departmentId.message}
                        </span>
                    </div>
                )}
            </div>
            <div className='form-group'>
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
                    <option value=''>
                        Select Designation
                    </option>

                    {designationData.map(
                        (item: DesignationModel) => (
                            <option
                                key={item.id}
                                value={item.name}
                            >
                                {item.name}
                            </option>
                        )
                    )}
                </select>
                {errors.designation && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.designation.message}
                        </span>
                    </div>
                )}
            </div>
        </div>
        <div className='form-row FlexFields'>
            <div className='form-group'>
                <label htmlFor='joiningDate'>
                    Joining Date{' '}
                    <span className='tootip_content'>
                        <i
                            className='ri-question-fill'
                            data-bs-placement='top'
                            data-bs-toggle='tooltip-primary'
                            title='Lorem Ipsum'
                        ></i>
                    </span>{' '}
                    <span className='astrisk'>*</span>
                </label>
                <input
                    id='joiningDate'
                    type='date'
                    className='form-control'
                    {...register('joiningDate', {
                        required:
                            'Joining Date is required',
                    })}
                />
                {errors.joiningDate && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.joiningDate.message}
                        </span>
                    </div>
                )}
            </div>
            <div className='form-group'>
                <label htmlFor='month'>
                    Total Experience On Joining Date{' '}
                    <span className='astrisk'>*</span>
                </label>
                <div className="d-flex gap-x-2">
                <input min={0}
                max={12}
                    id='month'
                    className='form-control'
                    placeholder='Month'
                    type='number'
                    {...register('month', {
                        required:
                            'Total Experience is required',
                        max: {
                            value: 12,
                            message:
                                'Experience must be between 1 to 12',
                        },
                        min: {
                            value: 0,
                            message:
                                'Experience must be between 0 to 12',
                        },
                    })}
                />
                <input
                min={0}
                max={12}
                    id='year'
                    className='form-control'
                    placeholder='Year'
                    type='number'
                    {...register('year', {
                        required:
                            'Total Experience is required',
                        max: {
                            value: 12,
                            message:
                                'Experience must be between 1 to 12',
                        },
                        min: {
                            value: 0,
                            message:
                                'Experience must be between 0 to 12',
                        },
                    })}
                />
                </div>
                {errors.month && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {
                                errors.month
                                    .message
                            }
                        </span>
                    </div>
                )}
                 {errors.year && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {
                                errors.year
                                    .message
                            }
                        </span>
                    </div>
                )}
            </div>
            
        </div>

        <div className='form-row FlexFields'>
           
            <div className='form-group'>
                <label htmlFor='address'>
                    Address{' '}
                    <span className='astrisk'>*</span>
                </label>
                <input
                    id='address'
                    type='text'
                    className='form-control'
                    {...register('address', {
                        required: 'Address is required',
                    })}
                />
                {errors.address && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.address.message}
                        </span>
                    </div>
                )}
            </div>
            <div className='form-group'>
            <div className="d-flex justify-content-between">
                <label htmlFor='employeeNumber'>
                    Employee Id<sup className="astrick">*</sup>
                </label>
                <span className="" title="Please enter either Employee ID or Device ID. If you do not have this information, please contact HR for assistance."><i className="ri-information-fill"></i></span>
               </div>
                <input
                    id='employeeNumber'
                    type='text'
                    className='form-control'
                    {...register('employeeNumber', {
                        required: 'Employee Number is required',
                    })}
                />
                   {errors.employeeNumber && (
                    <div className='validation_error'>
                        <span role='alert'>
                            {errors.employeeNumber.message}
                        </span>
                    </div>
                )}
            </div>
        </div>

        <div className='form-row FlexFields'>
            <div className='form-group'>
                <label htmlFor='profileImage'>
                    Choose Profile Image
                </label>
                <input
                    id='profileImage'
                    className='form-control'
                    type='file'
                    accept=".png,.jpg,.jpeg"
                    {...register('profileImage')}
                />
            </div>
           
        </div>

        {/* <div className='form-row'>
            <div className='form-group custm_checkbox'>
                <label className='custom-control custom-checkbox mb-0'>
                    <input
                        type='checkbox'
                        className='custom-control-input'
                        name='example-checkbox1'
                      checked={acceptTerms}
                      onClick={()=>{setAcceptTerms(!acceptTerms);setAcceptTermsError(false);}}
                    />
                    <span className='custom-control-label'>
                        I Agree the{' '}
                        <Link href='#'>
                            terms and policy
                        </Link>
                    </span>
                </label>
                {acceptTermsError && <div className='validation_error'>
                                            <span role='alert'>
                                                    {'Accept terms & Conditions'}
                                                </span>
                                        </div>}
            </div>
        </div> */}
        <div className='form-row mb-2'>
            <input
                type='submit'
                value='Register'
                className='login100-form-btn btn-primary'
            />
        </div>
    </form>
    )

}

export default RegisterForm;


