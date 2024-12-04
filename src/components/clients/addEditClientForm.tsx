'use client';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Client, DepartmentModel } from '@/utils/types';
import { useForm } from 'react-hook-form';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AddEditClientForm = ({setShow,departmentData,clientData }: any) => {
 
  const router = useRouter();
  const handleClose = () => {
    setShow(false);
    reset();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
   
  } = useForm<Client>();

  useEffect(() => {
    if (clientData) {
     reset(clientData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData]);

  const handleRegistration = async (data: Client) => {
    try {
      
      if (clientData) {
     
        await apiService.put('/Client/UpdateClient', data);
      } else {
   
        await apiService.post('/Client/AddClient', data);
      }
      router.refresh();
     
      handleClose();
    } catch (error) {
      console.error('Error occurred during client registration:', error);
    }
  };


  return (
    <>
      <Offcanvas show={true} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {clientData ? 'Edit Client' : 'Add Client'}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            className='status-repeat-box row m-0'
            onSubmit={handleSubmit(handleRegistration)}
          >
            
              <div className='col-md-12 form-group'>
                <label htmlFor='ClientName'>
                  Client Name
                  <span className='astrisk'>*</span>
                </label>
                <input
                  id='ClientName'
                  type='text'
                  className='form-control'
                  {...register('name', {
                    required: 'Client Name is required',
                  })}
                />
                {errors.name && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.name.message}</span>
                  </div>
                )}
              </div>
              <div className='col-md-12 form-group'>
                <label htmlFor='EmailId'>
                  Email id
                  <span className='astrisk'>*</span>
                </label>
                <input
                  id='EmailId'
                  type='text'
                  className='form-control'
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />
                {errors.email && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.email.message}</span>
                  </div>
                )}
              </div>
              <div className='col-md-12 form-group'>
                <label htmlFor='BillingAddress'>
                  Billing Address
                  <span className='astrisk'></span>
                </label>
                <input
                  id='BillingAddress'
                  type='text'
                  className='form-control'
                  {...register('billingAddress')}
                />
               
              </div>
              <div className='col-md-12 form-group'>
                <label htmlFor='SkypeId'>
                  Skype Id
                  <span className='astrisk'></span>
                </label>
                <input
                  id='SkypeId'
                  type='text'
                  className='form-control'
                  {...register('skypeid')}
                />
               
              </div>
              <div className='col-md-12 form-group'>
                <label htmlFor='PhoneNo'>
                  Phone No
                  <span className='astrisk'>*</span>
                </label>
                <input
                  id='PhoneNo'
                  type='text'
                  className='form-control'
                  {...register('phoneNumber', {
                    required: 'Phone Number is required',
                  })}
                />
                {errors.phoneNumber && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.phoneNumber.message}</span>
                  </div>
                )}
              </div>
              <div className='col-md-12 form-group'>
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
                //  defaultValue={clientData?.departmentId || ''}
                >
                  <option value=''>
                    Select a department
                  </option>
                  {departmentData?.map((item: DepartmentModel) => (
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

              <div className='col-md-12 form-group'>
                <label htmlFor='Country'>
                  Country
                  <span className='astrisk'>*</span>
                </label>
                <input
                  id='Country'
                  type='text'
                  className='form-control'
                  {...register('country', {
                    required: 'Country is required',
                  })}
                />
                {errors.country && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.country.message}</span>
                  </div>
                )}
              </div>
              <div className='col-md-12 form-group'>
                <label htmlFor='ClientCompanyName'>
                  Client Company Name
                  <span className='astrisk'>*</span>
                </label>
                <input
                  id='ClientCompanyName'
                  type='text'
                  className='form-control'              

                  {...register('clientCompanyName', {
                    required: 'Client Company Name is required',
                  })}
                  
                />
   {errors.clientCompanyName && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.clientCompanyName.message}</span>
                  </div>
                )}
              </div>
           
            <div className='offcanvas-footer text-right'>
              <input
                type='submit'
                value='Submit'
                className='btn btn-primary'
              />
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddEditClientForm;