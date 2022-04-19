import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IBrand } from '../../shared/models/brand';
import { IGender } from '../../shared/models/gender';
import { IProduct, ProductFormValues } from '../../shared/models/product';
import { IType } from '../../shared/models/productType';
import { ShopService } from '../../shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  productFormValues: ProductFormValues;
  brands: IBrand[];
  types: IType[];
  genders: IGender[];

  constructor(
    private adminService: AdminService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productFormValues = new ProductFormValues();
  }

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();
    const genders = this.getGenders();

    forkJoin([types, brands, genders]).subscribe(
      (results) => {
        this.types = results[0];
        this.brands = results[1];
        this.genders = results[2];
      },
      (error) => {
        console.log(error);
      },
      () => {
        if (this.route.snapshot.url[0].path === 'edit') {
          this.loadProduct();
        }
      }
    );
  }

  loadProduct() {
    this.shopService
      .getProduct(+this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        const productBrandId =
          this.brands &&
          this.brands.find((x) => x.name === response.productBrand).id;
        const productTypeId =
          this.types &&
          this.types.find((x) => x.name === response.productType).id;
        const productGenderId =
          this.genders &&
          this.genders.find((x) => x.name === response.productGender).id;
        this.product = response;
        this.productFormValues = {
          ...response,
          productBrandId,
          productTypeId,
          productGenderId,
        };
      });
  }

  getBrands() {
    return this.shopService.getBrands();
  }

  getTypes() {
    return this.shopService.getTypes();
  }

  getGenders() {
    return this.shopService.getGenders();
  }
}
