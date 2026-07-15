import { Service, signal, WritableSignal } from '@angular/core';
import { AuthenticationData } from '../model/authentication';

@Service()
export class AuthenticationService {
    authenticationData: WritableSignal<AuthenticationData | undefined> = signal(undefined);

    constructor() {}
}
