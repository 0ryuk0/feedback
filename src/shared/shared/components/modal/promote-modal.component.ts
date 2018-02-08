import { WidgetPackageUpload } from './../../../apps/dmsadmin/model/widgetpackageupload';
import { WidgetPackage } from './../../../apps/dmsadmin/model/widgetpackage';
import { SharedService } from './../../services/shared.service';
import { WidgetDetail } from '../../../apps/dmsadmin/model/widgetdetail';
import { AlertService } from './../../services/alert.service';
import { DmsAdminService } from '../../../apps/dmsadmin/services/dmsadmin.service';
import { Component, OnInit, AfterViewInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-promote',
  templateUrl: './promote-modal.component.html',
  styleUrls: ['./promote-modal.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class PromoteModalComponent implements OnInit, AfterViewInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Input() headerText: string;
    @Input() buttons: any;
    @Input() disabled: boolean;
    @Input() isDashboard: boolean;
    @Input() isWidget: boolean;
    @Input() data: any;

    @Output() dialogEvents: EventEmitter<boolean> = new EventEmitter<boolean>();

    currentView = 'Dashboard Details';
    dashboardSec = {
        isDashboardMetadata: true,
        isPackageDetails: false
    };
    environmentOptions = environment.portalEnvironemnt;
    widgetsForDashboard: any;
    finalSelection = {'dashboardId': 0, 'widgetDetails': []};
    newDashboard = {};
    createError = '';
    isShowCreateLoader: boolean;
    color = 'primary';
    mode = 'determinate';
    value = 50;
    bufferValue = 75;
    uploadBtnText = 'Upload';

    constructor(private _dmsAdminService: DmsAdminService, private _alertService: AlertService,
                private _sharedService: SharedService) {
        console.log('Header Text: ', this.headerText, 'buttons: ', this.buttons, 'is Dashboard: ', this.isDashboard, 'data: ', this.data);
     }

    ngOnInit() {
        console.log('Header Text: ', this.headerText, 'buttons: ', this.buttons, 'is Dashboard: ', this.isDashboard, 'data: ', this.data);
    }

    ngAfterViewInit() {
        // this.n3aFrame = document.getElementById('n3aframe');
        // console.log('after init: ', this.n3aFrame, document.getElementById('n3aframe'));
    };

    close() {
        this.reset();
        this.visible = false;
        this.dialogEvents.next(this.visible);
        // this.visibleChange.emit(this.visible);
    };

    dialogAction(parent, context) {
        if (parent === 'dashboard') {
            switch (context) {
                    case 'dashboardMetadata':
                        this.createError = '';
                        this.createNewDashboard();
                        break;
                    case 'packageDetails':
                        if (this.uploadBtnText != 'Done') {
                            this.processPackages();
                        }else {
                            this.close();
                        }
                        break;
            }
        }
    };

    createNewDashboard() {
        this.isShowCreateLoader = true;
        // API call for creating a new dashboard for selected environment
        let dashboard = { 'inputJson': '' };
        dashboard.inputJson = JSON.stringify(this.data);
        console.log('will create a new dashboard to this environment: ', this.data, this.data.selectedEnv);
        this._sharedService.createDashboard( dashboard,  this.data.selectedEnv.portalApiRoot)
        .subscribe((newDBoard) => {
            console.log(newDBoard.DashboardId, this.data.selectedEnv);
            this.newDashboard = newDBoard;
            this.showThisSection('isPackageDetails', 'isDashboardMetadata');
            this.currentView += ' >>  Widget Package Files';
            this.createError = '';
            this.isShowCreateLoader = false;

            // this.newDashboard = newDashboard;
            // this._dmsAdminService.getDashboardMetadata(newDBoard.DashboardId, this.data.selectedEnv.portalApiRoot)
            // .subscribe((newDashboard) => {
            //     console.log('new metadata', newDashboard);
            //     this.showThisSection('isPackageDetails', 'isDashboardMetadata');
            //     this.currentView += ' >>  Widget Package Files';
            //     this.createError = '';
            // }, (err) => {
            //     console.log(err);
            // });
        }, (err) => {
            this.isShowCreateLoader = false;
            this.createError = 'Error occurred while promoting dashboard. Please try again.';
            console.log(err);
        });

    };

    processPackages() {
        console.log(this.data);
        for ( let i = 0; i < this.data.widgets.length; i++) {
            if (!this.data.widgets[i]['notIncluded']) {
                this.processPackage(this.data.widgets[i], i);
            }
        }
    };

    processPackage(widget, index, isRetry?, e?) {
        if (isRetry) {
            e.stopPropagation();
        }
        widget['isShowSpinner'] = true;
        widget['isShowRetry'] = false;
        widget['isDone'] = false;
        this._sharedService.getWidgetPackageContent(widget.Id)
        .subscribe((fileContent) => {
            console.log('fileContent: ', this.newDashboard, this.newDashboard['WidgetIds']);
            let widgetpackage: WidgetPackage = new WidgetPackage();
            widgetpackage.WidgetId = this.newDashboard['WidgetIds'][index];
            widgetpackage.Source = fileContent;
            widgetpackage.FileName = widget.PackageFileName;
            widgetpackage.SourceType = 2;
            let uploadPackage: WidgetPackageUpload = new WidgetPackageUpload(widgetpackage);
            uploadPackage.UseThisVersion = true;
            this._sharedService.uploadWidgetPackage(uploadPackage, this.data.selectedEnv.portalApiRoot )
                // tslint:disable-next-line:no-shadowed-variable
                .subscribe(widgetpackage => {
                    widget['isShowSpinner'] = false;
                    widget['isDone'] = true;
                    widget['isShowRetry'] = false;
                    if (this.uploadBtnText  != 'Done') {
                        this.uploadBtnText = 'Done';
                    }
                },
                err => {
                    console.log(err);
                    widget['isShowSpinner'] = false;
                    widget['isDone'] = false;
                    widget['isShowRetry'] = true;
                    if (!this.createError) {
                        this.createError = 'Upload is failed for few widgets. Please check the widget cards and retry.';
                    }
                });
        }, err => {
            console.log(err);
                    widget['isShowSpinner'] = false;
                    widget['isShowRetry'] = true;
        });
    }

    showThisSection(show, hide) {
        this.dashboardSec[show] = true;
        this.dashboardSec[hide] = false;
    };


    reset() {
        this.currentView = 'Dashboard Details';
        this.dashboardSec = {
            isDashboardMetadata: true,
            isPackageDetails: false
        };
        this.environmentOptions = environment.portalEnvironemnt;
        this.finalSelection = {'dashboardId': 0, 'widgetDetails': []};
    };

    widgetCardEvent(widget) {
        this.finalSelection['dashboardId'] = this.data.Id;
        if (widget && widget.isActive) {
            widget.isActive = !widget.isActive;
        }else {
            widget['isActive'] = true;
        }
        if (widget['isActive']) {
            this.finalSelection['widgetDetails'].push(widget);
        }else {
            this.finalSelection['widgetDetails'].splice(widget, 1);
        }
        console.log('final object skeleton', this.finalSelection);
    };

    toggleWidgetSelection(widget) {
        widget['notIncluded'] = !widget['notIncluded'];
        widget['isShowSpinner'] = false;
        widget['isShowRetry'] = false;
        widget['isDone'] = false;
    }
}


