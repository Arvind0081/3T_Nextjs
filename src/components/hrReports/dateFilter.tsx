'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
const DateFilter = ({param}:any) => {
    // Initialize  hooks
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    const [currentMonth, setCurrentMonth] = useState('');
    const activeTab = searchParams.get('tab');
    const handleMonthChange = (e: any) => {
        
        const month = e.target.value;
        setCurrentMonth(e.target.value);
         router.push(
            `${url}/?tab=${activeTab}&month=${month}&departmentId=${param.DepartmentId}&pageNumber=${1}&pageSize=${param.PageSize}&search=${param.SearchValue}&teamAdminId=${param.TeamAdminId}`
          );
    };

        
    useEffect(() => {
       
        setCurrentMonth(param.date);
    }, [param.date]);
    return (
        <>
            <div className="align-items-end d-flex gap-x-2 selectbox">
                <p className="fw-semibold mb-2 nowrap">Select Month</p>
                <div className="input-group date-selectbox">
                    <input
                        type="month"
                        className="form-control"
                        value={currentMonth}
                        onChange={handleMonthChange}
                    />
                  
                </div>
            </div>
        </>
    );
};
export default DateFilter;