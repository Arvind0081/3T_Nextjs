'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { setCookie } from 'cookies-next';

const SideBarSettings = () => {
  const matchUrl = ['/assignTeam', '/assignProject', '/assignBadge'];
  const url = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    matchUrl.includes(url) ?? false
  );
  setCookie('pathName', url);

  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <li className={`slide ${isSettingsOpen ? 'is-expanded' : ''}`}>
      <a
        className='side-menu__item'
        data-bs-toggle='slide'
        href='#'
        onClick={toggleSettingsDropdown}
      >
        <i className='side-menu__icon bx bx-cog'></i>
        <span className='side-menu__label'>Settings</span>
        <i className='angle fe fe-chevron-right'></i>
      </a>
      <ul
        className='slide-menu'
        style={{ display: isSettingsOpen ? 'block' : 'none' }}
      >
        <li>
          <Link href='/assignTeam' className='slide-item'>
            Assign Team
          </Link>
        </li>
        {/* <li>
                    <Link  href='/assignProject' className='slide-item'>Assign Projects</Link>
                  </li> */}
        <li>
          <Link href='/assignBadge' className='slide-item'>
            Assign Badges
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default SideBarSettings;
