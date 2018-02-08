import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback.form.component.html',
    styleUrls: ['./feedback.form.component.scss']
})

export class FeedbackFormComponent implements OnInit {
    dashboards = [];
    dashboardSelected = {};
    @Input() questions = {};

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

        this.questions = {
            formTitle: 'Catering Feedback',
            range: [
                {text: 'Quality of food at tuck shop'},
                {text: 'Pricing of products at tuck shop'},
                {text: 'Quality of Cafeteria Lunch'},
                {text: 'Pricing of lunch'},
                {text: 'Quality of Soup packets available at the café area'},
                {text: 'Quality of Coffee or tea served by Jyothi Café vendor '},
                {text: 'Quality of Fruits served in the office '},
                {text: 'Food options from the ones who work late night or early morning'}
                ],
            commentBox: [
                {text: 'Feedback'}
                ]
        };
    };

    dashboardPicked(dashboard) {
        this.dashboardSelected = dashboard;
    }
}
