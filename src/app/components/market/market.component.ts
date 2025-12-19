import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto.service';
import { CryptoCurrency } from '../../models/crypto.model';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent implements OnInit {
  cryptos: CryptoCurrency[] = [];
  loading = true;
  searchQuery = '';

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.loadCryptos();
  }

  loadCryptos() {
    this.loading = true;
    this.cryptoService.getTopCryptos(100).subscribe({
      next: (data) => {
        this.cryptos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cryptocurrencies:', error);
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
    if (price < 0.01) {
      return price.toFixed(6);
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e12) {
      return '$' + (marketCap / 1e12).toFixed(2) + 'T';
    }
    if (marketCap >= 1e9) {
      return '$' + (marketCap / 1e9).toFixed(2) + 'B';
    }
    if (marketCap >= 1e6) {
      return '$' + (marketCap / 1e6).toFixed(2) + 'M';
    }
    return '$' + marketCap.toLocaleString('en-US');
  }

  getTotalMarketCap(): string {
    const total = this.cryptos.reduce((sum, crypto) => sum + crypto.market_cap, 0);
    return this.formatMarketCap(total);
  }
}
