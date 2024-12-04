'use client';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { MonthlyFeedback } from '@/utils/types';
import { useForm } from 'react-hook-form';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewFeedBackForm = ({
  setShow,
  profileDetails,
  employeeData,
  performance,
}: any) => {
  const router = useRouter();
  const handleClose = () => {
    setShow(false);
    reset();
  };

  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [joiningDate, setJoiningDate] = useState(
    profileDetails?.joiningDate.split('T')[0]
  );
  const [assessmentMonthYear, setAssessmentMonthYear] = useState<string>('');

  const { register, handleSubmit, setValue, reset } =
    useForm<MonthlyFeedback>();

  useEffect(() => {
    setJoiningDate(profileDetails?.joiningDate.split('T')[0]);
  }, [profileDetails?.joiningDate]);

  useEffect(() => {
    if (employeeData) {

      reset(employeeData);
      setSelectedPerformance(employeeData.performance);

      if (employeeData.assessmentMonth) {
      
        const assessmentDate = new Date(employeeData.assessmentMonth);
        const year = assessmentDate.getFullYear();
        const month = (assessmentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0'); 
        const formattedMonthYear = `${year}-${month}`;
        setAssessmentMonthYear(formattedMonthYear);

      
      }
    }
  }, [employeeData,reset]);

  const handleRegistration = async (data: MonthlyFeedback) => {
    try {

      data.applicationUserId = profileDetails.employeeID;
      data.performance = selectedPerformance;
      const [year, month] = assessmentMonthYear.split('-');
      data.assessmentMonth = `${year}-${month}-01`;
      
      if (employeeData) {
        await apiService.put('/Employee/UpdateTraineeMonthlyFeedback', data);
      } else {
        await apiService.post('/Employee/AddMonthlyFeedback', data);
      }

      router.refresh();
      handleClose();
    } catch (error) {
      console.error('Error occurred during Feedback Submission:', error);
    }
  };

  const handlePerformanceChange = (value: any) => {
    setSelectedPerformance(value);
    setValue('performance', value);
  };

  const handleMonthYearChange = (event: any) => {
    setAssessmentMonthYear(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setJoiningDate(event.target.value);
  };

  return (
    <Offcanvas show={true} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Feedback form</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form
          className='status-repeat-box row m-0'
          onSubmit={handleSubmit(handleRegistration)}
        >
          <div
            className='offcanvas offcanvas-end ModalW500 feedback-form show'
            aria-labelledby='CreateNewFormModalLabel'
            aria-modal='true'
            role='dialog'
          >
            <div className='offcanvas-header'>
              <button
                type='button'
                className='btn-close text-reset'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              >
                <i className='fe fe-x fs-18'></i>
              </button>
            </div>
            <div className='offcanvas-body'>
              <div className='feedback-body m-0'>
                <div className='row'>
                  <div className='col-sm-12 form-group'>
                    <div className='d-flex gap-2 align-items-center'>
                      <label htmlFor='inputState' className='nowrap mb-1'>
                        Feedback Type
                      </label>
                      <select disabled id='inputState' className='form-control w250'>
                        <option>Monthly Trainee Feedback</option>
                        <option>Performance Feedback</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='status-repeat-box row m-0 p-0'>
                    <div className='card-header'>
                      <div className='card-title'>
                        Trainee Performance Evaluation
                      </div>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-6 form-group'>
                          <label>Name of the Trainee</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Vivek'
                            value={`${profileDetails?.firstName} ${profileDetails?.lastName}`}
                            disabled
                          />
                        </div>

                        <div className='col-md-6 form-group'>
                          <label>Department</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Dot Net'
                            value={profileDetails?.department}
                            disabled
                          />
                        </div>

                        <div className='col-md-6 form-group'>
                          <label>Designation</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Trainee'
                            value={profileDetails?.designation}
                            disabled
                          />
                        </div>
                        <div className='col-md-6 form-group'>
                          <label>
                            Date of Joining <span className='astrisk'>*</span>
                          </label>
                          <div className='input-group'>
                            <input
                              type='date'
                              className='form-control'
                              value={joiningDate} // Use state value for the input
                              onChange={handleDateChange}
                              disabled
                            />
                          </div>
                        </div>
                        <div className='col-md-6 form-group'>
                          <label>
                            Assessment Month <span className='astrisk'>*</span>
                          </label>
                          <div className='input-group'>
                            <input
                              type='month'
                              className='form-control'
                              value={assessmentMonthYear}
                              onChange={handleMonthYearChange}
                              disabled
                            />
                          </div>
                        </div>
                        <div className='col-md-6 form-group'>
                          <label htmlFor='inputState'>
                            Name of Immediate Mentor{' '}
                            <span className='astrisk'>*</span>
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder=''
                            {...register('mentorName')}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='status-repeat-box row  p-0'>
                    <div className='card-header'>
                      <div className='card-title'>
                        Feedback Form Immediate Mentor{' '}
                      </div>
                    </div>
                    <div className='card-body'>
                      <div className='row'>
                        <div className='col-md-12 form-group'>
                          <label>
                            Performance <span className='astrisk'>*</span>
                          </label>
                          <div className='d-flex performance-content'>
                            {performance?.map((item: any) => (
                              <label
                                key={item.value}
                                className='performance-label bg-transparent'
                              >
                                <input
                                  type='radio'
                                  name='performance'
                                  value={item.value}
                                  checked={selectedPerformance === item.value}
                                  onChange={() =>
                                    handlePerformanceChange(item.value)
                                  }
                                  disabled
                                />{' '}
                                {item.text}
                                
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className='col-md-12 form-group'>
                          <label>
                            Skill Set <span className='astrisk'>*</span>
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder=''
                            {...register('skillSet')}
                            disabled
                          />
                        </div>
                        <div className='col-md-12 form-group'>
                          <label>
                            Comments <span className='astrisk'>*</span>
                          </label>
                          <textarea
                            id='inputState'
                            className='form-control'
                            {...register('comments')}
                            disabled
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ViewFeedBackForm;
