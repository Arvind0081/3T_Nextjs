'use client';
import FilterManager from '@/components/hod/filterManager';
import { usePathname } from 'next/navigation';
const AdminPagesList = ({ list }: any) => {
  const url = usePathname();
  const isValidUrl = url == '/dashBoard' ? true :
  url == '/reports'
  ? true:
  url == '/employees'
  ? true:
  url == '/teamToDo'
  ? true:
  url == '/projects'
  ? true:
  url == '/managerToDo'
  ? true:
  url == '/assignTeam'
  ? true:
  
  
  
  false;

  return <>{isValidUrl && <FilterManager list={list} />}</>;
};
export default AdminPagesList;
