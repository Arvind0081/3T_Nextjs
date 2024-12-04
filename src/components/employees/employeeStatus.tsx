'use client';

import { useRouter, usePathname } from 'next/navigation';

const EmployeeStatus = ({ empStatusList,payload }: any) => {
 
    const router = useRouter();
    const url = usePathname();

   
    const handleEmployeeStatusChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const empStatus = event.target.value;
        router.push(`${url}?page=${payload.pagenumber}&size=${payload.pageSize}&empStatus=${empStatus}&departmentId=${payload.departmentID}&designation=${payload.designation}&searchValue=${payload.searchValue}&sortColumn=${payload.SortColumn}&sortOrder=${payload.SortOrder}`);
  
    };

    return (
        <div>
            <select
                className="form-control"
                value={payload?.isActive}
                onChange={handleEmployeeStatusChange}
            >
                {empStatusList?.model.map((item: any) => (
                    <option key={item.value} value={item.value}>
                        {item.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EmployeeStatus;