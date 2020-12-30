import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(public http: HttpClient) { }

  public getConfig() {
    let config = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }),
    };
    return config;
  }
  public getAllProductData() {
    return this.http.get<Config>('../../assets/data/product.json', this.getConfig());
  }
}
export interface Config {
  data: Array<any>;
}
