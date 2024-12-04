'use client';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Awards,} from '@/utils/types';
import { useForm } from 'react-hook-form';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';


const AssignAwardsForm = ({ setShow,awardId,employeeID }: any) => {
  const router = useRouter();
  const handleClose = () => {
    setShow(false);
    reset();
  };

  const {
   register,
    handleSubmit,
    formState: { },
    reset,
  } = useForm<Awards>();



  const handleRegistration = async (data: Awards) => {
    try {
     
       
      data.badgeId=awardId;
      data.userId=employeeID;
        await apiService.post('/Employee/AssignAward', data);
      
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
          <Offcanvas.Title>Project Manager Appreciation Award</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            className='status-repeat-box row m-0'
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className='col-md-12 form-group'>
              <label htmlFor='Description'>
                Description
                <span className='astrisk'></span>
              </label>
              <textarea id='Description'  className='form-control' 
                style={{ height: '150px' }}
               {...register('badgeDescription')}
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

export default AssignAwardsForm;