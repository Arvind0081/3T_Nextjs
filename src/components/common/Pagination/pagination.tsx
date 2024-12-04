'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { Pagination } from 'semantic-ui-react';

const Paginator = ({ totalRecords, data }: any) => {
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    const state = {
        showEllipsis: true,
        showFirstAndLastNav: true,
        showPreviousAndNextNav: true,
    };
    const hrDepSelected = searchParams.get('departmentId');

    const empStatus = searchParams.get('empStatus') || '1';
    const totalPages = () => {
        
        let totalPagesCount = totalRecords / data?.pageSize;
        totalPagesCount =
            totalPagesCount % 1 === 0
                ? totalPagesCount
                : Math.ceil(totalPagesCount);

        if (data.pageNo > totalPagesCount) {
            router.replace(
                `${url}/?page=${data?.pageNo > 1 ? data.pageNo - 1 : data?.pageNo}&size=${data.pageSize}&status=${data.projectStatus}&search=${data.searchValue}&empStatus=${empStatus}&departmentId=${hrDepSelected}`
            );
        }
        return totalPagesCount;
    };

    const handlePaginationChange = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        { activePage }: any
    ) => {
        // if (data?.pageNo > totalPagesCountCheck) {
        //     router.replace(
        //         `${url}/?page=${data?.pageNo > totalPagesCountCheck ? data?.pageNo : 1}&size=${data.pageSize}&status=${data.projectStatus}&search=${data.searchValue}&empStatus=${empStatus}&departmentId=${hrDepSelected}`
        //     );
        // } else {
        return router.push(
            `${url}/?page=${activePage}&size=${data.pageSize}&status=${data.projectStatus}&search=${data.searchValue}&empStatus=${empStatus}&departmentId=${hrDepSelected}`
        );
        // }
    };

    return (
        <Pagination
            activePage={data?.pageNo}
            onPageChange={handlePaginationChange}
            size="mini"
            totalPages={totalPages()}
            // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
            ellipsisItem={state.showEllipsis ? undefined : null}
            firstItem={state.showFirstAndLastNav ? undefined : null}
            lastItem={state.showFirstAndLastNav ? undefined : null}
            prevItem={state.showPreviousAndNextNav ? undefined : null}
            nextItem={state.showPreviousAndNextNav ? undefined : null}
        />
    );
};

export default Paginator;