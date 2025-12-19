import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';
import { CurrencyService } from '../../services/currency.service';
import { CryptoCurrency } from '../../models/crypto.model';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent implements OnInit, OnDestroy {
  cryptos: CryptoCurrency[] = [];
  loading = true;
  searchQuery = '';
  private currencySubscription?: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.loadCryptos();
    
    // Reload data when currency changes
    this.currencySubscription = this.currencyService.currentCurrency$.subscribe(() => {
      this.loadCryptos();
    });
  }

  ngOnDestroy() {
    this.currencySubscription?.unsubscribe();
  }

  loadCryptos() {
    this.loading = true;
    const currency = this.currencyService.getCurrentCurrency();
    
    this.cryptoService.getTopCryptos(100, currency).subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.cryptos = data;
        } else {
          this.cryptos = [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cryptocurrencies:', error);
        this.cryptos = [];
        this.loading = false;
      }
    });
  }

  get filteredCryptos() {
    if (!this.searchQuery) {
      return this.cryptos;
    }
    return this.cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  formatPrice(price: number): string {
    const symbol = this.currencyService.getCurrencySymbol();
    if (price < 0.01) {
      return symbol + price.toFixed(6);
    }
    return symbol + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatMarketCap(marketCap: number): string {
    const symbol = this.currencyService.getCurrencySymbol();
    if (marketCap >= 1e12) {
      return symbol + (marketCap / 1e12).toFixed(2) + 'T';
    }
    if (marketCap >= 1e9) {
      return symbol + (marketCap / 1e9).toFixed(2) + 'B';
    }
    if (marketCap >= 1e6) {
      return symbol + (marketCap / 1e6).toFixed(2) + 'M';
    }
    return symbol + marketCap.toLocaleString('en-US');
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }

  getTotalMarketCap(): string {
    const total = this.cryptos.reduce((sum, crypto) => sum + crypto.market_cap, 0);
    return this.formatMarketCap(total);
  }
}
