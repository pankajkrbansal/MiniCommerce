import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommerceServiceService {

  constructor(private http:HttpClient) { }
  getAllproducts():Observable<any>{
    return this.http.get('http://localhost:1050/products')
}

registerUser(data):Observable<any>{
  return this.http.post('http://localhost:1050/register',data)
}

loginUser(data):Observable<any>{
  return this.http.post('http://localhost:1050/login',data);
}

getProducts():Observable<any>{
  return this.http.get("http://localhost:1050/products");
}

addToCart(data,email):Observable<any>{
  let url = `http://localhost:1050/addtocart/${email}`
  return this.http.post(url,data)
}

viewCart(userEmail):Observable<any>{
  return this.http.get(`http://localhost:1050/viewcart/${userEmail}`);
}


}
