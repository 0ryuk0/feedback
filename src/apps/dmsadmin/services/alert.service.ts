import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

/**
 * Service helps communicate between the ToastComponent and AppComponent.
 */
@Injectable()
export class AlertService {
    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'material';
    }
    // Toster options and support
    // tslint:disable-next-line:member-ordering
    position = 'bottom-right';

    showToaster(message, title, type) {

        const toastOptions: ToastOptions = {
            title: title,
            msg: message,
            showClose: true,
            timeout: 4000,
            theme: 'material'
        };

        switch (type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}
