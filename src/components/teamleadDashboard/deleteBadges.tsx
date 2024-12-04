'use client'
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
const DeleteBadge = ({ data, badge }: any) => {
    const router=useRouter();
  const handleDelete = async (employeeId: number, badgeId: number) => {
  
    try {
      await apiService.delete(
        `/Employee/DeleteAssignAwards?employeeId=${employeeId}&UserBadgeId=${badgeId}`
      );

      router.refresh();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };
  return (
    <>
      <i
        className='bi bi-trash-fill'
        onClick={() => handleDelete(data, badge)} 
        style={{ cursor: 'pointer' }} 
      ></i>
    </>
  );
};
export default DeleteBadge;
