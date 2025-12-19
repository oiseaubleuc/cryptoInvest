import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly STORAGE_KEY = 'selectedCurrency';
  private readonly DEFAULT_CURRENCY = 'usd';
  
  private availableCurrencies: Currency[] = [
    { code: 'usd', name: 'US Dollar', symbol: '$' },
    { code: 'eur', name: 'Euro', symbol: '€' },
    { code: 'gbp', name: 'British Pound', symbol: '£' },
    { code: 'jpy', name: 'Japanese Yen', symbol: '¥' },
    { code: 'cad', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'aud', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'chf', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'cny', name: 'Chinese Yuan', symbol: '¥' }
  ];

  private currentCurrencySubject: BehaviorSubject<string>;
  public currentCurrency$: Observable<string>;

  constructor() {
    const savedCurrency = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_CURRENCY;
    this.currentCurrencySubject = new BehaviorSubject<string>(savedCurrency);
    this.currentCurrency$ = this.currentCurrencySubject.asObservable();
  }

  getCurrentCurrency(): string {
    return this.currentCurrencySubject.value;
  }

  setCurrency(currencyCode: string): void {
    if (this.isValidCurrency(currencyCode)) {
      this.currentCurrencySubject.next(currencyCode);
      localStorage.setItem(this.STORAGE_KEY, currencyCode);
    }
  }

  getAvailableCurrencies(): Currency[] {
    return this.availableCurrencies;
  }

  getCurrencySymbol(currencyCode?: string): string {
    const code = currencyCode || this.getCurrentCurrency();
    const currency = this.availableCurrencies.find(c => c.code === code);
    return currency?.symbol || '$';
  }

  getCurrencyName(currencyCode?: string): string {
    const code = currencyCode || this.getCurrentCurrency();
    const currency = this.availableCurrencies.find(c => c.code === code);
    return currency?.name || 'US Dollar';
  }

  isValidCurrency(currencyCode: string): boolean {
    return this.availableCurrencies.some(c => c.code === currencyCode);
  }
}

