import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../authentication-service';

export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthenticationService);

    const auth = authService.authenticationData();

    if (auth && req.url.startsWith('http://localhost:8080/api')) {
        req = req.clone({
            setHeaders: {
                Authorization: `Basic ${btoa(`${auth.username}:${auth.password}`)}`,
            },
        });
    }

    return next(req);
};
