'use client';
import { useRouter } from 'next/navigation';

const Department = ({ getDepartment }: any) => {
  const router = useRouter();
  const handleDesignationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const dep = event.target.value;
    router.push(`/upworkProfile?search=${dep}`);
  };

  return (
    <div>
      <select className="form-control" onChange={handleDesignationChange}>
        <option value="">Select Department</option>
        {getDepartment?.map((item: any) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Department;
