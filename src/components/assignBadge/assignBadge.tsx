'use client';
import React, { useState } from 'react';
import { AssignBagesModel } from '@/utils/types';
import { AssignBadges } from '@/utils/publicApi';

const AssignBadgeComponenet = ({param}:any) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const [currentMonth, setCurrentMonth] = useState(`${year}-${month}`);

  const handleMonthChange = (e: any) => {
    const month = e.target.value;
    setCurrentMonth(month);
  };

  const handleAssignBadge = async () => {
    try {
      let [year, month] = currentMonth.split('-');
      const payLoad: AssignBagesModel = {
        month: Number(month),
        year: Number(year),
        departmentId: param.departmentID,
      };

      await AssignBadges(payLoad);
    } catch (error) {}
  };

  return (
    <div className='row'>
      <div className='col-xl-12'>
        <div className='card custom-card'>
          <div className='card-body'>
            <div className='assign_badge_layout d-flex align-items-center justify-content-between'>
              <div className='card-title mb-0'>
                Assign Badges For Employee`s
              </div>
              <div className='filter-right d-flex gap-x-2'>
                <div className='selectbox'>
                  <div className='input-group date-selectbox'>
                    <input
                      type='month'
                      className='form-control'
                      value={currentMonth}
                      onChange={handleMonthChange}
                    />
                    {/* <div className='input-group-text'><i className='ri-calendar-line'></i></div> */}
                  </div>
                </div>
                <div className='btn-list mt-md-0 mt-2'>
                  <button
                    type='button'
                    className='btn btn-primary btn-wave'
                    onClick={handleAssignBadge}
                  >
                    Assign badge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignBadgeComponenet;
