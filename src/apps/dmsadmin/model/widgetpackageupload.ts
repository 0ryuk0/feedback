import { WidgetPackage } from './widgetpackage';
export class WidgetPackageUpload {
    constructor(
        public widgetPackage: WidgetPackage,
        public UseThisVersion?: boolean
        ) {}
}
