'use client'
import { useRouter, usePathname } from 'next/navigation';
const PageSizeHandler = ({ payload }: any) => {
  const router = useRouter();
  const url = usePathname();

  const handleEntries = (e: any) => {
    const showValue = e.target.value;
    router.push(
      `${url}?page=${payload.pagenumber}&size=${showValue}&empStatus=${payload.isActive}&departmentId=${payload.departmentID}&designation=${payload.designation}&searchValue=${payload.searchValue}&sortColumn=${payload.SortColumn}&sortOrder=${payload.SortOrder}&teamAdminId=${payload.TeamAdminId}`
    );
  };
  return (
    <div className='d-flex gap-x-2 align-items-center mb-4'>
      Show
      <select className='form-control w70' onChange={handleEntries}>
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
        <option value='200'>200</option>
      </select>{' '}
      entries
    </div>
  );
};
export default PageSizeHandler;
