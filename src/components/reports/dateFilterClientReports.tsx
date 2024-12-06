'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const DateFilterClientReports = ({param}:any) => {
    //Initialize hook
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    
    //Get Params
    const activeTab = searchParams.get('tab');
    
    //Declare State
    const [currentHoursFrom, setCurrentHoursFrom] = useState<any>(param.From);
    const [currentHoursTo, setCurrentHoursTo] = useState<any>(param.To);

    const handleHoursFrom = (e: any) => {
        const months = e.target.value;

        setCurrentHoursFrom(e.target.value);
        router.push(
            `${url}?tab=${activeTab}&from=${months}&to=${param.To}&departmentId=${param.DepartmentId}&teamAdminId=${param.TeamAdminId}`
        );
    };
    const handleHoursTo = (e: any) => {
        const hours = e.target.value;
        setCurrentHoursTo(e.target.value);
        router.push(
            `${url}?tab=${activeTab}&from=${param.From}&to=${hours}&departmentId=${param.DepartmentId}&teamAdminId=${param.TeamAdminId}`
        );
    };

    return (
        <>
            <div className="align-items-end d-flex gap-x-2 selectbox mb-1">
                <p className="fw-semibold mb-2">From:</p>
                <div className="input-group date-selectbox">
                    <input
                        type="date"
                        className="form-control"
                        value={currentHoursFrom}
                        onChange={handleHoursFrom}
                    />
                </div>
            </div>
            <div className="align-items-end d-flex gap-x-2 selectbox mb-1">
                <p className="fw-semibold mb-2">To:</p>
                <div className="input-group date-selectbox">
                    <input
                        type="date"
                        className="form-control"
                        value={currentHoursTo}
                        onChange={handleHoursTo}
                    />
                </div>
            </div>
        </>
    );
};
export default DateFilterClientReports;
