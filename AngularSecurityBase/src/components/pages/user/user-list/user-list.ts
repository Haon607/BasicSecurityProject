import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DialogService } from '../../../subcomponents/dialog/dialog.service';
import { HttpBackendService } from '../../../../services/http-services/http-backend-service';
import { User } from '../../../../model/user';
import { Router } from '@angular/router';
import { HttpErrorHandler } from '../../../../HttpErrorHandler';

@Component({
    selector: 'app-user-list',
    imports: [],
    templateUrl: './user-list.html',
    styleUrl: './user-list.css',
})
export class UserList {
    private readonly dialogService: DialogService = inject(DialogService);
    private readonly http: HttpBackendService = inject(HttpBackendService);
    protected readonly users: WritableSignal<User[] | undefined> = signal(undefined);
    private readonly httpErrorHandler: HttpErrorHandler;

    constructor(
        private readonly router: Router,
    ) {
        this.httpErrorHandler = new HttpErrorHandler(this.dialogService, router);

        this.http.users.getAll().subscribe({
            next: (users) => {
                this.users.set(users);
            },
            error: (err) => {
                this.httpErrorHandler.checkAuthenticationAndPermissions(err, "users");
            },
        });
    }
}
