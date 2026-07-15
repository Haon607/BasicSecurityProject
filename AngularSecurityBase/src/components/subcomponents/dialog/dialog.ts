import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogAttributes, DialogService } from './dialog.service';
import { Svg } from '../../../helpers/svg';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-dialog-component',
    imports: [FormsModule, NgClass],
    templateUrl: './dialog.html',
    standalone: true,
})
export class Dialog {
    protected attributes: WritableSignal<DialogAttributes> = signal({
        level: 'error',
        message: '?',
    });
    protected readonly Svg = Svg;

    constructor(private readonly dialogService: DialogService) {
        dialogService.dialog.subscribe((attributes) => this.displayPopUp(attributes));
    }

    protected icon(dialogAttributes: DialogAttributes): string {
        switch (dialogAttributes.level) {
            case 'error':
                return Svg.crossInCircle;
            case 'warning':
                return Svg.warning;
            case 'info':
                return Svg.info;
            case 'success':
                return Svg.megaphone;
        }
    }

    private displayPopUp(attributes: DialogAttributes): void {
        const modal = document.getElementById('error_modal') as HTMLDialogElement;
        this.attributes.set(attributes);
        modal.showModal();
    }
}
