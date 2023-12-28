import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';

@Pipe({
  name: 'currencyPipe'
})
export class CurrencyPipePipe implements PipeTransform {

  constructor(private configureService:ConfigurationService){}
  transform(value: number): string{
    const currencyCode = this.configureService.getCurrencyCode();
    const currencySymbols: { [key: string]: string } = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      // Add more currency symbols as needed
    };
    const symbol = currencySymbols[currencyCode] || currencyCode;
    return `${symbol} ${value.toFixed(2)}`;
  }

}
