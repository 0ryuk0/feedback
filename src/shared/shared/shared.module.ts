// angular core modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modules
import { ToastyModule } from 'ng2-toasty';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Components
import { AppComponent } from './components/root/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PromoteModalComponent } from './components/modal/promote-modal.component';

// Pipes
import { GridFilterPipe } from './pipes/grid-filter.pipe';

// Directives
import { DropzoneDirective } from './directives/dropzone/dropzone.directive';

// services
import { PollResolver } from './services/poll-resolver.service';
import { SharedService } from './services/shared.service';
import { AlertService } from './services/alert.service';

@NgModule ({
    declarations: [
        // Components
        AppComponent,
        NavbarComponent,
        HeaderComponent,
        PromoteModalComponent,
        NotFoundComponent,

        // Directives
        DropzoneDirective,

        // Pipes
        GridFilterPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        ToastyModule,
        FormsModule,
        TooltipModule.forRoot(),
    ],
    exports: [
        // Components
        AppComponent,
        NavbarComponent,
        HeaderComponent,
        PromoteModalComponent,
        NotFoundComponent,
        // Directives
        DropzoneDirective,
        // Pipes
        GridFilterPipe
    ],
    providers: [
        SharedService,
        PollResolver,
        AlertService
    ]
})

export class SharedModule {  };
