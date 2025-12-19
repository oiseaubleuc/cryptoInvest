import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { CryptoCurrency } from '../../models/crypto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  trendingCryptos: CryptoCurrency[] = [];
  loading = true;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.loadTrendingCryptos();
  }

  loadTrendingCryptos() {
    this.cryptoService.getTopCryptos(6).subscribe({
      next: (data) => {
        this.trendingCryptos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cryptocurrencies:', error);
        this.loading = false;
      }
    });
  }
}
