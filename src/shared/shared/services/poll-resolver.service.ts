import { AnimationPlayer } from '@angular/core/core';
import { CanActivate } from '@angular/router/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Injectable, state } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';

import { SharedService } from './shared.service';
import { environment } from '../../environments/environment';

@Injectable()
export class PollResolver implements CanActivate, Resolve<any> {
    private isAuthSubject = true;
    private isPopup;

    constructor(private _router: Router, private _sharedService: SharedService) { }

    canActivate(): any {
        return Observable.interval(5000)
            .takeWhile(() => this.isAuthSubject)
            .subscribe(() => {
                return this._sharedService.pingAuthAPI(environment.portalEnvironemnt[0].poll)
                .subscribe((data) => {
                    console.log('auth API returned: ', data);
                    window.sessionStorage.setItem('portalApiUrl', environment.portalEnvironemnt[0].portalApiRoot);
                    this._sharedService._portalApiUrl = window.sessionStorage.getItem('portalApiUrl');
                    this.isAuthSubject = false;
                    return !this.isAuthSubject;
                }, (err) => {
                    console.log('Opening Popup');
                    if (!this.isPopup && !window.sessionStorage.getItem('portalApiUrl')) {
                        this.isPopup = this._sharedService.openPopup(environment.portalEnvironemnt[0].url);
                    }
                    console.log(err);
                    return !this.isAuthSubject;
                });
            });
        // if (window.sessionStorage.getItem('portalApiUrl')) {
        //     return true;
        // }else {
        //     this._sharedService.openPopup(environment.portalEnvironemnt[0].url);
        //     return false;
        // }
    }
    resolve(): any {
        console.log('resolver');
        return Observable.interval(5000)
            .takeWhile(() => this.isAuthSubject)
            .subscribe(() => {
                this._sharedService.pingAuthAPI(environment.portalEnvironemnt[0].poll)  // 'http://localhost:8083/PortalApi/Global/Poll'
                .subscribe((data) => {
                    console.log('auth API returned: ', data);
                    window.sessionStorage.setItem('portalApiUrl', environment.portalEnvironemnt[0].portalApiRoot);
                    this._sharedService._portalApiUrl = window.sessionStorage.getItem('portalApiUrl');
                    this.isAuthSubject = false;
                    return this.isAuthSubject;
                }, (err) => {
                    console.log('Opening Popup');
                    if (!this.isPopup && !window.sessionStorage.getItem('portalApiUrl')) {
                        this.isPopup = this._sharedService.openPopup(environment.portalEnvironemnt[0].url);
                    }
                    console.log(err);
                });
            });

    }
}
