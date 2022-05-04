import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-product-boys',
  templateUrl: './product-boys.component.html',
  styleUrls: ['./product-boys.component.scss']
})
export class ProductBoysComponent implements OnInit {
  boys: any = [];

  constructor(private route: ActivatedRoute,private homeService: HomeService,
    private router: Router) { }

  ngOnInit(): void {
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
