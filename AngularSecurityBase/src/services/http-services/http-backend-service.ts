import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { HttpBaseService } from './http-base-service';

@Injectable({
    providedIn: 'root',
})
export class HttpBackendService extends HttpBaseService {
    public users: RestClient<User>;

    constructor() {
        super();
        this.users = new RestClient<User>(this.httpClient, this.baseUrl + '/users')
    }
}

class RestClient<T> {
    private readonly headers = new HttpHeaders().set(
        'Content-Type',
        'application/json; charset=utf-8',
    );

    constructor(
        private readonly http: HttpClient,
        private readonly path: string,
    ) {}

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.path}`);
    }

    get(id: string): Observable<T> {
        return this.http.get<T>(`${this.path}/${id}`);
    }

    post(obj: T): Observable<T> {
        return this.http.post<T>(`${this.path}`, JSON.stringify(obj), {
            headers: this.headers,
        });
    }

    put(obj: T): Observable<T> {
        return this.http.put<T>(`${this.path}`, JSON.stringify(obj), {
            headers: this.headers,
        });
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.path}/${id}`);
    }
}
