import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService, Currency } from './services/currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Crypto Invest';
  selectedCurrency: string = 'usd';
  availableCurrencies: Currency[] = [];
  showCurrencyDropdown = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.selectedCurrency = this.currencyService.getCurrentCurrency();
    this.availableCurrencies = this.currencyService.getAvailableCurrencies();
    
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
    });
  }

  onCurrencyChange(currencyCode: string) {
    this.currencyService.setCurrency(currencyCode);
    this.showCurrencyDropdown = false;
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }
}

