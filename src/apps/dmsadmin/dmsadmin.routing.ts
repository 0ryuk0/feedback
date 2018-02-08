import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './../../shared/components/not-found/not-found.component';
import { AppComponent } from '../../shared/components/root/app.component';
import { PollResolver } from '../../shared/services/poll-resolver.service';
import { SharedService } from '../../shared/services/shared.service';
import { FeedbackHomeComponent } from './components/feedback/feedback.home.component';
import { AboutComponent } from './components/about/about.component';
import { GiftComponent } from './components/gifts/gift.component';

export const DMSADMIN_ROUTES: Routes = [
     // Dashboard
    { path: '', redirectTo: 'feedback', pathMatch: 'full' },
    { path: 'feedback', component: AppComponent, children: [
        { path: '', component: FeedbackHomeComponent}
    ]},

    // Widget
    { path: 'gifts', component: AppComponent, children: [
        { path: '', component: GiftComponent},
    ] },

    // Package Manager
    { path: 'about', component: AppComponent, children: [
        { path: '', component: AboutComponent},
    ]},


    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];

// export const DmsAdminRouting = RouterModule.forChild(DMSADMIN_CHILD_ROUTES);
export const DmsAdminRouting = RouterModule.forRoot(DMSADMIN_ROUTES);
