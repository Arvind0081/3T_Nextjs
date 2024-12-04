'use client';
import { useRouter,usePathname} from 'next/navigation';

const Designation = ({ desg,payload }: any) => {
  const router = useRouter();
  const url = usePathname();


  const handleDesignationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const desg = event.target.value;
    router.push(`${url}?page=${payload.pagenumber}&size=${payload.pageSize}&empStatus=${payload.isActive}&departmentId=${payload.departmentID}&designation=${desg}&searchValue=${payload.searchValue}&sortColumn=${payload.SortColumn}&sortOrder=${payload.SortOrder}`);
  };

  return (
    <div>
      <select className="form-control" value={payload.designation} onChange={handleDesignationChange}>
        <option value="">Select Designation</option>
        {desg?.map((item: any) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Designation;
