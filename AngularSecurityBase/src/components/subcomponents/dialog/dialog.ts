import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService } from './dialog.service';
import { Svg } from '../../../helpers/svg';

@Component({
    selector: 'app-dialog-component',
    imports: [FormsModule],
    templateUrl: './dialog.html',
    standalone: true,
})
export class Dialog {
    protected errorMessage: string = '';

    constructor(
        private readonly dialogService: DialogService,
        private readonly cdr: ChangeDetectorRef,
    ) {
        dialogService.error.subscribe((errorMessage) => this.displayPopUp(errorMessage));
    }

    private displayPopUp(errorMessage: string): void {
        const modal = document.getElementById('error_modal') as HTMLDialogElement;
        this.errorMessage = errorMessage;
        this.cdr.detectChanges();
        modal.showModal();
    }

    protected readonly Svg = Svg;
}
