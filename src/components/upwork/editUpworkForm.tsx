'use client';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { DepartmentModel, UpworkBodyParams } from '@/utils/types';
import { useForm } from 'react-hook-form';
import apiService from '@/services/apiService';
import { updateUpworkProfile } from '../common/constant';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const EditUpworkForm = ({
  departmentData,
  upworkProfileData,setShow,show,profileList
}: any) => {

const router=useRouter();

  const handleClose = () => setShow(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpworkBodyParams>();

  useEffect(() => {
   if(upworkProfileData){
reset(upworkProfileData);
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upworkProfileData]);

  const handleRegistration = async (data: UpworkBodyParams) => {
    try {
      await apiService.put(updateUpworkProfile, data);
      reset();
      handleClose();
      router.refresh();
    } catch (error) {
      console.error('Error occurred during Upwork registration:', error);
    }
  };
 

  return (

    <>
      <Offcanvas show={show} onHide={handleClose}  placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Upwork Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            className='status-repeat-box row m-0'
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className='col-md-12 form-group'>
              <div className='form-group relative'>
                <label htmlFor='name'>
                  Profile Name
                  <span className='astrisk'></span>
                </label>
                <input
                  id='name'
                  type='text'
                  className='form-control'
                  {...register('name', {
                    required: ' Profile Name is required',
                  })}
                />
                {errors.name && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.name.message}</span>
                  </div>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='departmentId'>
                  Department
                  <span className='astrisk'></span>
                </label>
                <select
                  id='departmentId'
                  className='form-control form-select select2'
                  {...register('departmentId', {
                    required: 'Department is required',
                  })}
                  defaultValue={upworkProfileData?.departmentId || ''}
                >
                  <option value='' disabled>
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

              <div className='form-group'>
                <label htmlFor='profileType'>
                Profile Type
                  <span className='astrisk'></span>
                </label>
                <select
                  id='profileType'
                  className='form-control form-select select2'
                  {...register('profileType', {
                    required: 'ProfileType is required',
                  })}
                  defaultValue={upworkProfileData?.profileType || ''}
                >
                  <option value='' disabled>
                    Select Profile Type
                  </option>
                  {profileList?.map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <div className='validation_error'>
                    <span role='alert'>{errors.departmentId.message}</span>
                  </div>
                )}
              </div>
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

export default EditUpworkForm;
