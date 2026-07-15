import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    public dialog: Subject<DialogAttributes> = new Subject<DialogAttributes>();
}

export interface DialogAttributes {
    level: 'error' | 'warning' | 'success' | 'info';
    message: string;
}
