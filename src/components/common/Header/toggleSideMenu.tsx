'use client'
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ToggleSideMenu =()=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSideMenu = () => {
        setCookie('isToggle', !isSidebarOpen);
        setIsSidebarOpen(!isSidebarOpen);
        router.refresh();
      };
    return(
        <div>
        <a aria-label="Hide Sidebar" className="app-sidebar__toggle" data-bs-toggle="sidebar" onClick={toggleSideMenu}><span></span></a>
        </div>

    )
}
export default ToggleSideMenu;