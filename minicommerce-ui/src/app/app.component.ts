import { templateJitUrl } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceServiceService } from './commerce-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cart
  title = 'minicommerce-ui';
  constructor(private serv:CommerceServiceService, private router:Router) {
    
  }

  ngOnInit():void{
    console.log(localStorage.getItem("email"));
    
    this.serv.getCart(localStorage.getItem("email"));
    this.cart = this.serv.returnCartValue();
    console.log("cart length = "+this.cart);
    
  }

  logout(){
    console.log("Click");
    
    localStorage.clear()

    this.router.navigateByUrl("/register")
  }
  
}



  


  
