import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LocaleOptions } from 'ngx-bootstrap/bs-moment/locale/locale.class';
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DmsAdminService } from '../../../apps/dmsadmin/services/dmsadmin.service';
import { SharedService } from '../../services/shared.service';


@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: [ 'navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
  menuItems = [];
  isCollapsed = true;
  selectedEnv: any;
  // environmentOptions = ['Connect to DevInt', 'Connect to QC'];
  environmentOptions = environment.portalEnvironemnt;

  isAuthPromoteSubject = true;
  isPopup: boolean;
  appTitle = '';

  constructor(private _sharedService: SharedService, private _ngZone: NgZone, private _route: ActivatedRoute) {}

  ngOnInit() {
    console.log('setting default environment: ', window.sessionStorage.getItem('portalApiUrl'));
    if (window.sessionStorage.getItem('portalApiUrl')) {
      for (let i = 0; i < this.environmentOptions.length; i++) {
        if (window.sessionStorage.getItem('portalApiUrl') === this.environmentOptions[i].portalApiRoot) {
          this.selectedEnv = this.environmentOptions[i];
        }
      }
     }else {
      this.selectedEnv = this.environmentOptions[0];
    }

    this.menuItems = [
      {path: '/feedback', title: 'Feedback'},
      {path: '/gifts', title: 'Gifts'},
      {path: '/about', title: 'About'}];
  }

  public get menuIcon(): string {
    return this.isCollapsed ? '☰' : '✖';
  };


  private switchEnvironment(value) {
    this._sharedService.pingAuthAPI(value.poll)
          .subscribe((data) => {
             console.log(data);
          }, (err) => {
              this._sharedService.openPopup(value.url);
              this.poll(value);
              console.log(err);
          });
    };

    poll(value) {
      Observable.interval(5000)
      .takeWhile(() => this.isAuthPromoteSubject)
      .subscribe(() => {
          return this._sharedService.pingAuthAPI(value.poll)
          .subscribe((data) => {
              console.log('auth API returned: ', data);
              this.isAuthPromoteSubject = false;
              window.sessionStorage.setItem('portalApiUrl', value.portalApiRoot);
              window.sessionStorage.setItem('pollApiUrl', value.poll);
              this._sharedService._portalApiUrl = value.portalApiRoot;
              this.selectedEnv = value;
          }, (err) => {
              // console.log('isPopup: ', this.isPopup);
              // console.log('Opening Popup');
              // this._sharedService.openPopup(value.url);
              console.log(err);
          });
      });
    }


}

