'use client';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Technology, UserTools } from '@/utils/types';
import { useForm } from 'react-hook-form';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import getUser from '@/utils/getUserClientSide';

const AddToolForm = ({ setShow, technologies, toolData }: any) => {
  const router = useRouter();
  const handleClose = () => {
    setShow(false);
    reset();
  };
  let user: any = getUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserTools>();

  const handleRegistration = async (data: UserTools) => {
    try {
      data.applicationUsersId = user.id;
      if (toolData) {
        await apiService.put('/UserProfile/UpdateUserTool', data);
      } else {
        await apiService.post('/UserProfile/AddUserTool', data);
      }

      router.refresh();

      handleClose();
    } catch (error) {
      console.error('Error occurred during client registration:', error);
    }
  };

  useEffect(() => {
    if (toolData) {
      reset(toolData);
    }
  }, [toolData, reset]);

  return (
    <>
      <Offcanvas show={true} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Your Tool</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            className='form-row'
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className='form-row FlexFields'>
              <div className='form-group'>
                <label htmlFor='departmentId'>
                  Technology
                  <span className='astrisk'></span>
                </label>
                <select
                  id='technology'
                  className='form-control form-select select2'
                  {...register('technology',{
                    required: 'technology is required',
                })}
                >
                  <option value=''>Select a technology</option>
                  {technologies?.map((item: Technology) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                
                </select>
                {errors.technology && (
                    <div className='validation_error'>
                      <span role='alert'>{errors.technology.message}</span>
                    </div>
                  )}
              </div>

              <div className='form-group relative'>
                <label htmlFor='localurl'>
                  Local url
                  <span className='astrisk'></span>
                </label>
                <input
                  id='localUrl'
                  type='text'
                  className='form-control'
                  {...register('localUrl')}
                />
              </div>
              <div className='form-group relative'>
                <label htmlFor='localUrl'>
                  Live Url
                  <span className='astrisk'></span>
                </label>
                <input
                  id='liveUrl'
                  type='text'
                  className='form-control'
                  {...register('liveUrl')}
                />
              </div>

              <div className='form-group relative'>
                <label htmlFor='networkUrl'>
                  network Url
                  <span className='astrisk'></span>
                </label>
                <input
                  id='networkUrl'
                  type='text'
                  className='form-control'
                  {...register('networkUrl')}
                />
              </div>

              <div className='col-md-12 form-group'>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  className='form-control h50'
                  {...register('description',{
                    required: 'description is required',
                })}
                >               
                </textarea>
                {errors.description && (
                    <div className='validation_error'>
                      <span role='alert'>{errors.description.message}</span>
                    </div>
                  )}
              </div>
            </div>
            <div className='form-row mb-'>
              <input
                type='submit'
                value='Submit'
                className='login100-form-btn btn-primary'
              />
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddToolForm;
