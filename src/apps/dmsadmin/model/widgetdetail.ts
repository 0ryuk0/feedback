import {Widget} from './widget';
import {Mapping} from './mapping';

export class WidgetDetail {
    constructor(
        public widget: Widget,
        public dashboardWidgetDetails: Mapping[]
        ){}
}