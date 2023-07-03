import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AgeGroup } from 'src/app/shared/models/ageGroup';
import { Brand } from '../../shared/models/brand';
import { Gender } from '../../shared/models/gender';
import { Product, ProductFormValues } from '../../shared/models/product';
import { Type } from '../../shared/models/productType';
import { ShopService } from '../../shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product: Product;
  productFormValues: ProductFormValues;
  brands: Brand[];
  types: Type[];
  genders: Gender[];
  ageGroups: AgeGroup[];

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
    const ageGroups = this.getAgeGroups();

    forkJoin([types, brands, genders, ageGroups]).subscribe(
      (results) => {
        this.types = results[0];
        this.brands = results[1];
        this.genders = results[2];
        this.ageGroups = results[3];
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
          const productAgeGroupId =
          this.ageGroups &&
          this.ageGroups.find((x) => x.name === response.productAgeGroup).id;
        this.product = response;
        this.productFormValues = {
          ...response,
          productBrandId,
          productTypeId,
          productGenderId,
          productAgeGroupId
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
  getAgeGroups() {
    return this.shopService.getAgeGroups();
  }
}
