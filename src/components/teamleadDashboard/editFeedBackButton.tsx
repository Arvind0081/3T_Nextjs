'use client';
import React, { useState} from 'react';
import AddEditFeedbackForm from './addEditFeedBackForm';


const EditFeedBackButton = ({ performance, feedback ,profileDetails }: any) => {

  const [show, setShow] = useState(false);
  const [employeeData,setEmployeeData]=useState();

  const showModal = async() => {
    try {
      
     
      setEmployeeData(feedback);
      setShow(true);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
   
  };
  return (
    <>
      {show &&  (
        <AddEditFeedbackForm 
          name='Edit feedbackForm'      
          show={show} 
          setShow={setShow} 
          placement='end' 
          profileDetails={profileDetails}
          employeeData={employeeData}
          setClientData={setEmployeeData}
          performance={performance}
          feedBack={feedback}
        />
      )}
      <button onClick={showModal}>
        <i className="bi bi-pencil-square"></i>
      </button>
    </>
  );
};

export default EditFeedBackButton;