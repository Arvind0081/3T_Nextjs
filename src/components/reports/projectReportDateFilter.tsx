'use client';
import  React,{useState} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ProjectExcelReport from './projectReportExcel';

const DateFilter = ({ param }:any) => {

  const router = useRouter();
  const url = usePathname();
  const searchParams = useSearchParams();

  // Get Params
  const activeTab = searchParams.get('tab');
  

  // Declare State
   const [currentProjectDate, setCurrentProjectDate] = useState<string | undefined>(param.StartDate);
   const [from, setFrom] = useState<string>(param.From);
   const [to, setTo] = useState<string>(param.To);


  const handleProjectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentProjectDate(e.target.value);
  };

  const handleHoursFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };

  const handleHoursTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };

  const handleSearch = () => {
    // Trigger the URL update with the current state
    router.push(
      `${url}/?tab=${activeTab}&pageNumber=1&pageSize=${param.PageSize}&projectStartDate=${currentProjectDate}&from=${from}&to=${to}&search=${param.SearchValue}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}&departmentId=${param.DepartmentId}&teamAdminId=${param.TeamAdminId}`
  );
}


  return (
    <div className='align-items-end d-flex gap-x-2 selectbox'>
      <p className='fw-semibold mb-2 nowrap'>Project Start Date:</p>
      <div className='input-group date-selectbox'>
        <input
          type='date'
          className='form-control'
          value={currentProjectDate || ''}
          onChange={handleProjectDate}
        />
      </div>
      <p className='fw-semibold mb-2 nowrap'> Hours From:</p>
      <div className='input-group date-selectbox'>
        <input
          type='date'
          className='form-control'
          value={from}
          onChange={handleHoursFrom}
        />
      </div>
      <p className='fw-semibold mb-2 nowrap'>Hours To:</p>
      <div className='input-group date-selectbox'>
        <input
          type='date'
          className='form-control'
          value={to}
          onChange={handleHoursTo}
        />
      </div>
      <div className='btn-list mt-md-0 mt-2  nowrap'>
        <button
          type='button'
          className='btn btn-primary btn-wave'
          onClick={handleSearch}
        >
          Search
        </button>
        <ProjectExcelReport param={param} />
      </div>
    </div>
  );
};

export default DateFilter;
