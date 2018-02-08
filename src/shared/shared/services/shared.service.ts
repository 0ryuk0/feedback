import { DashboardDetail } from './../../apps/dmsadmin/model/dashboarddetail';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

import { WidgetPackageUpload } from './../../apps/dmsadmin/model/widgetpackageupload';
import {WidgetPackage} from './../../apps/dmsadmin/model/widgetpackage';

@Injectable()
export class SharedService {
    private portalApiUrl = environment.portalEnvironemnt[0].portalApiRoot;
    private portalApiUrlFC = environment.portalEnvironemnt[0].portalApiRootFC;
    private dashboardList = [];
    private widgetList = [];
    private appTitle = '';
    private crums = [];
    // Sidebar visibility
    sidebarVisible: boolean;
    sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>();

    // Theming
    maTheme: string;
    maThemeSubject: Subject<string> = new Subject<string>();

    isAuthSubject = true;

    constructor(private http: Http)  {
        // Hidden the sidebar by default
        this.sidebarVisible = false;

        // Set default theme as green
        this.maTheme = 'black';
    };

    public openPopup(url, isPromote = false) {
        let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen['left'];
        let dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen['top'];

        let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        let left = ((width / 2) - (650 / 2)) + dualScreenLeft;
        let top = ((height / 2) - (550 / 2)) + dualScreenTop;
        let newWindow = window.open(url, 'Login to ' + environment.portalEnvironemnt[0].type , 'scrollbars=yes, width=650, height=550' + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        };

        // newWindow.onunload = () => {
        //     isPromote = false;
        // }

    };

    pingAuthAPI(poll): Observable<any> {
        // https://gcsportal-devint.nasdaq.com/PortalApi/Global/Poll
        return this.http.get(poll, { withCredentials : true })
                        .map((res: Response) => {
                            console.log('res: ', res);
                            // if (res.status === 200 || res.status === 204) {
                            //     console.log(res.status);
                            //     this.isAuthSubject = false;
                            // };
                            res = res.json();
                        })
                        .catch((error: any) => Observable.throw(error || 'Server error'));
    };

    getWidgetPackageContent(widgetId): Observable<any> {
        return this.http.get(this._portaApiUrl + 'GetWidgetPackageContent/' + widgetId, { withCredentials : true })
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    };

    uploadWidgetPackage(widgetPackageUpload: WidgetPackageUpload, apiUrl = this._portaApiUrl): Observable<WidgetPackage> {
         return this.http.post(apiUrl + 'UploadWidgetPackageSupport', widgetPackageUpload, {withCredentials : true })
                        .map((res: Response) => res.json().WidgetPackage)
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    };

    createDashboard(dashboard: any, apiUrl = this._portaApiUrl): Observable<any> {
        return this.http.post(apiUrl + 'CreateDashboard', dashboard, {withCredentials : true })
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    toggleSidebarVisibilty() {
        this.sidebarVisible = !this.sidebarVisible;
        this.sidebarVisibilitySubject.next(this.sidebarVisible);
    };

    setTheme(color) {
        this.maTheme = color
        this.maThemeSubject.next(this.maTheme)
    };

    // properties
     set _portalApiUrl(url){
        this.portalApiUrl = url;
     };

     get _portaApiUrl(){
        return this.portalApiUrl;
     };

     set _dashboardList(value){
        this.dashboardList = value;
     };

     get _dashboardList(){
        return this.dashboardList;
     };

     set _widgetList(value){
         this.widgetList = value;

     };

     get _widgetList(){
         return this.widgetList;

     };

     // Feature Catalog
     set _portalApiUrlFC(url){
        this.portalApiUrlFC = url;
     };

     get _portaApiUrlFC(){
        return this.portalApiUrlFC;
     };

     set _appTitle(appTitle){
        this.appTitle = appTitle;
     }

     get _appTitle(){
         return this.appTitle;
     }

     set _crums(crum){
        this.crums.push(crum);
     }

     get _crums(){
        return this.crums;
     }
     set _resetCrums(crums){
         this.crums = crums;
     }
}
