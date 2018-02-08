import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

import { DatepickerComponent } from "./datepicker.component";


@NgModule ({
    declarations: [
        DatepickerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DatepickerModule.forRoot()
    ],
    exports: [
        DatepickerComponent
    ]
})

export class DatepickerComponentModule {  }