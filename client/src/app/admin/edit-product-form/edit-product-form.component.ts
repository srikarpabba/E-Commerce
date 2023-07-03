import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeGroup } from 'src/app/shared/models/ageGroup';
import { Brand } from '../../shared/models/brand';
import { Gender } from '../../shared/models/gender';
import { ProductFormValues } from '../../shared/models/product';
import { Type } from '../../shared/models/productType';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  @Input() product: ProductFormValues;
  @Input() brands: Brand[];
  @Input() types: Type[];
  @Input() genders: Gender[];
  @Input() ageGroups: AgeGroup[];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  updatePrice(event: any): void {
    this.product.price = event;
  }

  onSubmit(product: any): void {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {
        ...this.product,
        ...product,
        price: +product.price,
      };

      this.adminService
        .updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id'))
        .subscribe(() => this.router.navigate(['/admin']));
    } else {
      const newProduct = { ...product, price: +product.price };
      this.adminService.createProduct(newProduct).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
