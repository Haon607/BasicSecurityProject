import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DialogService } from '../../../subcomponents/dialog/dialog.service';
import { HttpBackendService } from '../../../../services/http-services/http-backend-service';
import { User } from '../../../../model/user';
import { toStatusText } from '../../../../helpers/http-codes';
import { Router } from '@angular/router';

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

    constructor(
        private readonly router: Router,
    ) {
        this.http.users.getAll().subscribe({
            next: (users) => {
                this.users.set(users);
            },
            error: (err) => {
                switch (err.status) {
                    case 401:
                        this.dialogService.dialog.next({
                            level: 'warning',
                            message: `Anmeldung erforderlich.`,
                        });
                        this.router.navigateByUrl('login?url=users');
                        break;
                    case 403:
                        this.dialogService.dialog.next({
                            level: 'error',
                            message: `Fehlende Berechtigung.`,
                        });
                        this.router.navigateByUrl('/')
                        break;
                    default:
                        this.dialogService.dialog.next({
                            level: 'error',
                            message: `Request fehlgeschlagen. ${toStatusText(err.status)}`,
                        });
                }
            },
        });
    }
}
