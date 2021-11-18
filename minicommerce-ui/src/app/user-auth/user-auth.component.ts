
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      userName:['',[Validators.required,Validators.minLength(5)]],
      userEmail:['',[Validators.required,this.validateEmail]],
      userPwd:['',[Validators.required,Validators.minLength(5)]]
    });
    this.loginForm = this.fb.group({
      // usrName:['',[Validators.required]],
      userEmail:['',[Validators.required,this.validateEmail]],
      userPwd:['',[Validators.required]]
    });
  }
  
  validateEmail(c:FormControl){
    let email = c.value;
    let regex = /^[a-z0-9]+@(gmail|yahoo).(com|in)$/
    if(regex.test(email)){
      return null
    }else{
      return {
        emailError:{
          message:"Enter valid email. e.g bruce@gmail.com"
        }
      }
    }
  }

  errorMsg:String = null;
  isUser:Boolean = false;
  registerUser(){
    this.service.registerUser(this.registerForm.value).subscribe((result)=>{
      // localStorage.setItem('email',this.registerForm.value.userEmail);
      // localStorage.setItem('pwd',this.registerForm.value.userPwd);
      this.isUser = true;
      alert("Register successful");
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