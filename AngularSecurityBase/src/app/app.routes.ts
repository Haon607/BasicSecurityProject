import { Routes } from '@angular/router';
import { Login } from '../components/pages/login/login';
import { Home } from '../components/pages/home/home';
import { UserList } from '../components/pages/user/user-list/user-list';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'users', component: UserList },
];
