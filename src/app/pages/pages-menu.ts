import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'layout-outline',
    children: [
      {
        title: 'Dashboard',
        link: '/pages/dashboard',
      }
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },

  {
    title: 'User',
    icon: 'layout-outline',
    children: [
      {
        title: 'Department',
        link: '/pages/department',
      },
      {
        title: 'Designation',
        link: '/pages/designation',
      },
      {
        title: 'Role',
        link: '/pages/role',
      },
      {
        title: 'User',
        link: '/pages/user',
      },
      {
        title: 'Office',
        link: '/pages/office',
      },
      {
        title: 'Officer',
        link: '/pages/officer',
      },
      {
        title: 'Activity',
        link: '/pages/activity',
      },
    ],
  },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'shuffle-2-outline',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
