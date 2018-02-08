import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    maTheme: string = this.sharedService.maTheme;

    constructor(private sharedService: SharedService, private _route: ActivatedRoute) {
        sharedService.maThemeSubject.subscribe((value) => {
            this.maTheme = value
        });
    }

    ngOnInit() {
        // if (this._route.snapshot.data['poll']) {
        // }else {
        //     alert('Authentication required');
        // }
    }
}
