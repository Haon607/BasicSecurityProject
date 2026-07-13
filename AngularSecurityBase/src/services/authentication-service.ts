import { Service } from '@angular/core';
import { AuthenticationData } from '../model/authentication';

@Service()
export class AuthenticationService {
    authenticationData: AuthenticationData | undefined;

    constructor() {}
}
