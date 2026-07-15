import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication-service';
import { DialogService } from '../../../subcomponents/dialog/dialog.service';
import { HttpBackendService } from '../../../../services/http-services/http-backend-service';
import { User } from '../../../../model/user';
import { HttpErrorHandler } from '../../../../HttpErrorHandler';
import { Role } from '../../../../model/authentication';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-user-edit',
    imports: [ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './user-edit.html',
    styleUrl: './user-edit.css',
})
export class UserEdit {
    protected mode: 'edit' | 'view' | 'create';
    protected user: WritableSignal<User> = signal({
        id: undefined,
        username: '',
        password: '',
        role: Role.ROLE_USER,
    });
    protected changePassword: WritableSignal<boolean> = signal(false);
    protected readonly Role = Role;
    protected readonly savingInProgress = signal<boolean>(false);
    protected readonly authService: AuthenticationService = inject(AuthenticationService);
    protected readonly confirm = confirm;
    private readonly dialogService: DialogService = inject(DialogService);
    private readonly httpBackendService: HttpBackendService = inject(HttpBackendService);
    private readonly httpErrorHandler: HttpErrorHandler;
    private readonly id: string | null;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {
        this.httpErrorHandler = new HttpErrorHandler(this.dialogService, router);
        this.id = activatedRoute.snapshot.paramMap.get('id');

        this.mode = this.findMode();

        this.checkPermission();

        if (this.mode !== 'create')
            this.httpBackendService.users.get(this.id!).subscribe({
                next: (result) => this.user.set(result),
                error: (err) => this.getCheckAuthenticationAndPermissions(err),
            });
    }

    protected save() {
        this.savingInProgress.set(true);
        const operation =
            this.mode === 'create'
                ? (user: User) => this.httpBackendService.users.post(user)
                : (user: User) => this.httpBackendService.users.put(user);

        operation(this.user()).subscribe({
            next: (result) => {
                this.dialogService.dialog.next({
                    level: 'success',
                    message: `Nutzer erfolgreich gespeichert!`,
                });
                this.router.navigateByUrl('/users/' + result.id);
            },
            error: (err) => {
                this.getCheckAuthenticationAndPermissions(err)
                this.savingInProgress.set(false);
            },
        });
    }

    protected displayPasswordField() {
        this.user().password = '';
        this.changePassword.set(true);
    }

    protected delete() {
        this.savingInProgress.set(true);
        this.httpBackendService.users.delete(this.user().id!).subscribe({
            next: (_) => {
                this.dialogService.dialog.next({
                    level: 'success',
                    message: `Nutzer erfolgreich gelöscht!`,
                });
                this.router.navigateByUrl('/users');
            },
            error: (err) => {
                this.getCheckAuthenticationAndPermissions(err);
                this.savingInProgress.set(false);
            },
        });
    }

    private getCheckAuthenticationAndPermissions(err: any) {
        this.httpErrorHandler.checkAuthenticationAndPermissions(
            err,
            `/users/${this.id}` + (this.mode === 'edit' ? '/edit' : ''),
        );
    }

    private findMode(): 'edit' | 'view' | 'create' {
        if (!this.id) return 'create';

        if (this.activatedRoute.snapshot.url[2]?.path === 'edit') return 'edit';

        return 'view';
    }

    private checkPermission() {
        const auth = this.authService.authenticationData();

        if (
            auth &&
            auth.role !== Role.ROLE_ADMIN &&
            (this.mode === 'edit' || this.mode === 'create')
        ) {
            this.dialogService.dialog.next({ level: 'warning', message: 'Fehlende Berechtigung!' });
            if (this.mode === 'edit') this.router.navigate(['/users/' + this.id!]);
            else this.router.navigate(['/users']);
        }
    }
}
