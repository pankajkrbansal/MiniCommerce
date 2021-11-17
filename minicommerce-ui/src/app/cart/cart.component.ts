import { Component, OnInit } from '@angular/core';
import { CommerceServiceService } from '../commerce-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service:CommerceServiceService) { }
  cart = null;
  errorMsg = null;
  ngOnInit(): void {
    
    this.service.viewCart(localStorage.getItem('userEmail')).subscribe((cartData)=>{
      this.cart = cartData
    },(error)=>{
      this.errorMsg = "Error in fetching cart"
    })
  }

}
