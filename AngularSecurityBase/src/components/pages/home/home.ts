import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpBackendService } from '../../../services/http-services/http-backend-service';
import { AuthenticationService } from '../../../services/authentication-service';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    protected text = "?";

    constructor(
        private readonly httpBackendService: HttpBackendService,
        protected readonly authenticationService: AuthenticationService,
        private readonly cdr: ChangeDetectorRef,
    ) {
        httpBackendService.getHello().subscribe((data) => {
            this.text = data.st;
            cdr.detectChanges();
        })
    }
}
