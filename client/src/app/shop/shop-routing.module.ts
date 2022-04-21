import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBoysComponent } from './product-boys/product-boys.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},
  {path: 'boys', component: ProductBoysComponent, data: {breadcrumb: 'Boys'}} 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
