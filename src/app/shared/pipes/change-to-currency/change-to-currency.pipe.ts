import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'changeToCurrency'
})
export class ChangeToCurrencyPipe implements PipeTransform {

    transform(value: any, args ? : any): any {
        if (args == 'useInModel') value = value.replace(/,/g, '');
        else value = value.toString();
        return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

}
