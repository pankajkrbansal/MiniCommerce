
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommerceServiceService } from '../commerce-service.service';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private service:CommerceServiceService,private fb:FormBuilder,private router:Router) { }
  registerForm : FormGroup
  loginForm:FormGroup
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName:['',[Validators.required]],
      userEmail:['',[Validators.required]],
      userPwd:['',[Validators.required]]
    });
    this.loginForm = this.fb.group({
      // usrName:['',[Validators.required]],
      userEmail:['',[Validators.required]],
      userPwd:['',[Validators.required]]
    });
  }
  

  errorMsg:String = null;
  isUser:Boolean = false;
  registerUser(){
    this.service.registerUser(this.registerForm.value).subscribe((result)=>{
      // localStorage.setItem('email',this.registerForm.value.userEmail);
      // localStorage.setItem('pwd',this.registerForm.value.userPwd);
      this.isUser = true;
      },(error)=>{
      console.log(error);
      this.errorMsg =error.error.message;
    })
  }
  displayLogin(){
    this.isUser = true;
  }
  loginUser(){
    this.service.loginUser(this.loginForm.value).subscribe((response)=>{
     console.log(response);
     localStorage.setItem('email',this.loginForm.value.userEmail);
     localStorage.setItem('pwd',this.loginForm.value.userPwd);
     this.router.navigateByUrl('/products');
    },(erorr)=>{
        this.router.navigateByUrl('/register');
    })
  }
}