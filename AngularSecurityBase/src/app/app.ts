import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpBackendService } from '../services/http-backend-service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App implements OnInit {
    protected text: string = '?';

    private readonly http = inject(HttpBackendService);
    private readonly cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.http.getHello().subscribe((t) => {
            this.text = t.st;
            this.cdr.detectChanges();
        });
    }
}
