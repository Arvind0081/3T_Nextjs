'use client'
import Link from 'next/link';
import getUser from '@/utils/getUserServerSide';
import SideBarSettings from './sideBarSetting';

const SideBarModules =()=>{
    let pathName;  
    const compairRole=(array: string[])=>{
        const user:any = getUser();
        if(user){
          if(array.includes(user.role)){
            return true;
          }else{
            return false;
          }
        }
      };
    return(
        <div className="main-sidemenu">
        <div className="slide-left disabled" id="slide-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
          </svg>
        </div>
        <ul className="side-menu">
          {compairRole(['Project Manager','Employee']) && <li className="sub-category">
            <h3>Main</h3>
          </li>}
          {compairRole(['Project Manager','Employee']) && <li className="slide">
            <Link className={`side-menu__item has-link ${pathName == '/dashBoard' ?'active':''} `}data-bs-toggle="slide" href="/dashBoard">
              <i className="side-menu__icon bx bx-home"></i>
              <span className="side-menu__label">Dashboard</span>
            </Link>
          </li>}
          {compairRole(['Project Manager','Employee']) && <li className="sub-category">
            <h3>Pages</h3>
          </li>}
          {compairRole(['Project Manager']) &&<li className="slide">
            <Link className={`side-menu__item has-link ${pathName == '/reports' ?'active':''} `} data-bs-toggle="slide" href="/reports">
              <i className="side-menu__icon bx bx-archive-in"></i>
              <span className="side-menu__label">Reports</span>
            </Link>
          </li>}
          {compairRole(['Project Manager']) &&<li className="slide">
            <Link className={`side-menu__item has-link ${pathName == '/employees' ?'active':''} `} data-bs-toggle="slide" href="/employees">
              <i className="side-menu__icon bx bx-user"></i>
              <span className="side-menu__label">Employees</span>
            </Link>
          </li>}
          {compairRole(['Employee']) &&<li className="slide">
            <Link className={`side-menu__item has-link ${pathName == '/projects' ?'active':''} `} data-bs-toggle="slide" href="/projects">
              <i className="side-menu__icon bx bx-briefcase-alt-2"></i>
              <span className="side-menu__label">My Status</span>
            </Link>
          </li>}
          {compairRole(['Project Manager','Employee']) &&<li className="slide">
            <Link className="side-menu__item has-link" data-bs-toggle="slide" href="/projects">
              <i className="side-menu__icon bx bx-briefcase-alt-2"></i>
              <span className="side-menu__label">Projects</span>
            </Link>
          </li>}
          {compairRole(['Project Manager']) &&<li className="slide">
            <Link className="side-menu__item has-link" data-bs-toggle="slide" href="/upworkprofile">
              <i className="side-menu__icon bx bxs-user-detail"></i>
              <span className="side-menu__label">Upwork Profile</span>
            </Link>
          </li>}
          {compairRole(['Project Manager']) &&<li className="slide">
            <Link className="side-menu__item has-link" data-bs-toggle="slide" href="/clients">
              <i className="side-menu__icon bx bx-home"></i>
              <span className="side-menu__label">Clients</span>
            </Link>
          </li>}
          {compairRole(['Project Manager','Employee']) &&<li className="sub-category">
            <h3>General</h3>
          </li>}
          {compairRole(['Project Manager','Employee']) &&<li className="slide">
            <Link className="side-menu__item has-link" data-bs-toggle="slide" href="/profile">
              <i className="side-menu__icon bx bx-user-circle"></i>
              <span className="side-menu__label">My profile</span>
            </Link>
          </li>}
          {compairRole(['Project Manager','Employee']) &&<li className="slide">
            <Link className="side-menu__item has-link" data-bs-toggle="slide" href="/checklist">
              <i className="side-menu__icon bx bx-filter"></i>
              <span className="side-menu__label">QA Checklist</span>
            </Link>
          </li>}
          {compairRole(['Project Manager','Employee']) &&<li className="slide">
            <Link className="side-menu__item has-link" data-bs-toggle="slide" href="/helpvideos">
              <i className="side-menu__icon bx bx-video"></i>
              <span className="side-menu__label">Help Videos</span>
            </Link>
          </li>}
          {compairRole(['Project Manager']) &&<SideBarSettings />}
        </ul>
        <div className="slide-right" id="slide-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
          </svg>
        </div>
      </div>
    )
}
export default SideBarModules;