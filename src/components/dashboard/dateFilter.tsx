'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const DateFilter = ({ month }: any) => {
    const [currentMonth, setCurrentMonth] = useState('');
    const router = useRouter();
    const url = usePathname();

    const handleDate = (e: { target: { value: any } }) => {
        const dateValue = e.target.value;
        setCurrentMonth(dateValue);
        router.push(`${url}/?month=${dateValue}`);
    };

    useEffect(() => {
        setCurrentMonth(month);
    }, [month]);

    return (
        <>
            <div className='month_filter'>
                <div className='d-flex gap-x-2 align-items-center selectbox w-auto'>
                    <p className='fw-semibold mb-3'>Select Month</p>
                    <div className='input-group date-selectbox mb-3'>
                        <input
                            type='month'
                            className='form-control'
                            value={currentMonth}
                            onChange={handleDate}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DateFilter;
