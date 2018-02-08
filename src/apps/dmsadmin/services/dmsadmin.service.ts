import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Dashboard} from './../model/dashboard';
import {DashboardDetail} from './../model/dashboarddetail';
import {Widget} from './../model/widget';
import {WidgetDetail} from './../model/widgetdetail';
import {WidgetPackageUpload} from './../model/widgetpackageupload';
import {WidgetPackage} from './../model/widgetPackage';
import {SaveData} from './../model/savedata';
import { SharedService } from '../../../shared/services/shared.service';


@Injectable()
export class DmsAdminService {
    // Resolve HTTP using the constructor
    constructor (private http: Http, private _sharedService: SharedService) {};

     private formatDate(dt: Date): string {
        console.log(dt);
        let month: string = '' + (dt.getMonth() + 1);
        let day: string = dt.getDate().toString();
        let year: string = dt.getFullYear().toString();

        if (month.length < 2) { month = '0' + month; };
        if (day.length < 2) { day = '0' + day; };
        return [year, month, day].join('-');
     };

     getDashboards(searchkey?: string, source?: number, fromDate?: Date, toDate?: Date): Observable<Dashboard[]> {
        console.log('this._sharedService._portaApiUrl', this._sharedService._portaApiUrl);
        let query = '1';
        if (fromDate && toDate) {
            // query = query + '&fromDate=' + this.formatDate(fromDate) + '&toDate=' + this.formatDate(toDate);
            query += '/' + this.formatDate(fromDate) + '/' + this.formatDate(toDate);
        }
        if (searchkey !== '') {
            // query = 'search=' + searchkey + '&source=' + source;
            query += '/' + searchkey;
         }
        // ...using get request
         return this.http.get(this._sharedService._portaApiUrl + 'GetDashboards/' + query, { withCredentials : true })
                        // ...and calling .json() on the response to return data
                         .map((res: Response) => res.json())
                         // ...errors if any
                         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }

     getWidgets(searchkey: string, fromDate?: Date, toDate?: Date): Observable<Widget[]> {
         console.log('this._sharedService._portaApiUrl', this._sharedService._portaApiUrl);
         let query = '';
         if (fromDate && toDate) {
            // query = query + '&fromDate=' + this.formatDate(fromDate) + '&toDate=' + this.formatDate(toDate);
            query = this.formatDate(fromDate) + '/' + this.formatDate(toDate);
         }
         if (searchkey !== '') {
            // query = 'search=' + searchkey + '&source=2';
            query += '/' + searchkey;
         }
         return this.http.get(this._sharedService._portaApiUrl + 'GetWidgets/' + query, { withCredentials : true })
                         .map((res: Response) => res.json())
                         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     getDashboardDetail(id: number): Observable<DashboardDetail> {
         return this.http.get(this._sharedService._portaApiUrl + 'GetDashboardDetail/' + id, { withCredentials : true })
                         .map((res: Response) => res.json())
                         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     getWidgetDetail(id: number): Observable<WidgetDetail> {
         return this.http.get(this._sharedService._portaApiUrl + 'GetWidgetDetail/' + id, { withCredentials : true })
                         .map((res: Response) => res.json())
                         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     saveDashboard(data: any) {
         return this.http.post(this._sharedService._portaApiUrl + 'SaveDashboard', data, {withCredentials : true })
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error));
     };

     getWidgetPackages(id: number, all = true ): Observable<WidgetPackage[]> {
         // return this.http.get(this._sharedService._portaApiUrl + 'GetWidgetPackages?widgetid=' + id + '&source=' + sourceType + '&getactiveversion=' + getActiveVersion ,
         return this.http.get(this._sharedService._portaApiUrl + 'GetWidgetPackages/' + id + '/' + all ,
                            { withCredentials : true })
                         .map((res: Response) => res.json())
                         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     // save extended settings
     saveDashboardExtendedSettings(data: any) {
         return this.http.post(this._sharedService._portaApiUrl + 'SaveDashboardExtendedSettings', data, {withCredentials : true })
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     // save widget
     saveWidget(data: any) {
         return this.http.post(this._sharedService._portaApiUrl + 'SaveWidget', data, {withCredentials : true })
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error));
     };

     // save dashboard-widget mapping
     saveWidgetMapping(data: any) {
         return this.http.post(this._sharedService._portaApiUrl + 'SaveDashboardWidgetDetail ', data, {withCredentials : true })
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     // save widget-dashboard mapping
     saveDashboardMapping(data: any) {
         return this.http.post(this._sharedService._portaApiUrl + 'SaveWidgetDashboardDetail', data, {withCredentials : true })
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     // get dashboard metadata
     getDashboardMetadata(id: number, apiUrl = this._sharedService._portaApiUrl): Observable<any> {
         return this.http.get(apiUrl + 'GetDashboard/' + id, { withCredentials : true })
                         .map((res: Response) => res.json())
                         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     // get render type
     getRenderType(): Observable<any> {
         return this.http.get(this._sharedService._portaApiUrl + 'GetWidget/RenderType', {withCredentials: true})
                        .map((res) => {
                            res = res.json();
                            return res;
                        })
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     };

     // mapping
     compareMappingChanges(values, oldMapping) {
         let mapped = {};
         if (values.length > oldMapping.length) {
             mapped['action'] = 'add';
            for ( let i = 0; i < values.length; i++) {
                if (oldMapping.indexOf(values[i]) === -1) {
                    mapped['changedValue'] = values[i] ;
                    break;
                }
            }
        }else {
            mapped['action'] = 'delete';
            for ( let i = 0; i < oldMapping.length; i++) {
                if (values.indexOf(oldMapping[i]) === -1) {
                    mapped['changedValue'] = oldMapping[i] ;
                    break;
                }
            }
        }
        console.log('service calculated mapping: ', mapped);
        return mapped;
     }

}
