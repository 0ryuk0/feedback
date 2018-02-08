export class Dashboard {
    constructor(
        public Id: number,
        public Name: string,
        public Description: string,
        public CreatedById: string,
        public CreatedDateTime: Date,
        public UpdatedDateTime: Date,
        public RenderType?: number,
        public ModuleId?: number,
        public WidgetName?: string
        ) {}
}

