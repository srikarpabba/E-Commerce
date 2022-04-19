import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductFormValues } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createProduct(product: ProductFormValues): Observable<any> {
    return this.http.post(this.baseUrl + 'products', product);
  }

  updateProduct(product: ProductFormValues, id: number): Observable<any> {
    return this.http.put(this.baseUrl + 'products/' + id, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  uploadImage(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');

    return this.http.put(this.baseUrl + 'products/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteProductPhoto(photoId: number, productId: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'products/' + productId + '/photo/' + photoId);
  }

  setMainPhoto(photoId: number, productId: number): Observable<any> {
    return this.http.post(this.baseUrl + 'products/' + productId + '/photo/' + photoId, {});
  }
}
