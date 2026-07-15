import { inject, Service, signal, WritableSignal } from '@angular/core';
import { AuthenticationData } from '../model/authentication';
import { DialogService } from '../components/subcomponents/dialog/dialog.service';

@Service()
export class AuthenticationService {
    public readonly authenticationData: WritableSignal<AuthenticationData | undefined> = signal(undefined);
    private readonly dialogService: DialogService = inject(DialogService);

    logout() {
        this.authenticationData.set(undefined);
        this.dialogService.dialog.next({level: 'info', message: 'Erfolgreich abgemeldet!'});
    }
}
