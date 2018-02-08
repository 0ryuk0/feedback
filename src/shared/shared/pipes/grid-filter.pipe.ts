import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gridFilter',
    pure: false
})

@Injectable()
export class GridFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        let filteredList = [];
        let newArgs = [];
        if (items && items.length > 0 && args && args !== undefined && args !== null && args.length > 0) {
            let result  = [];
            for (let i = 0; i < args.length; i++) {
                if (args[i]['key'] !== '' && args[i]['key'] !== undefined && args[i]['searchPhrase'] !== '' && args[i]['searchPhrase'] !== undefined) {
                    result = items.filter(
                        (item) => {
                            if (item[args[i]['key']] && item[args[i]['key']] !== undefined) {
                                return item[args[i]['key']].toLowerCase().includes(args[i]['searchPhrase'].toLowerCase())
                            }
                        }
                    );
                }else {
                    result = items;
                }
                items = result;
            }
            return result;
        }else {
            return items;
        }
    }
}
