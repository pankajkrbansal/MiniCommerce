import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceServiceService } from '../commerce-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router ,private service:CommerceServiceService) { }
   productsArray:any = null;
  ngOnInit(): void {
    let email = localStorage.getItem('email');
    if(email){
    this.service.getAllproducts().subscribe((productsData)=>{
      console.log(productsData);
      this.productsArray = productsData;
    },(error)=>{

    })
    }else{
      this.router.navigateByUrl('/register');
    }
  }

  getClickedProduct(product){
    let email = localStorage.getItem('email');
    console.log(email);
    
    this.service.addToCart(product,email).subscribe((response)=>{
      console.log(response);
    })
  }
}
