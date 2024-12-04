import { NextResponse } from 'next/server';
import getUser from '@/utils/getUserServerSide';

// utils/rolePaths.js
export const rolePaths: any = {
  'Project Manager': ['/dashBoard','/dashBoard/:id','/assignTeam', '/reports', '/employees/:id', '/projects','/projects/:id' ,'/clients', '/profile', '/helpvideos', '/checklist','/teamToDo', '/upworkprofile','/assignBadge','/employeesProfile/:id','/invoices','/allUsers','/managerToDo'],
  'Employee': ['/employeeDashBoard', '/myStatus', '/employees/:id', '/checklist', '/profile', '/helpvideos','/profile/:id','/allUsers'],
  'Team Lead': ['/teamLeadDashBoard',  '/teamLeadDashBoard/:id' , '/employees/:id', '/myStatus', '/teamStatus', '/projects','/projects/:id', '/teamMembers', '/teamToDo', '/profile', '/checklist', '/helpvideos','/profile/:id','/employeesProfile/:id','/allUsers'],
  'BDM': ['/employeeDashBoard', '/myStatus', '/projects','/projects/:id', '/clients', '/profile', '/helpvideos', '/checklist', '/upworkprofile','/profile/:id','/allUsers'],
  'HR': ['/hrDashBoard', '/hrReports', '/hrEmployeesBoard', '/employees/:id','/employeesProfile/:id', '/profile','/profile/:id','/allUsers'],
  'HOD': ['/dashBoard','/dashBoard/:id','/assignTeam', '/reports', '/employees/:id','/teamToDo', '/projects','/projects/:id' ,'/clients', '/profile', '/helpvideos', '/checklist', '/upworkprofile','/assignBadge','/employeesProfile/:id','/invoices','/allUsers','/managerToDo'],
  'Admin': ['/adminDepartment','/dashBoard','/managerToDo','/allUsers','/employees/:id','/dashBoard/:id','/projects/:id','/employeesProfile/:id','/assignTeam' ],
};



const getPath = (user: any, currentPath: any) => {
  if (!user || !user.role) {
    return '/'; // Default path if user or role is not defined
  }

  // Fetch allowed paths based on user's role
  const allowedPaths = rolePaths[user.role] || [];
  const path= verifyPath(currentPath,allowedPaths)
  
  // Redirect to default path if the current path is not allowed
  return path;
};
const verifyPath = (currentPath:any, allowedPaths:any) => {
  for (let path of allowedPaths) {
    if (path.includes('/:id')) {
      const basePath = path.split('/:id')[0];
      if (currentPath.startsWith(basePath)) {
         currentPath.replace(basePath + '/', '');
      
        return currentPath;
        // return { path: currentPath, pattern: path };
      }
    } else if (currentPath === path) {
      return currentPath
      // return { path: currentPath, pattern: currentPath };
    }
  }
  return null;
};
export function middleware(request: { nextUrl: { pathname: string; }; url: string | URL | undefined; }) {

  const excludePattern = /^\/(register|resetpassword|forgotPassword)?$/;


  if (!excludePattern.test(request.nextUrl.pathname)) {
    const token: any = getUser();
  
    if (token && token.exp >= Date.now() / 1000) {
      const currentPath = request.nextUrl.pathname;
      const user = {
        role: token.role,
        designation: token.designation,
      };
      const pathName = getPath(user, currentPath);

      if (request.nextUrl.pathname !== pathName) {
        return NextResponse.redirect(new URL(pathName, request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}