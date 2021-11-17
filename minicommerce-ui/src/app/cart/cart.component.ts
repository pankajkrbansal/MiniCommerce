import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CommerceServiceService } from '../commerce-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private service:CommerceServiceService,private fb:FormBuilder) { }
  cart;
  amt;
  errorMsg = null;
  email = localStorage.getItem('email');
  checkOutForm:FormGroup
  ngOnInit(): void {
    // let email = localStorage.getItem('email');
    this.checkOutForm = this.fb.group(
      {
        address:['',Validators.required]
      }
    )
    this.getCart();
  }
  getCart(){
    console.log("getCart = > "+this.email);
    this.service.viewCart(this.email).subscribe((res)=>{
      console.log("Called");
      this.amt = res.amount
      this.cart = res.products;
      console.log(res);
    },(error)=>{
      console.log(error);
    })
  }
  sendProducts = false;
  shareData(){
    this.sendProducts = true;
  }
  goBack(){
    this.sendProducts = false;
  }
  successMsg;
  checkOutUser(){
    this.service.checkOut(this.checkOutForm.value,this.email).subscribe((res)=>{
      console.log("called");
      
      console.log(res);
      this.successMsg = "Order with order id "+ res +" will be delivered"
    },(error)=>{

    })
  }
}

