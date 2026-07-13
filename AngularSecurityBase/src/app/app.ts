import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dialog } from '../components/subcomponents/dialog/dialog';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Dialog],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {}
