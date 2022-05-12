export const rolesAndAccess = {
  admin: [
    'projects',
    'designs',
    'costs',
    'assembly',
    'production',
    'users',
    'purchases',
    'public',
    'auth',
    'enquiry',
    'customers',
  ],
  designer: ['designs', 'public', 'auth'],
  production: ['production', 'public', 'auth'],
  assembly: ['assembly', 'public', 'auth'],
  purchases: ['purchases', 'public', 'auth'],
};
