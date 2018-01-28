import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtercampionato',
    pure: false
})



export class FilterCampionatoPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return {};
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.campionatoId.indexOf(filter) !== -1);
    }
}
