import {Widget} from './widget';
import {ExtendedSettings} from './extendedsettings';
import {Dashboard} from './dashboard';

export class DashboardDetail {
    constructor(
        public dashboard: Dashboard,
        public widgets: Widget[],
        public dashboardExtendedSettings: ExtendedSettings[]
    ){}
}