import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoCurrency, CryptoPriceHistory } from '../models/crypto.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  /**
   * Get top cryptocurrencies
   */
  getTopCryptos(limit: number = 100): Observable<CryptoCurrency[]> {
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('order', 'market_cap_desc')
      .set('per_page', limit.toString())
      .set('page', '1')
      .set('sparkline', 'false')
      .set('price_change_percentage', '24h');

    return this.http.get<CryptoCurrency[]>(`${this.apiUrl}/coins/markets`, { params });
  }

  /**
   * Get cryptocurrency details by ID
   */
  getCryptoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/coins/${id}`);
  }

  /**
   * Get cryptocurrency price history
   */
  getCryptoPriceHistory(id: string, days: number = 7): Observable<CryptoPriceHistory> {
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('days', days.toString());

    return this.http.get<CryptoPriceHistory>(`${this.apiUrl}/coins/${id}/market_chart`, { params });
  }

  /**
   * Search cryptocurrencies
   */
  searchCryptos(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }

  /**
   * Get trending cryptocurrencies
   */
  getTrendingCryptos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/trending`);
  }
}

