'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { format } from 'date-fns';
import DeveloperExcelReport from './developerExcelReport';

const DateFilter = ({param}:any) => {
    //Initialize hook
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();

    const activeTab = searchParams.get('tab');
 
    const [currentHoursFrom, setCurrentHoursFrom] = useState<any>(param.From);
    const [currentHoursTo, setCurrentHoursTo] = useState<any>(param.To);

    const handleHoursFrom = (e: any) => {
        const months = e.target.value;

        setCurrentHoursFrom(e.target.value);
        router.push(
            `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${param.PageSize}&from=${months}&to=${param.To}&search=${param.SearchValue}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}`
        );
    };
    const handleHoursTo = (e: any) => {
        const hours = e.target.value;
        setCurrentHoursTo(e.target.value);
        router.push(
            `${url}?tab=${activeTab}&pageNumber=${param.PageNumber}&pageSize=${param.PageSize}&from=${param.From}&to=${hours}&search=${param.SearchValue}&sortColumn=${param.SortColumn}&sortOrder=${param.SortOrder}`
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
            <DeveloperExcelReport param={param} />
        </>
    );
};
export default DateFilter;
