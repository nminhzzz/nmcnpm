import AdminPage from '../components/AdminPageComponent/AdminPage';

import SignIn from '../pages/SignInPage/SignInPage';
import SignUp from '../pages/SignUpPage/SignUpPage';
import ProfilePage from '../pages/Profile/ProfilePage';
const routes = [
    {
        path: '/',
        page: AdminPage,
        isShowHeader: true,
    },

    {
        path: 'sign-in',
        page: SignIn,
    },
    {
        path: 'sign-up',
        page: SignUp,
    },
    {
        path: 'profile_page',
        page: ProfilePage,
    },
];
export default routes;
