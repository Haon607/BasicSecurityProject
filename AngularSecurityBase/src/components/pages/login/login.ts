import { Component, signal, WritableSignal } from '@angular/core';
import { Svg } from '../../../helpers/svg';
import { LoginRequest } from '../../../model/authentication';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../subcomponents/dialog/dialog.service';
import { HttpLoginService } from '../../../services/http-services/http-login-service';
import { HttpErrorResponse } from '@angular/common/http';
import { toStatusText } from '../../../helpers/http-codes';
import { AuthenticationService } from '../../../services/authentication-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    protected readonly Svg = Svg;
    protected user: LoginRequest = { username: '', password: '' };
    protected inLogin: WritableSignal<boolean> = signal(false);
    protected register: boolean = false;

    constructor(
        private readonly dialogService: DialogService,
        private readonly httpLoginService: HttpLoginService,
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    protected login() {
        this.inLogin.set(true);

        const loginOperationFunction = this.register
            ? (user: LoginRequest) => this.httpLoginService.register(user)
            : (user: LoginRequest) => this.httpLoginService.login(user);

        loginOperationFunction(this.user).subscribe({
            next: (authenticationData) => {
                this.inLogin.set(false);
                this.authenticationService.authenticationData.set(authenticationData);

                const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('url') ?? '/';

                this.router.navigateByUrl(returnUrl);
            },
            error: (err: HttpErrorResponse) => {
                this.inLogin.set(false);

                if (this.register)
                    this.dialogService.dialog.next({
                        level: 'error',
                        message:
                            'Registrieren fehlgeschlagen! ' +
                            (err.status === 401
                                ? 'Username bereits vergeben.'
                                : toStatusText(err.status)),
                    });
                else
                    this.dialogService.dialog.next({
                        level: 'error',
                        message:
                            'Anmelden fehlgeschlagen! ' +
                            (err.status === 401
                                ? 'Ungültige Anmeldedaten.'
                                : toStatusText(err.status)),
                    });
            },
        });
    }

    protected flipForm() {
        this.register = !this.register;
    }
}
