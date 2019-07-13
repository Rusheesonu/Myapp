import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankApiService {

  constructor(private http: HttpClient) { }

  getBankData(city: String){
    var url= 'https://vast-shore-74260.herokuapp.com/banks?city='+city;
    return this.http.get(url);
  }
}
