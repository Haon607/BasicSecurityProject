import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dialog } from '../components/subcomponents/dialog/dialog';
import { Header } from '../components/subcomponents/header/header';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Dialog, Header],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {}
