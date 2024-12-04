'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Pagination } from 'semantic-ui-react';

const Paginator = ({ totalRecords, payload }: any) => {
  const router = useRouter();
  const url = usePathname();
  const state = {
    showEllipsis: true,
    showFirstAndLastNav: true,
    showPreviousAndNextNav: true,
  };

  const totalPages = () => {
    let totalPagesCount = totalRecords / payload?.pageSize;
    totalPagesCount =
      totalPagesCount % 1 === 0 ? totalPagesCount : Math.ceil(totalPagesCount);

    if (totalRecords === 0) {
      router.push(
        `${url}?page=${payload.pageNumber}&size=${payload.pageSize}&search=${payload.searchValue}&departmentId=${payload.departmentID}&teamAdminId=${payload.teamAdminId}&profileType=${payload.profileType}&sortColumn=${payload.sortColumn}&sortOrder=${payload.sortOrder}`
      );
    }

    return totalPagesCount;
  };

  const handlePaginationChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { activePage }: any
  ) => {
    return router.push(
      `${url}/?page=${activePage}&size=${payload.pageSize}&search=${payload.searchValue}&departmentId=${payload.departmentID}&teamAdminId=${payload.teamAdminId}&profileType=${payload.profileType}&sortColumn=${payload.sortColumn}&sortOrder=${payload.sortOrder}`
    );
  };

  return (
    <Pagination
      activePage={payload.pagenumber}
      onPageChange={handlePaginationChange}
      size='mini'
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
