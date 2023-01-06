import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoinsResult } from '../models/CoinsResult';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  constructor(private httpClient: HttpClient) {}

  getCoins() {
    return this.httpClient.get<CoinsResult>(`${environment.baseCoinUrl}/coins`);
  }
}
