'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import AssignAwardsForm from './assignAwardsForm';

const   AddAwards = ({ data, department }: any) => {
  const [show, setShow] = useState(false);
  const [selectedAwardId, setSelectedAwardId] = useState(null);

  const showModal = (awardId: any) => {

    setSelectedAwardId(awardId);
    setShow(true);
  };

  return (
    <>
      <div className='p-4 border-bottom border-block-end-dashed'>
        <div>
          <p className='fs-15 mb-2 fw-semibold'>Assign Awards</p>
          <div className='d-flex mb-0 profile-awards assign-awards'>
            {data?.awardList?.map((award: any, index: any) => (
              <div
                key={index}
                className='mr-3'
                onClick={() => showModal(award.id)}
              >
                <Image
                  src={`data:image/jpeg;base64, ${award.base64Image}`}
                  width={150}
                  height={150}
                  alt={`award_${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {show && (
        <AssignAwardsForm
          name='Add Client'
          department={department}
          show={show}
          setShow={setShow}
          placement='end'
          awardId={selectedAwardId}
          employeeID={data.employeeID}
        />
      )}
    </>
  );
};

export default AddAwards;