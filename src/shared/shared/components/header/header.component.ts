import { Component, OnInit } from '@angular/core';

// Services
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent implements OnInit {
    maThemeModel = 'black';

    setTheme() {
        this.sharedService.setTheme(this.maThemeModel)
    }

    constructor(private sharedService: SharedService) {
        sharedService.maThemeSubject.subscribe((value) => {
            this.maThemeModel = value
        })
    }

    // openDevIntDialog() {
    //     var url = 'https://gcsportal-devint.nasdaq.com/Portal' + '/Support/DmsAdmin';
    //     var openedWindow = window.open(url, '', 'width= 650, height = 550');
    // }

    // openQCDialog () { /*openModalDialog('QC ');*/
    //     var url = 'https://gcsportal-qc.nasdaq.com/Portal' + '/Support/DmsAdmin';
    //     var openedWindow = window.open(url, '', 'width= 650, height = 550');
    // };

    ngOnInit() {

    }
}
