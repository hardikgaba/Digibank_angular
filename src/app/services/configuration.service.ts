import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private currencyCode: string = 'USD';
  constructor() { }

  

  getCurrencyCode(): string {
    return this.currencyCode;
  }
}
