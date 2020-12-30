import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from "./product-service.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.css'],
})
export class PaymentCartComponent implements OnInit {
  unsubscribe$ = new Subject<void>();
  productListing: any;
  orderSummary: any;
  totalProduct: any;
  constructor(public productServiceService: ProductServiceService) {}

  ngOnInit(): void {
    this.getProductData();
  }

  //get all prdocut
  getProductData() {
    this.productServiceService
      .getAllProductData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          this.totalProduct = (<any>data).cartDetails.cartItems.length;
          this.productListing = (<any>data).cartDetails.cartItems;
          this.orderSummary = (<any>data).cartDetails.cartSummary;
          
          this.productListing.map((item) => {
            item.isStoreDropDown = true;
            let itemTotal = item.itemAmount.itemTotalPrice;
            item.itemAmount.itemTotalPrice = itemTotal.toFixed(2);
            let itemPrice = item.itemAmount.itemPrice;
            item.itemAmount.itemPrice = itemPrice.toFixed(2);
          });
          
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //change envet for delivery deop down
  onChangeDelivey(e, itemId) {
    let selectedItemId = itemId;
    this.productListing.filter((item) => {
      if (item.itemId === selectedItemId) {
        if (e === 'Deliver Online') {
          item.isStoreDropDown = false;
        } else {
          item.isStoreDropDown = true;
        }
      }
    });
  }

  // calculate amount of total item, subtotal and estimated total based upon qty increse and descrese
  qtyValueUpdate(val, itemObj) {
    this.productListing.filter((item) => {
      if (item.itemId === itemObj.itemId) {
        if (val === 'plus') {
          item.itemQuantity = parseInt(item.itemQuantity) + 1;
        } else if (val === 'minus' && item.itemQuantity > 0) {
          item.itemQuantity = parseInt(item.itemQuantity) - 1;
        }
        let total = item.itemAmount.itemPrice * item.itemQuantity;
        item.itemAmount.itemTotalPrice = total.toFixed(2);
      }
    });
    const totalItemPrice = this.productListing.reduce(
      (sum, item) => sum + parseInt(item.itemAmount.itemTotalPrice),0);
    this.orderSummary.subtotal = totalItemPrice.toFixed(2);
    let cartTotal = parseInt(this.orderSummary.subtotal) + this.orderSummary.shippingAmount;
    this.orderSummary.cartTotal = cartTotal.toFixed(2);
  }

  ngOnDestroy() {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }
}
