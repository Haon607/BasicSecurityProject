import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpBackendService {
    private readonly httpClient: HttpClient = inject(HttpClient);

    public getHello(): Observable<x> {
        return this.httpClient.get<x>('http://localhost:8080/api');
    }
}

export interface x {
    st: string;
}
