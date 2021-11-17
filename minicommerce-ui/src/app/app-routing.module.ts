import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

export const routes: Routes = [
  {path:'',component:UserAuthComponent},
  {path:'products',component:ProductsComponent},
  {path:'register',component:UserAuthComponent},
  {path:'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
