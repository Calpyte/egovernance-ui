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
    title: 'Location',
    icon: 'layout-outline',
    children: [
      {
        title: 'Country',
        link: '/pages/location/country',
      },
    ],
  },

  {
    title: 'Master',
    icon: 'layout-outline',
    children: [
      {
        title: 'Department',
        link: '/pages/master/department',
      },
      {
        title: 'Role',
        link: '/pages/master/role',
      },
      {
        title: 'User',
        link: '/pages/master/app-user',
      },
      {
        title: 'Office',
        link: '/pages/master/office',
      },
    ],
  },
  {
    title: 'Transaction',
    icon: 'layout-outline',
    children: [
      // {
      //   title: 'Transaction',
      //   link: '/pages/transaction/coordinates-txn',
      // },
      {
        title: 'Transaction Location',
        link: '/pages/transaction/user-location',
      }
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
