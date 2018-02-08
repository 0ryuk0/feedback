import { Component, OnInit, Output, EventEmitter, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    // isShowDetails: boolean;
    // selectedProduct = {};
    // filterArgs = [];
    // subscription: Subscription;

    // products = [];

    // constructor(private _productService: ProductService, private _router: Router) {
    //     this.subscription = _productService.filterArgs$.subscribe((args) => {
    //         this.filterArgs = args;
    //         console.log('filter args:', args, this.filterArgs, this.subscription);
    //     });
    // }

  ngOnInit() {
    // this.getProductList();
    // this._productService.showSidePane(true);
  }

  getProductList() {
    // this._productService.getProductList()
    //   .subscribe((products) => {
    //     this.products = products;
    //   })
  };

  redirectToDetails(product) {
    // // this._router.navigate(['./details']);
    // this.isShowDetails = true;
    // this.selectedProduct = product;
  }


}
