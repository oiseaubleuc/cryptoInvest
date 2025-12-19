import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';
import { CurrencyService } from '../../services/currency.service';
import { CryptoCurrency } from '../../models/crypto.model';

interface PortfolioItem {
  crypto: CryptoCurrency;
  amount: number;
  purchasePrice: number;
  purchaseDate: Date;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  portfolioItems: PortfolioItem[] = [];
  availableCryptos: CryptoCurrency[] = [];
  selectedCrypto: CryptoCurrency | null = null;
  amount: number = 0;
  purchasePrice: number = 0;
  showAddForm = false;
  loading = false;
  private currencySubscription?: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.loadPortfolio();
    this.loadAvailableCryptos();
    
    // Reload data when currency changes
    this.currencySubscription = this.currencyService.currentCurrency$.subscribe(() => {
      this.loadAvailableCryptos();
    });
  }

  ngOnDestroy() {
    this.currencySubscription?.unsubscribe();
  }

  loadPortfolio() {
    const saved = localStorage.getItem('portfolio');
    if (saved) {
      this.portfolioItems = JSON.parse(saved);
    }
  }

  savePortfolio() {
    localStorage.setItem('portfolio', JSON.stringify(this.portfolioItems));
  }

  loadAvailableCryptos() {
    this.loading = true;
    const currency = this.currencyService.getCurrentCurrency();
    
    this.cryptoService.getTopCryptos(50, currency).subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.availableCryptos = data;
        } else {
          this.availableCryptos = [];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.availableCryptos = [];
        this.loading = false;
      }
    });
  }

  addToPortfolio() {
    if (!this.selectedCrypto || this.amount <= 0 || this.purchasePrice <= 0) {
      return;
    }

    const item: PortfolioItem = {
      crypto: this.selectedCrypto,
      amount: this.amount,
      purchasePrice: this.purchasePrice,
      purchaseDate: new Date()
    };

    this.portfolioItems.push(item);
    this.savePortfolio();
    this.resetForm();
  }

  removeFromPortfolio(index: number) {
    this.portfolioItems.splice(index, 1);
    this.savePortfolio();
  }

  resetForm() {
    this.selectedCrypto = null;
    this.amount = 0;
    this.purchasePrice = 0;
    this.showAddForm = false;
  }

  getTotalValue(): number {
    return this.portfolioItems.reduce((total, item) => {
      return total + (item.crypto.current_price * item.amount);
    }, 0);
  }

  getTotalInvestment(): number {
    return this.portfolioItems.reduce((total, item) => {
      return total + (item.purchasePrice * item.amount);
    }, 0);
  }

  getTotalProfit(): number {
    return this.getTotalValue() - this.getTotalInvestment();
  }

  getTotalProfitPercentage(): number {
    const investment = this.getTotalInvestment();
    if (investment === 0) return 0;
    return (this.getTotalProfit() / investment) * 100;
  }

  getItemProfit(item: PortfolioItem): number {
    return (item.crypto.current_price - item.purchasePrice) * item.amount;
  }

  getItemProfitPercentage(item: PortfolioItem): number {
    if (item.purchasePrice === 0) return 0;
    return ((item.crypto.current_price - item.purchasePrice) / item.purchasePrice) * 100;
  }

  formatCurrency(value: number): string {
    const symbol = this.currencyService.getCurrencySymbol();
    return symbol + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }
}
