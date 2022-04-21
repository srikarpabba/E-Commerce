import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-boys',
  templateUrl: './product-boys.component.html',
  styleUrls: ['./product-boys.component.scss']
})
export class ProductBoysComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

}
