const Routes = () => [
  {
    source: '/',
    destination: '/pages/auth/login',
  },
  {
    source: '/resetpassword',
    destination: '/pages/auth/resetPassword',
  },
  {
    source: '/forgotPassword',
    destination: '/pages/auth/forgotPassword',
  },
  {
    source: '/dashBoard',
    destination: '/pages/dashBoard',
  },
  {
    source: '/reports',
    destination: '/pages/reports',
  },
  {
    source: '/register',
    destination: '/pages/auth/register',
  },
  {
    source: '/projects',
    destination: '/pages/projects',
  },
  {
    source: '/projects/:id',
    destination: '/pages/projects/:id',
  },
  {
    source: '/employees',
    destination: '/pages/employees',
  },
  {
    source: '/employees/:id',
    destination: '/pages/employees/:id',
  },
  {
    source: '/clients',
    destination: '/pages/clients',
  },
  {
    source: '/upworkProfile',
    destination: '/pages/upworkProfile',
  },
  {
    source: '/checklist',
    destination: '/pages/qaChecklist',
  },
  {
    source: '/helpVideos',
    destination: '/pages/helpVideos',
  },
  {
    source: '/profile',
    destination: '/pages/myProfile',
  },
  {
    source: '/assignTeam',
    destination: '/pages/assignTeam',
  },
  // {
  //   source: '/assignProject',
  //   destination: '/pages/assignProject',
  // },
  {
    source: '/assignBadge',
    destination: '/pages/assignBadge',
  },
  {
    source: '/employeeDashBoard',
    destination: '/pages/employeeDashBoard',
  },
  {
    source: '/myStatus',
    destination: '/pages/myStatus',
  },
  {
    source: '/hrDashBoard',
    destination: '/pages/hrDashBoard',
  },
  {
    source: '/hrReports',
    destination: '/pages/hrReports',
  },
  {
    source: '/hrEmployeesBoard',
    destination: '/pages/hrEmployeesBoard',
  },
  {
    source: '/teamLeadDashBoard',
    destination: '/pages/teamLeadDashBoard',
  },
  {
    source: '/teamStatus',
    destination: '/pages/teamStatus',
  },
  {
    source: '/teamMembers',
    destination: '/pages/teamMembers',
  },
  {
    source: '/teamLeadDashBoard/:id',
    destination: '/pages/teamLeadDashBoard/:id',
  },
  {
    source: '/dashBoard/:id',
    destination: '/pages/dashBoard/:id',
  },
  {
    source: '/teamToDo',
    destination: '/pages/teamToDo',
  },
  {
    source: '/employeesProfile/:id',
    destination: '/pages/employees/employeesProfile/:id',
  },
  {
    source: '/profile/:id',
    destination: '/pages/myProfile/:id',
  },

  {
    source: '/invoices',
    destination: '/pages/invoices',
  },

  {
    source: '/allUsers',
    destination: '/pages/allUsers',
  },

  {
    source: '/managerToDo',
    destination: '/pages/managerToDo',
  },


  {
    source: '/adminDepartment',
    destination: '/pages/adminDepartment',
  },
];

export { Routes };
