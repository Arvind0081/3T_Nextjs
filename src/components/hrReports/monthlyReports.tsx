'use client';
import Image from 'next/image';
import DateFilter from './dateFilter';
import ExportExcel from './exportExcel';
import { useSearchParams } from 'next/navigation';
import Paginator from '@/components/hrReports/pagination';
 

import { useRouter, usePathname } from 'next/navigation';

const MonthlyReports = ({ monthlyReports }: any) => {
    
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    let dateStr = searchParams.get('month');
    let query: any;
    let pageSize: any = searchParams.get('size') ?? 10;
    let currentPage: any = searchParams.get('page') ?? 1;
    const totalCount = monthlyReports?.totalCount || 0;

    const totalEntries =
        totalCount < pageSize * currentPage
            ? totalCount
            : pageSize * currentPage;

    if (dateStr == undefined) {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
        dateStr = `${year}-${month}`;
    }
    let [year, month] = dateStr.split('-');
    let data: any = {
        startDate: month,
        endDate: year,
        pageNo: currentPage,
        pageSize: pageSize,
        searchValue: '',
        projectStatus: 0,
        employeeStatus: monthlyReports,
    };

    const searchDynamically = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        query = event.target.value;
        router.push(
            `${url}?page=${currentPage}&size=${data.pageSize}&search=${query}&startDate=${data.startDate}&endDate=${data.endDate}`
        );
    };
    const handleSelectEntries = (event: any) => {
        router.push(
            `${url}?page=${1}&size=${event.target.value}&search=${query}&startDate=${data.startDate}&endDate=${data.endDate}`
        );
    };
    return (
        <>
            <div className="card custom-card team_card">
                <div className="card-header justify-content-between awards_card_header">
                    <div className="card-title">Monthly Leaves Report </div>
                    <div className="filter-right d-flex gap-x-2">
                        <DateFilter />

                        <div className="btn-list mt-md-0 mt-2">
                            <ExportExcel />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div>
                        <div className="d-flex flex-wrap justify-content-between dataTable_filterBox">
                            <div className="d-flex gap-x-2 align-items-center mb-4">
                                Show
                                <select
                                    name="showEntries"
                                    className="form-control w70"
                                    onChange={(event) =>
                                        handleSelectEntries(event)
                                    }
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                entries
                            </div>

                            <div className="search_box mb-4" />
                            <i className="ri-search-line"></i>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search Here"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => searchDynamically(event)}
                            />
                        </div>
                    </div>
                    <div className="table-responsive theme_table">
                        <table className="table text-nowrap table-hover border table-bordered">
                            <thead>
                                <tr>
                                    <th>Developer Name</th>
                                    <th scope="col">Present</th>
                                    <th scope="col">Absent</th>
                                    <th scope="col">Leaves</th>
                                    <th scope="col">Half Day</th>
                                    {/* <th scope="col">Short Leave</th>
                                    <th scope="col">Weekends</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyReports?.results.map((item: any ,index:number) => (
                                    <tr key={index}>
                                        <td>
                                            <a
                                                href="#"
                                                className="d-flex align-items-center fw-semibold"
                                            >
                                                <span className="avatar avatar-sm me-2 avatar-rounded">
                                                    {item.profileImage ? (
                                                        <Image
                                                            src="/"
                                                            width={20}
                                                            height={20}
                                                            alt="img"
                                                        />
                                                    ) : (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '20px',
                                                                color: '#00000059',
                                                                textTransform:
                                                                    'uppercase',
                                                                padding: '19%',
                                                            }}
                                                        >
                                                            {item.employeeName?.substring(
                                                                0,
                                                                1
                                                            )}
                                                        </span>
                                                    )}
                                                </span>
                                                {item.employeeName}
                                            </a>
                                        </td>
                                        <td className="text-success">
                                            {item.present}
                                        </td>
                                        <td className="text-danger">
                                            {item.absent}
                                        </td>
                                        <td> {item.leaves}</td>
                                        <td> {item.halfDay}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="card-footer">
                            <div className="d-flex align-items-center">
                                Total Showing Entries {totalEntries} out of
                                {monthlyReports?.totalCount ?? 0}
                                <Paginator
                                    totalRecords={monthlyReports?.totalCount}
                                    data={data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MonthlyReports;