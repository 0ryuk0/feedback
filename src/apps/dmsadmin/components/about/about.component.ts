import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../../shared/services/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { DmsAdminService } from '../../services/dmsadmin.service';
import { AlertService } from './../../../../shared/services/alert.service';

// Interfaces
import { Widget } from '../../model/widget';
import { WidgetPackage } from '../../model/widgetpackage';
import { WidgetPackageUpload } from '../../model/widgetpackageupload';
import { SelectOptions } from '../../../../shared/model/selectoptions';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
    constructor() { }

  ngOnInit() {
  }
}
