import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
    baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClothes(): Observable<any> {
      return this.http.get<any>(this.baseUrl + 'Products?PageSize=4&TypeId=5&GenderId=2');
  }


}
