import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AgeGroup } from '../shared/models/ageGroup';
import { Brand } from '../shared/models/brand';
import { Gender } from '../shared/models/gender';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Type } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  genders: Gender[] = [];
  ageGroups: AgeGroup[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) { }

  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    if (!useCache) this.productCache = new Map();

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId);
    if (this.shopParams.typeId) params = params.append('typeId', this.shopParams.typeId);
    if (this.shopParams.genderId) params = params.append('genderId', this.shopParams.genderId);
    if (this.shopParams.ageGroupId) params = params.append('ageGroupId', this.shopParams.ageGroupId);
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    if (this.shopParams.search) params = params.append('search', this.shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {params}).pipe(
      map(response => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response)
        this.pagination = response;
        return response;
      })
    )
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Product)

    if (Object.keys(product).length !== 0) return of(product);

    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) return of(this.brands);

    return this.http.get<Brand[]>(this.baseUrl + 'products/brands').pipe(
      map(brands => this.brands = brands)
    );
  }

  getTypes() {
    if (this.types.length > 0) return of(this.types);

    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
  }

  getGenders() {
    if (this.genders.length > 0) return of(this.genders);

    return this.http.get<Gender[]>(this.baseUrl + 'products/genders').pipe(
      map(genders => this.genders = genders)
    );
  }

  getAgeGroups() {
    if (this.ageGroups.length > 0) return of(this.ageGroups);

    return this.http.get<AgeGroup[]>(this.baseUrl + 'products/agegroups').pipe(
      map(ageGroups => this.ageGroups = ageGroups)
    );
  } 
}