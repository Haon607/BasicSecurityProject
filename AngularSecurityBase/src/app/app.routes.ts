import { Routes } from '@angular/router';
import { Login } from '../components/pages/login/login';
import { Home } from '../components/pages/home/home';
import { UserList } from '../components/pages/user/user-list/user-list';
import { UserEdit } from '../components/pages/user/user-edit/user-edit';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },

    { path: 'users', component: UserList },
    { path: 'users/create', component: UserEdit },
    { path: 'users/:id/edit', component: UserEdit },
    { path: 'users/:id', component: UserEdit },
];
