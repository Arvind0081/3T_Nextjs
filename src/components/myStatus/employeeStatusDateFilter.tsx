"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const EmployeeStatusDateFilter = ({ data }: any) => {
  const [startDate, setStartDate] = useState(data.fromDate);
  const [endDate, setEndDate] = useState(data.toDate);
  const router = useRouter();
  const url = usePathname();

  const handleStartDate = (e: { target: { value: any } }) => {
    const startDateValue = e.target.value;
    setStartDate(startDateValue);
    router.push(
      `${url}/?page=${1}&size=${
        data.pageSize
      } &fromDate=${startDateValue}&toDate=${endDate}`
    );
  };



  const handleEndDate = (e: { target: { value: any } }) => {
    const endDateValue = e.target.value;
    setEndDate(endDateValue);
    router.push(
      `${url}/?page=${1}&size=${
        data.pageSize
      }&fromDate=${startDate}&toDate=${endDateValue}`
    );
  };

  return (
    <>
      <div className="selectbox">
        <p className="fw-semibold">Start Date</p>
        <div className="input-group date-selectbox">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={handleStartDate}
          />
        </div>
      </div>
      <div className="selectbox">
        <p className="fw-semibold">End Date</p>
        <div className="input-group date-selectbox">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={handleEndDate}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeStatusDateFilter;
