import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base-service';

@Injectable({
    providedIn: 'root',
})
export class HttpBackendService extends HttpBaseService {
    public getHello(): Observable<x> {
        return this.httpClient.get<x>(this.baseUrl);
    }
}

export interface x {
    st: string;
}
