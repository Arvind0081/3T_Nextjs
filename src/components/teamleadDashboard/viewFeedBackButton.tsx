'use client';
import React, { useState} from 'react';
import ViewFeedBackForm from './viewFeedBackForm';


const ViewFeedBackButton = ({ performance, feedback ,profileDetails }: any) => {

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
        <ViewFeedBackForm 
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
      <i className="bi bi-eye"></i>
        
      </button>
    </>
  );
};

export default ViewFeedBackButton;