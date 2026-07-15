import { DialogService } from './components/subcomponents/dialog/dialog.service';
import { Router } from '@angular/router';
import { toStatusText } from './helpers/http-codes';

export class HttpErrorHandler {
    constructor(
        private readonly dialogService: DialogService,
        private readonly router: Router,
    ) {}

    public checkAuthenticationAndPermissions(err: any, returningUrl: string) {
        switch (err.status) {
            case 401:
                this.dialogService.dialog.next({
                    level: 'warning',
                    message: `Anmeldung erforderlich.`,
                });
                this.router.navigateByUrl('/login?url=' + returningUrl);
                break;
            case 403:
                this.dialogService.dialog.next({
                    level: 'error',
                    message: `Fehlende Berechtigung.`,
                });
                this.router.navigateByUrl('/');
                break;
            default:
                this.dialogService.dialog.next({
                    level: 'error',
                    message: `Request fehlgeschlagen. ${toStatusText(err.status)}`,
                });
        }
    }
}
