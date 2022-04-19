import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;

  constructor(
    private bcrumbService: BreadcrumbService,
    private ordersService: OrdersService,
    private router: ActivatedRoute
  ) {
    this.bcrumbService.set('@OrderDetails', ' ');
  }

  ngOnInit(): void {
    this.ordersService
      .getOrderByIdForUser(+this.router.snapshot.paramMap.get('id'))
      .subscribe(
        (order: IOrder) => {
          this.order = order;
          this.bcrumbService.set(
            '@OrderDetails',
            `Order# ${order.id} - ${order.status}`
          );
        },
        (error) => console.log(error)
      );
  }
}
