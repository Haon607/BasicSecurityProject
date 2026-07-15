import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication-service';
import { Svg } from '../../../helpers/svg';
import { Role } from '../../../model/authentication';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    constructor(
        private readonly router: Router,
        protected readonly authenticationService: AuthenticationService,
    ) {}

    protected readonly Svg = Svg;
    protected readonly Role = Role;

    protected logout() {
        this.authenticationService.logout();
        this.router.navigateByUrl('/')
    }
}
