import { Service } from '@angular/core';
import { HttpBaseService } from './http-base-service';
import { Observable } from 'rxjs';
import { AuthenticationData, LoginRequest } from '../../model/authentication';

@Service()
export class HttpLoginService extends HttpBaseService {
    public login(login: LoginRequest): Observable<AuthenticationData> {
        return this.httpClient.post<AuthenticationData>(this.baseUrl + '/login', login);
    }
    public register(login: LoginRequest): Observable<AuthenticationData> {
        return this.httpClient.post<AuthenticationData>(this.baseUrl + '/register', login);
    }
}
