'use client';

import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';

interface RemoveFromItemProps {
  id: string;
}

const RemoveFromItem = ({ id }: RemoveFromItemProps) => {
  const router = useRouter();

  const handleRemove = async () => {
    try {

      await apiService.put('/Employee/RemoveEmployeeByManager', { employeeId: id });
   
      router.refresh(); 
    } catch (error) {
      console.error('Failed to remove item:', error);
     
    }
  };

  return (
    <button
      className='btn btn-icon btn-wave waves-effect waves-light btn-xs btn-warning-transparent btn-sm-badge'
      onClick={handleRemove}
    >
      Remove From Team
    </button>
  );
};

export default RemoveFromItem;
