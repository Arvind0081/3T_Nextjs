'use client';
import { useRouter } from 'next/navigation';

const Designation = ({ desg }: any) => {
  const router = useRouter();
  const handleDesignationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const desg = event.target.value;
    router.push(`/hrEmployeesBoard?search=${desg}`);
  };

  return (
    <div>
      <select className="form-control" onChange={handleDesignationChange}>
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
