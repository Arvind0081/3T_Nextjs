'use client';
import React, { useState } from 'react';
import AddEditFeedbackForm from './addEditFeedBackForm';

const AddFeedbackButton = ({performance,  profileDetails,user}:any) => {

  const [show, setShow] = useState(false);

  const showModal = async () => {
    setShow(true);
  };

  return (
    <>
      {show && (
        <AddEditFeedbackForm
          name='Feedback Form'
          show={show}
          setShow={setShow}
          placement='end'
          profileDetails={profileDetails}
          user={user}
          performance={performance}
       
        />
      )}

      <button onClick={showModal} className='btn btn-bd-primaryadd' style={{ backgroundColor: '#7952b3', color: 'white' }}>
      <i className="bi bi-briefcase"></i> Add feedBack
      </button>
    </>
  );
};

export default AddFeedbackButton;