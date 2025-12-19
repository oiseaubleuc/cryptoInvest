import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';
import { CurrencyService } from '../../services/currency.service';
import { CryptoCurrency } from '../../models/crypto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  trendingCryptos: CryptoCurrency[] = [];
  loading = true;
  private currencySubscription?: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.loadTrendingCryptos();
    
    // Reload data when currency changes
    this.currencySubscription = this.currencyService.currentCurrency$.subscribe(() => {
      this.loadTrendingCryptos();
    });
  }

  ngOnDestroy() {
    this.currencySubscription?.unsubscribe();
  }

  loadTrendingCryptos() {
    this.loading = true;
    const currency = this.currencyService.getCurrentCurrency();
    
    this.cryptoService.getTopCryptos(6, currency).subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.trendingCryptos = data;
        } else {
          this.trendingCryptos = [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cryptocurrencies:', error);
        this.trendingCryptos = [];
        this.loading = false;
      }
    });
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }
}
