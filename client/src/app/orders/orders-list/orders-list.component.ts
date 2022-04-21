import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { OrdersService } from '../order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  orders: IOrder[];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrdersForUser().subscribe(
      (orders: IOrder[]) => {
        this.orders = orders;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
