export class Widget {
    constructor(
        public Id: number,
        public Name: string,
        public DisplayName: string,
        public Description: string,
        public CreatedById: string,
        public CreatedDateTime: Date,
        public UpdatedDateTime: Date,
        public EntitlementCode: string,
        public IsActive: boolean,
        public IsCacheable: boolean,
        public IsRefreshOnContextChange: boolean,
        public ShowPinIcon: boolean,
        public ShowSettingsIcon: boolean,
        public RefreshInterval: string,
        public PackageSourceType: number,
        public PackageVersion: number,
        public IsVisibleInCardLibrary: boolean,
        public UseCustomLayout: boolean,
        public ShowCloseIcon: boolean,
        public MaxRepeatCount: number
        ){}
}