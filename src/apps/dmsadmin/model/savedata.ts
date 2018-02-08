import {Parameter} from './parameter';
export class SaveData {
    constructor(
        public action: string,
        public parameter: Parameter,
        // public type?: string, // commenting for now, may require in future
    ) {}
}