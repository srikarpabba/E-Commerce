import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
  {path: '', component: OrdersListComponent},
  {path: ':id', component: OrderDetailsComponent, data: {breadcrumb: {alias: 'OrderDetails'}}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
