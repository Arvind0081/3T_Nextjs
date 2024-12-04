'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { Pagination } from 'semantic-ui-react';

const ReportPagination = ({ totalRecords, data }: any) => {
    //Initialize hook
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    let totalPagesCountCheck = totalRecords / data?.pageSize;

    //Declare State
    const state = {
        showEllipsis: true,
        showFirstAndLastNav: true,
        showPreviousAndNextNav: true,
    };

    // Declare Params
    const activeTab = searchParams.get('tab') || '1';
    const hoursFrom = searchParams?.get('hoursFrom') ?? '';
    const hoursTo = searchParams?.get('hoursTo') ?? '';
    const startDate = searchParams?.get('projectStartDate') ?? '';

    const totalPages = () => {
        let totalPagesCount = totalRecords / data?.pageSize;
        totalPagesCount =
            totalPagesCount % 1 === 0
                ? totalPagesCount
                : Math.ceil(totalPagesCount);

        if (data?.pageNo > totalPagesCount) {
            router.replace(
                `${url}/?tab=${activeTab}&pageNumber=${data?.pageNo > totalPagesCountCheck ? data.pageNo - 1 : data?.pageNo}&projectStartDate=${startDate}&pageSize=${data.pageSize}&search=${data.searchValue}&hoursFrom=${hoursFrom}&hoursTo=${hoursTo}`
            );
        }
        return totalPagesCount;
    };

    const handlePaginationChange = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        { activePage }: any
    ) => {
        if (data?.pageNo > totalPagesCountCheck) {
            router.replace(
                `${url}/?tab=${activeTab}&pageNumber=${data?.pageNo > totalPagesCountCheck ? 1 : data?.pageNo}&projectStartDate=${startDate}&pageSize=${data.pageSize}&search=${data.searchValue}&hoursFrom=${hoursFrom}&hoursTo=${hoursTo}`
            );
        } else {
            return router.push(
                `${url}/?tab=${activeTab}&pageNumber=${activePage}&projectStartDate=${startDate}&pageSize=${data.pageSize}&search=${data.searchValue}&hoursFrom=${hoursFrom}&hoursTo=${hoursTo}`
            );
        }
    };

    return (
        <Pagination
            activePage={data?.pageNo}
            onPageChange={handlePaginationChange}
            size="mini"
            totalPages={totalPages()}
            ellipsisItem={state.showEllipsis ? undefined : null}
            firstItem={state.showFirstAndLastNav ? undefined : null}
            lastItem={state.showFirstAndLastNav ? undefined : null}
            prevItem={state.showPreviousAndNextNav ? undefined : null}
            nextItem={state.showPreviousAndNextNav ? undefined : null}
        />
    );
};

export default ReportPagination;
