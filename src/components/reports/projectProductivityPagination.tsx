'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { Pagination } from 'semantic-ui-react';

const ReportPagination = ({ totalRecords, data }: any) => {
   
    //Initialize hook
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    let totalPagesCountCheck = totalRecords / data?.PageSize;

    //Declare State
    const state = {
        showEllipsis: true,
        showFirstAndLastNav: true,
        showPreviousAndNextNav: true,
      };

    // Declare Params
    const activeTab = searchParams.get('tab') || '1';
  
    const totalPages = () => {
        let totalPagesCount = totalRecords / data?.PageSize;
        totalPagesCount =
            totalPagesCount % 1 === 0
                ? totalPagesCount
                : Math.ceil(totalPagesCount);

        if (data?.PageNumber > totalPagesCount) {
            router.replace(
                `${url}/?tab=${activeTab}&pageNumber=${data?.PageNumber > totalPagesCountCheck ? data.PageNumber - 1 : data?.PageNumber}&pageSize=${data.PageSize}&projectStartDate=${data.StartDate}&from=${data.From}&to=${data.To}&search=${data.SearchValue}&sortColumn=${data.SortColumn}&sortOrder=${data.SortOrder}&departmentId=${data.DepartmentId}&teamAdminId=${data.TeamAdminId}`
            );
        }
        return totalPagesCount;
    };

    const handlePaginationChange = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        { activePage }: any
    ) => {
        if (data?.PageNumber > totalPagesCountCheck) {
            router.replace(
                `${url}/?tab=${activeTab}&pageNumber=${data?.PageNumber > totalPagesCountCheck ? 1 : data?.PageNumber}&pageSize=${data.PageSize}&projectStartDate=${data.StartDate}&from=${data.From}&hoursTo=${data.To}&search=${data.SearchValue}&sortColumn=${data.SortColumn}&sortOrder=${data.SortOrder}&departmentId=${data.DepartmentId}&teamAdminId=${data.TeamAdminId}`
            );
        } else {
            return router.push(
                `${url}/?tab=${activeTab}&pageNumber=${activePage}&pageSize=${data.PageSize}&projectStartDate=${data.StartDate}&hoursFrom=${data.From}&hoursTo=${data.To}&from=${data.From}&search=${data.SearchValue}&sortColumn=${data.SortColumn}&sortOrder=${data.SortOrder}&departmentId=${data.DepartmentId}&teamAdminId=${data.TeamAdminId}`
            );
        }
    };

    return (
        <Pagination
            activePage={data?.PageNumber}
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
