import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class HttpBaseService {
    protected readonly httpClient: HttpClient = inject(HttpClient);
    protected readonly baseUrl: string = "http://localhost:8080/api";
}
