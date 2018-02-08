import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Environment
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-feedback-home',
    templateUrl: './feedback.home.component.html',
    styleUrls: ['./feedback.home.scss']
})

export class FeedbackHomeComponent implements OnInit {
    dashboards = [];
    dashboardSelected = {};
    constructor() {}
    ngOnInit() {
        this.dashboards = [
            {src: '../../assets/images/Catering.jpg', title: 'Catering'},
            {src: '../../assets/images/Transport-Desk.jpg', title: 'Transport Desk'},
            {src: '../../assets/images/Facilities-management.jpg', title: 'Facilities Management'},
            {src: '../../assets/images/WIN.jpg', title: 'WIN'},
            {src: '../../assets/images/Employee-Events.jpg', title: 'Employee Events'},
            {src: '../../assets/images/CSR.jpg', title: 'CSR'},
            {src: '../../assets/images/Income-Tax.jpg', title: 'Income Tax'},
            {src: '../../assets/images/Interview-Exp.png', title: 'Interview Experience'},

        ];
    };

    dashboardPicked(dashboard) {
        this.dashboardSelected = dashboard;
    }
}
