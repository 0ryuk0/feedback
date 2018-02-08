// Angular-Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

// import * as dms from './dmsadmin.barrel';

// App-Modules
import { SharedModule } from '../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Select2Module } from 'ng2-select2';
import { DatepickerComponentModule} from '../../shared/components/datepicker/datepicker.module';
import { ToastyModule } from 'ng2-toasty';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Routing-Config
import { DmsAdminRouting } from './dmsadmin.routing';

// Components
import { AppComponent } from '../../shared/components/root/app.component';
import { FeedbackHomeComponent } from 'apps/dmsadmin/components/feedback/feedback.home.component';
import { PackageSourceComponent } from '../../shared/components/package-source/package-source.component';
import { FeedbackFormComponent } from './components/feedback/components/feedback-form/feedback.form.component';
import { AboutComponent } from './components/about/about.component';
import { GiftComponent } from './components/gifts/gift.component';

// Services
import { DmsAdminService } from './services/dmsadmin.service';

@NgModule ({
    declarations: [
         FeedbackHomeComponent,
         GiftComponent,
         AboutComponent,
         PackageSourceComponent,
         FeedbackFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        SharedModule,
        ToastyModule,
        TooltipModule.forRoot(),
        DmsAdminRouting,
        DatepickerComponentModule,
        Select2Module
    ],
    providers: [
         DmsAdminService
    ],
    bootstrap: [  AppComponent ]

})

export class DmsAdminModule {  };
