import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { Product } from '../shared/models/product';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  girls: any = [];
  boys: any = [];

  constructor(
    private homeService: HomeService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.getClothes();
    this.getBoy();
  }

  getClothes() {
    this.homeService.getClothes().subscribe(
      (response) => {
        this.girls = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBoy() {
    this.homeService.getBoy().subscribe(
      (response) => {
        this.boys = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}