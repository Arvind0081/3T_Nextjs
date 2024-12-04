'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

const DateFilter = () => {
    //Initialize hook
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();

    //Get Params
    const activeTab = searchParams.get('tab');
    const searchQuery = searchParams?.get('search') ?? '';

    // Calculate DefaultValue for Calendar
    let today = new Date();
    let startDate = format(
        new Date(today.setDate(today.getDate() - 6)),
        'yyyy-MM-dd'
    );
    let endDate = format(new Date(), 'yyyy-MM-dd');

    //Declare State
    const [currentHoursFrom, setCurrentHoursFrom] = useState<any>(startDate);
    const [currentHoursTo, setCurrentHoursTo] = useState<any>(endDate);

    const handleHoursFrom = (e: any) => {
        const months = e.target.value;

        setCurrentHoursFrom(e.target.value);
        router.push(
            `${url}?tab=${activeTab}&hoursFrom=${months}&hoursTo=${currentHoursTo}&search=${searchQuery}`
        );
    };
    const handleHoursTo = (e: any) => {
        const hours = e.target.value;
        setCurrentHoursTo(e.target.value);
        router.push(
            `${url}?tab=${activeTab}&hoursFrom=${currentHoursFrom}&hoursTo=${hours}&search=${searchQuery}`
        );
    };

    const handleSearch = (e: any) => {
        const search = e.target.value;
        router.push(
          `${url}?tab=${activeTab}&hoursFrom=${currentHoursFrom}&hoursTo=${currentHoursTo}&pageNumber=${1}&search=${search}`
        );
      };

    return (
        <>
            <div className="align-items-end d-flex gap-x-2 selectbox">
                <p className="fw-semibold mb-2 nowrap">From:</p>
                <div className="input-group date-selectbox">
                    <input
                        type="date"
                        className="form-control"
                        value={currentHoursFrom ?? startDate}
                        onChange={handleHoursFrom}
                    />
                </div>
                <p className="fw-semibold mb-2 nowrap">To:</p>
                <div className="input-group date-selectbox">
                    <input
                        type="date"
                        className="form-control"
                        value={currentHoursTo ?? endDate}
                        onChange={handleHoursTo}
                    />
                </div>
                <div className="btn-list mt-md-0 mt-2  nowrap">
                    <div className="search_box mb-2">
                        <i className="ri-search-line"></i>
                        <input
                    className='form-control'
                    type='text'
                    placeholder='Search Here'
                    onChange={handleSearch}
                  />
                    </div>
                </div>
            </div>
        </>
    );
};
export default DateFilter;
